import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/Class/User';
import { handleError } from '@/utils/common';
import { checkedParams } from '@/utils/common';
import { retCode } from '@/utils/common';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let requiredParams = ['id'];
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
  try {
    // const newUser = await User.setUser(req.body); // 사용자 추가
    res.status(201).json({ id: '1', message: 'ok' });
  } catch (error) {
    handleError(res, error);
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const updatedUser = await User.setUser({ ...req.body, idx: req.body.idx }); // 사용자 정보 업데이트
    res.status(200).json({ id: '1', message: '사용자 정보가 업데이트되었습니다.' });
  } catch (error) {
    handleError(res, error);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const deleteId = req.body.idx; // 삭제할 사용자 ID
    // await User.deleteUser(deleteId); // 사용자 삭제
    res.status(200).json({ message: '사용자가 삭제되었습니다.' });
  } catch (error) {
    handleError(res, error);
  }
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
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