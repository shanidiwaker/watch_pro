import {IShop, IUser} from '../../../screens/Home/Queries/useFetchProducts';
import {UserTypes} from './UserTypes';

export interface ILoginRequestData {
  username: string;
  password: string;
}

export interface IAppleLoginRequestData {
  name: string;
  social_id: string;
  device_id: string;
  platform: string;
  email: string;
}

export interface IRegisterRequestData {
  username: string;
  email: string;
  mobile_number: string;
  password: string;
}

export interface IResetRequestData {
  username: string;
  otp: string;
  new_password: string;
  confirm_new_password: string;
}
export interface IUserState {
  // email: string;
  // password: string;
  isLoggedIn: boolean;
  token: string | null;
  loading: boolean;
  username: string | null;
  refreshToken: string | null;
  otp: string;
  image: string;
  status: boolean;
  user: IUser | null;
  shop: IShop | null;
}

interface ILogin {
  type: UserTypes.LOGIN;
}

interface IAppleLogin {
  type: UserTypes.APPLE_LOGIN;
}

interface IRegister {
  type: UserTypes.REGISTER;
}

interface IForgotPassword {
  type: UserTypes.FORGOT_PASSWORD;
}

interface IResetPassword {
  type: UserTypes.RESET_PASSWORD;
}

export type IUserActions =
  | ILogin
  | IRegister
  | IForgotPassword
  | IResetPassword
  | IAppleLogin;
