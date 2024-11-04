import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/Class/User';
import { handleError } from '@/utils/common';
import { checkedParams, createRetCode } from '@/utils/common';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const retCode = createRetCode();
    let requiredParams = ['userId'];
    let checked = await checkedParams(req.query, requiredParams);
    if(!checked) {
      retCode.result = "fail";
      retCode.retCode = 400;
      retCode.retMsg = "필수 파라미터가 누락되었습니다.";
      retCode.data = {};
      return res.json(retCode);
    }
    
    //id값 받기
    const userId = req.query.userId;
    
    let user = await User.getUserByUserId(userId); // 사용자 조회
    if(!user) {
      retCode.result = "fail";
      retCode.retCode = 404;
      retCode.retMsg = "사용자 정보가 없습니다.";
      retCode.data = {};
      return res.json(retCode);
    }
    else {
      retCode.data.userId = user.user_id;

      return res.json(retCode);
    }
    
  } catch (error) {
    handleError(res, error);
  }
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  try {
    switch (req.method) {
      case 'GET':
        await handleGet(req, res);
        break;
      
      // case 'POST':
      //   await handlePost(req, res);
      //   break;
      
      // case 'PUT':
      //   await handlePut(req, res);
      //   break;
      
      // case 'DELETE':
      //   await handleDelete(req, res);
      //   break;

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    handleError(res, error);
  }
};