/**
 * @format
 */
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';
import {IProducts, IShop, IUser} from '../../Home/Queries/useFetchProducts';

export interface IShopRes extends IShop {
  user: IUser;
  Like: string;
  Followers: string;
  Product: string;
}

interface IResponseData {
  status: boolean;
  data: {message: string};
}

export interface IResponseDataProduct {
  status: boolean;
  data: IProducts[];
}

export async function userFollow(
  id: number,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/follow`;
    const response: IResponseData = await client.post(url, {
      follow_user_id: id,
    });
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

const useProfileOperations = () => {
  const queryClient = useQueryClient();

  const followUser = async (id: number) => {
    try {
      const result = await userFollow(id);
      const cacheQuery = [QueryKeys.userProfile, id];

      queryClient.invalidateQueries(cacheQuery);
      if (result?.status === true) {
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

  return {followUser};
};

export {useProfileOperations};
