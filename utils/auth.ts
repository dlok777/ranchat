import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import config from './config';

const TOKEN_REFRESH_THRESHOLD = Number(process.env.TOKEN_REFRESH_THRESHOLD) || 30;


// Types
interface AuthResult {
  isValid: boolean;
  userId?: string;
  message: string;
  statusCode: number;
}

interface TokenPayload {
  userId: string;
  exp: number;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * 로그인 처리
 * @param userId 
 * @param password 
 * @returns 
 */
export const login = async (userId: string, password: string) => {
  try {
    const response = await axios.post(`${config.API_URL}/user/login`, {
      userId,
      password
    });
    if(response.data.result === "success") {
      const { accessToken, refreshToken } = response.data.data;
      setAuthTokens({ accessToken, refreshToken });
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return { success: true, redirect: '/' };
    }
    return { success: false, message: response.data.retMsg };
  }
  catch(error) {
    return { success: false, message: "로그인 실패" };
  }
};

/**
 * 로그아웃 처리
 * @returns 
 */
export const logout = () => {
  clearAuthTokens();
  localStorage.removeItem('user');
  return { success: true };
};

/**
 * 토큰 관리 함수들
 */
const setAuthTokens = (tokens: AuthTokens) => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

const clearAuthTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const getAuthTokens = (): AuthTokens | null => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
};

/**
 * 액세스 토큰 갱신
 * @returns 
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  const tokens = getAuthTokens();
  if (!tokens?.refreshToken) return false;

  try {
    const response = await axios.post(`${config.API_URL}/user/refresh-token`, {
      refreshToken: tokens.refreshToken
    });
    
    if (response.data.result === "success") {
      setAuthTokens({
        accessToken: response.data.data.accessToken,
        refreshToken: tokens.refreshToken // 리프레시 토큰은 유지
      });
      return true;
    }
    return false;
  } catch {
    clearAuthTokens();
    return false;
  }
};

/**
 * 로그인 상태 확인
 * @returns 
 */
export const loginCheck = async () => {
  const tokens = getAuthTokens();
  
  if (!tokens) return false;
  const decoded = jwtDecode<TokenPayload>(tokens.accessToken);
  const currentTime = Date.now() / 1000;
  
  // 액세스 토큰이 만료 10초 전인 경우 리프레시 시도
  if (decoded.exp - currentTime < TOKEN_REFRESH_THRESHOLD) {
    const refreshSuccess = await refreshAccessToken();
    if (!refreshSuccess) {
      clearAuthTokens();
      return false;
    }
  }

  return true;
};

/**
 * 토큰 조회
 * @returns 
 */
export const getToken = () => {
  const tokens = getAuthTokens();
  return tokens?.accessToken || null;
};

/**
 * 사용자 조회
 * @returns 
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * 인증 처리
 * @returns 
 */
export const isLogin = async (): Promise<boolean> => {
  return await loginCheck();
};

/**
 * API 토큰 검증
 * @param req 
 * @returns 
 */
export const verifyApiToken = async (req: NextApiRequest): Promise<AuthResult> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return {
      isValid: false,
      message: '토큰이 제공되지 않았습니다.',
      statusCode: 401
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      return {
        isValid: false,
        message: '토큰이 만료되었습니다.',
        statusCode: 401
      };
    }

    // request 사용자 정보
    const requestUserId = req.query.userId as string;

    if (requestUserId && decoded.userId !== requestUserId) {
      return {
        isValid: false,
        message: '토큰의 사용자 정보가 일치하지 않습니다.',
        statusCode: 401
      };
    }

    return {
      isValid: true,
      userId: decoded.userId,
      message: '유효한 토큰입니다.',
      statusCode: 200
    };

  } catch (error) {
    return {
      isValid: false,
      message: '만료되었거나 유효하지 않은 토큰입니다.',
      statusCode: 401
    };
  }
};