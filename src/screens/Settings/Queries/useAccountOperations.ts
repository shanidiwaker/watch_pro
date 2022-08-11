/**
 * @format
 */
import {Alert} from 'react-native';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {showSnackbar} from '../../../utils/SnackBar';
import {IProducts} from '../../Home/Queries/useFetchProducts';

export interface IComment {
  product_id: string;
  comment_id: string;
  comment: string;
}

export interface IResponseData {
  status: boolean;
  data: {message: string};
}

export interface IResponseDataTRending {
  status: boolean;
  data: IProducts[];
}

export async function deleteAccount(): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/delete_user_account`;
    const response: IResponseData = await client.delete(url);
    console.log('response', response);
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

export async function deleteMyShop(
  id: number,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/delete_shop/${id}`;
    const response: IResponseData = await client.delete(url);
    console.log('response', response);
    return {data: response.data, status: response.status};
  } catch (error) {
    return error as IResponseData;
  }
}

const useAccountOperations = () => {
  const cancelAccount = async () => {
    try {
      const result = await deleteAccount();
      if (result?.status === 'true') {
         Alert.alert('Success', result?.data.message) // new;
        return result;
      }
       Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new

      return error;
    }
  };

  const deleteShop = async (id: number) => {
    try {
      const result = await deleteMyShop(id);
      if (result?.status === 'true') {
         Alert.alert('Success', result?.data.message) // new;
        return result;
      }
       Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new

      return error;
    }
  };

  return {
    cancelAccount,
    deleteShop,
  };
};

export {useAccountOperations};
