// utils/handleError.ts
import { NextApiResponse } from 'next';

export const createRetCode = () => ({
  "result" : "success",
  "retCode": 200,
  "retMsg": "API 호출 성공",
  "data": {}
});

export const handleError = (res: NextApiResponse, error: any) => {
  console.error('API Error:', error);
  res.status(500).json({ message: '서버 에러가 발생했습니다.', error });
}

export const checkedParams = async (params: any, keys: string[]) => {
  for (const key of keys) {
    if (!params[key]) {
      return false;
    }
  }
  return true;
}

