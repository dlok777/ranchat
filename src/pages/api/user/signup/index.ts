import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/Class/User';
import { handleError } from '@/utils/common';
import { checkedParams, createRetCode } from '@/utils/common';
import bcrypt from 'bcrypt';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const retCode = createRetCode();
    let requiredParams = ['userId', 'password', 'passwordConfirm', 'nickname', 'phoneNumber'];
    let checked = await checkedParams(req.query, requiredParams);

    if(!checked) {
      retCode.result = "fail";
      retCode.retCode = 400;
      retCode.retMsg = "필수 파라미터가 누락되었습니다.";
      return res.json(retCode);
    }
    //id값 받기
    const id = Number(req.query.id);
    
    let user = await User.getUser(id); // 사용자 조회
    if(!user) {
      retCode.result = "fail";
      retCode.retCode = 404;
      retCode.retMsg = "사용자 정보가 없습니다.";
      return res.json(retCode);
    }
    retCode.data = user;
    return res.json(retCode);
  } catch (error) {
    handleError(res, error);
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const retCode = createRetCode();
  let requiredParams = ['userId', 'username', 'password', 'passwordConfirm', 'nickname', 'phoneNumber'];
  
  let checked = await checkedParams(req.body, requiredParams);
  
  
  if(!checked) {
    retCode.result = "fail";
    retCode.retCode = 400;
    retCode.retMsg = "필수 파라미터가 누락되었습니다.";
    return res.json(retCode);
  }

  const { userId, password, passwordConfirm, nickname, phoneNumber } = req.body;

  const checkUser = await User.getUserByUserId(userId);
  if(checkUser) {
    retCode.result = "fail";
    retCode.retCode = 409;
    retCode.retMsg = "이미 사용중인 아이디입니다.";
    return res.json(retCode);
  }

  if(password !== passwordConfirm) {
    retCode.result = "fail";
    retCode.retCode = 400;
    retCode.retMsg = "비밀번호가 일치하지 않습니다.";
    return res.json(retCode);
  }

  let params = {
    user_id: userId,
    user_pass: bcrypt.hashSync(password, 10),
    nickname: nickname,
    phone: phoneNumber
  }

  try {
    let newUser = await User.setUser(params);
    if(!newUser) {
      retCode.result = "fail";
      retCode.retCode = 500;
      retCode.retMsg = "사용자 추가에 실패했습니다.";
      return res.json(retCode);
    }

    retCode.data = newUser;
    res.status(201).json(retCode);
  } catch (error) {
    handleError(res, error);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');

  try {
    switch (req.method) {      
      case 'POST':
        await handlePost(req, res);
        break;
      
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    handleError(res, error);
  }
};