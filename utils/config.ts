import dotenv from 'dotenv';

dotenv.config();

interface Config {
  API_URL: string;
}

const isDevelopment = process.env.NODE_ENV === 'development';

const config: Config = {
  API_URL: isDevelopment ? process.env.NEXT_PUBLIC_DEV_API_URL! : process.env.NEXT_PUBLIC_PROD_API_URL!,
};

// 설정값이 제대로 로드되었는지 확인
Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Configuration error: ${key} is not defined`);
  }
});

// 설정값을 변경할 수 없도록 freeze
const frozenConfig = Object.freeze(config);
export default frozenConfig;
export type ConfigType = typeof frozenConfig;
