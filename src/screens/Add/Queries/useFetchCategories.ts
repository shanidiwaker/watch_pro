/**
 * @format
 */
import { useQuery } from 'react-query';
import { config } from '../../../config';
import client from '../../../utils/ApiClient';
import { QueryKeys } from '../../../utils/QueryKeys';

export interface IShop {
  id: number;
  user_id: number;
  name: string;
  logo: string;
  shop_like: string;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  mobile_number: string;
  uid: string;
}

export interface ICategory {
  id: number;
  name: string;

}

export interface IResponseData {
  status: boolean;
  data: ICategory[];
}

async function fetchCategories(): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/getcategory`;
    const response: IResponseData = await client.get(url);
    if (response.data.length > 0 && response.status === true) {
      return { data: response.data, status: response.status };
    }
    return { data: [], status: false };
  } catch (error) {
    return { data: [], status: false };
  }
}

const useFetchCategories = () => {
  const cacheKey = QueryKeys.categories;
  return useQuery(cacheKey, fetchCategories);
};

export { useFetchCategories };
