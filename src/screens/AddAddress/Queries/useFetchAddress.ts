/**
 * @format
 */
import {useQuery} from 'react-query';
import {IAddress} from '..';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {IShop, IUser} from '../../Home/Queries/useFetchProducts';

export interface IShopRes extends IShop {
  user: IUser;
  Like: string;
  Followers: string;
  Product: string;
}

export interface IResponseData {
  status: boolean;
  data: IAddress[];
}

async function fetchAddress(): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/get_address`;
    const response: IResponseData = await client.get(url);
    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

const useFetchAddress = () => {
  const cacheKey = QueryKeys.address;
  return useQuery(cacheKey, fetchAddress);
};

export {useFetchAddress};
