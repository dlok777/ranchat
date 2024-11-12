import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/Class/User';
import { handleError } from '@/utils/common';
import { checkedParams, createRetCode } from '@/utils/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const retCode = createRetCode();
  let requiredParams = ['userId', 'password'];
  
  let checked = await checkedParams(req.body, requiredParams);
  
  if(!checked) {
    retCode.result = "fail";
    retCode.retCode = 400;
    retCode.retMsg = "필수 파라미터가 누락되었습니다.";
    return res.json(retCode);
  }

  const { userId, password } = req.body;

  try {
    const user = await User.getUserByUserId(userId);

    if(!user) {
      retCode.result = "fail";
      retCode.retCode = 404;
      retCode.retMsg = "사용자 정보가 없습니다.";
      return res.json(retCode);
    }

    const isPasswordValid = await bcrypt.compare(password, user.user_pass);

    if(!isPasswordValid) {
      retCode.result = "fail";
      retCode.retCode = 401;
      retCode.retMsg = "비밀번호가 일치하지 않습니다.";
      return res.json(retCode);
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    retCode.result = "success";
    retCode.data = {
      token,
      user: {
        userId: user.user_id,
        nickname: user.nickname,
        phoneNumber: user.phone_number,
        profileImage: user.profile_image
      }
    }

    return res.json(retCode);
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