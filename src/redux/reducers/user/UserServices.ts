/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import {Dispatch} from 'redux';
import {Alert} from 'react-native';
import {UserTypes} from './UserTypes';
import {
  IAppleLoginRequestData,
  ILoginRequestData,
  IRegisterRequestData,
  IResetRequestData,
  IUserActions,
} from './UserInterface';
import {IResponseData} from '../../../constants/types';
import client from '../../../utils/ApiClient';
import {config} from '../../../config';

export const userLogin = (data: ILoginRequestData) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.LOGIN,
      payload: async () => {
        try {
          const response: IResponseData = await client.post(
            config.AUTH_API_URL,
            data,
          );
          console.log('response', JSON.stringify(response, null, 2));
          const resData = {accessToken: '', shop: null, user: null};
          if (response.status === 'true') {
            const token = response[0].original.access_token;
            resData.accessToken = token;
            resData.shop = response[0].original.shop;
            resData.user = response[0].original.user;
            if (response) {
              //
            }
            return Promise.resolve(resData);
          }
          Alert.alert('Error', response.data.message);

          return Promise.reject(resData);
        } catch (error: any) {
          console.log('error', JSON.stringify(error, null, 2));
          Alert.alert('Error', 'something went wrong!');

          return Promise.reject(error);
        }
      },
    });
  };
};

export const userAppleLogin = (data: IAppleLoginRequestData) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.APPLE_LOGIN,
      payload: async () => {
        try {
          console.log('data', data);
          const response: IResponseData = await client.post(
            config.APPLE_LOGIN_URL,
            data,
          );
          console.log('response', JSON.stringify(response, null, 2));
          const resData = {accessToken: '', shop: null, user: null};
          if (response.status === 'true') {
            const token = response[0].original.access_token;
            resData.accessToken = token;
            resData.shop = response[0].original.shop;
            resData.user = response[0].original.user;
            if (response) {
              //
            }
            return Promise.resolve(resData);
          }
          Alert.alert('Error', response.data.message);

          return Promise.reject(resData);
        } catch (error: any) {
          console.log('error', JSON.stringify(error, null, 2));
          Alert.alert('Error', 'something went wrong!');

          return Promise.reject(error);
        }
      },
    });
  };
};

export const userRegister = (data: IRegisterRequestData) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.REGISTER,
      payload: async () => {
        try {
          const res: IResponseData = await client.post(
            config.REGISTER_API,
            data,
          );
          let status = false;
          if (res.status) {
            const newLocal = res.data.message || 'You Register SuccessFully!';
            Alert.alert('Success', newLocal);

            status = true;
          }

          return Promise.resolve(status);
        } catch (error: any) {
          console.log('error', error);
          Alert.alert('Error', error?.username[0]);

          return Promise.reject(error);
        }
      },
    });
  };
};

export const forgotPassword = (data: {username: string}) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.FORGOT_PASSWORD,
      payload: async () => {
        try {
          const response: IResponseData = await client.post(
            config.FORGOT_PASSWORD,
            data,
          );
          console.log('response', JSON.stringify(response, null, 2));

          return Promise.resolve(response);
        } catch (error: any) {
          console.log('error', error);
          Alert.alert('Error', 'something went wrong!');

          return Promise.reject(error);
        }
      },
    });
  };
};

export const resetPassword = (data: IResetRequestData) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.RESET_PASSWORD,
      payload: async () => {
        try {
          const response: IResponseData = await client.post(
            config.FORGOT_PASSWORD,
            data,
          );
          if (response) {
            if (response) {
              Alert.alert('Success', 'Password changed successfully');
            }
          }
          return Promise.resolve(response);
        } catch (error: any) {
          console.log('error', error);
          Alert.alert('Error', 'something went wrong!');

          return Promise.reject(error);
        }
      },
    });
  };
};
