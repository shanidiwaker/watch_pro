/**
 * @format
 */
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';
import {IShop, IUser} from '../../Home/Queries/useFetchProducts';
import {IResponseData as IShopResponse} from './useFetchProducts';

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

async function shopLike(id: number): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/shop_like`;
    const response: IResponseData = await client.post(url, {shop_id: id});
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

async function shopFollow(id: number): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/shop_follow`;
    const response: IResponseData = await client.post(url, {shop_id: id});
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

const useShopOperations = () => {
  const queryClient = useQueryClient();

  const updateCache = async (id: number, type: string) => {
    const response = await queryClient.getQueryData<IShopResponse>(
      QueryKeys.shops,
    );
    if (response) {
      const {data} = response;
      const updated = data.map(item => {
        if (item.id === id) {
          if (type === 'like') {
            return {...item, Like: item.Like + 1};
          }
          if (type === 'follow') {
            return {...item, Followers: item.Followers + 1};
          }
        }
        return item;
      });
      const updatedList = {...response, data: updated};
      await queryClient.setQueryData<IShopResponse>(
        QueryKeys.shops,
        updatedList,
      );
    }
  };

  const likeShop = async (id: number) => {
    try {
      const result = await shopLike(id);
      if (result?.data?.message === 'Shop Liked!!') {
        updateCache(id, 'like');
        queryClient.invalidateQueries(QueryKeys.shops);
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
  const followShop = async (id: number) => {
    try {
      const result = await shopFollow(id);
      if (result?.data?.message === 'Shop Follow Successfully!!') {
        updateCache(id, 'follow');
        queryClient.invalidateQueries(QueryKeys.shops);

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

  return {likeShop, followShop};
};

export {useShopOperations};
