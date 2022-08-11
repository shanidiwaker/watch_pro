import Config from 'react-native-config';

// const {BASE_URL} = Config;
const BASE_URL = 'http://watchpro.yourang.io/api';
export const config = {
  BASE_URL: 'http://watchpro.yourang.io/api/',
  AUTH_API_URL: `${BASE_URL}/auth/user/login`,
  APPLE_LOGIN_URL: `${BASE_URL}/auth/user/apple/login`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/user/forgetpassword`,
  REGISTER_API: `${BASE_URL}/auth/user/register`,
  GET_PRODUCT_API_URL: `${BASE_URL}/user/getproduct`,
  SUPPORT_API: `${BASE_URL}/user/contact_customer_support`,
  REELS: `${BASE_URL}/user/getreels`,
};

export const APP_BASE_URL = Config.BASE_URL;
