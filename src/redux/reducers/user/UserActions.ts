import {useQueryClient} from 'react-query';
import {Dispatch} from 'redux';
import {config} from '../../../config';
import {IShop, IUser} from '../../../screens/Home/Queries/useFetchProducts';
import client from '../../../utils/ApiClient';
import {showSnackbar} from '../../../utils/SnackBar';
import {UserTypes} from './UserTypes';

export const userLoginRequest = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.LOGIN_PENDING,
    });
  };
};

export const userLoginSuccess = (token: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.LOGIN_FULFILLED,
      payload: {token},
    });
  };
};

export const forgotPasswordError = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.FORGOT_PASSWORD_REJECTED,
    });
  };
};

export const forgotPasswordRequest = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.FORGOT_PASSWORD_PENDING,
    });
  };
};

export const forgotPasswordSuccess = (otp: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.FORGOT_PASSWORD_FULFILLED,
      payload: {otp},
    });
  };
};

export const userLoginError = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.LOGIN_REJECTED,
    });
  };
};

export const shopCreateSucess = (shop: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.SHOP_FULFILLED,
      payload: {shop},
    });
  };
};

export const updateProfileAction = (user: IUser) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.REGISTER_FULFILLED,
      payload: {user},
    });
  };
};

interface ILogout {
  message: string;
}
export interface ILogoutRes {
  status: boolean;
  data: ILogout;
}

export const userLogout = () => {
  return async (dispatch: Dispatch<any>) => {
    const url = `${config.BASE_URL}user/logout`;
    const response: ILogoutRes = await client.get(url);
    try {
      if (response.status) {
       //
      }
    } catch (error: any) {
      console.log('logout error', error);
    }

    dispatch({
      type: UserTypes.LOGOUT,
    });
    const queryClient = useQueryClient();
    queryClient.cancelQueries();
    queryClient.clear();
  };
};
