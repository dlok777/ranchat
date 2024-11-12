import axios from 'axios';
import config from './config';

export const login = async (userId: string, password: string) => {
  try {
    const response = await axios.post(`${config.API_URL}/user/login`, {
      userId,
      password
    });
    if(response.data.result === "success") {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return { success: true, redirect: '/' };
    }
    else {
      return { success: false, message: response.data.retMsg };
    }

  }
  catch(error) {
    return { success: false, message: "로그인 실패" };
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { success: true };
};

export const loginCheck = () => {
  return localStorage.getItem('token') ? true : false;
};

