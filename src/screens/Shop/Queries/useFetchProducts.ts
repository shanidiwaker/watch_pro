/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {IShop, IUser} from '../../Home/Queries/useFetchProducts';

export interface IShopRes extends IShop {
  user: IUser;
  Like: string;
  Followers: string;
  Product: string;
  followed: boolean;
  collects: string;
  liked: boolean;
}

export interface IResponseData {
  status: boolean;
  data: IShopRes[];
}

async function fetchShops(): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/getshop`;
    const response: IResponseData = await client.get(url);
    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

const useFetchShops = () => {
  const cacheKey = QueryKeys.shops;
  return useQuery(cacheKey, fetchShops);
};

export {useFetchShops};
