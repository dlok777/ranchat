import { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '@/utils/common';
import { checkedParams, createRetCode } from '@/utils/common';
import { verifyApiToken } from '@/utils/auth';

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {

  const requiredParams = ['userId'];
  
  const retCode = createRetCode();

  let checked = await checkedParams(req.body, requiredParams);
  if(!checked) {
    retCode.result = "fail";
    retCode.retCode = 400;
    retCode.retMsg = "필수 파라미터가 누락되었습니다.";
    return res.json(retCode);
  }

  // Bearer 토큰 형식으로 토큰 확인
  const authResult = await verifyApiToken(req);
  if(!authResult.isValid) {
    retCode.result = "fail";
    retCode.retCode = authResult.statusCode;
    retCode.retMsg = authResult.message;
    return res.json(retCode);
  }

  retCode.result = "success"; 
  retCode.retMsg = "유효한 토큰입니다.";
  return res.json(retCode);
  
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