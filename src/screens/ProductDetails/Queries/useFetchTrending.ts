/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';

export interface IShop {
  id: number;
  user_id: number;
  name: string;
  logo: string;
  shop_like: string;
  created_at: string;
  updated_at: string;
}
export interface IBrand {
  id: number;
  user_id: number;
  shop_id: number;
  name: string;
  material: string;
  logo: string;
  created_at: string;
  updated_at: string;
}
export interface IUser {
  id: number;
  username: string;
  email: string;
  image: string;
  mobile_number: string;
  uid: string;
}

export interface IComment {
  id: string;
  user_id: string;
  product_id: string;
  liked: number;
  ago: string;
  comment: string;
  count_comment_like: string;
  name: string;
  user_logo: string;
  innerChat: IComment[];
}
export interface IProduct {
  id: number;
  user_id: number;
  shop_id: number;
  sale_price: number;
  brand_id: number;
  name: string;
  image: string;
  size: string;
  followed: boolean;
  total_comment: string;
  material: string;
  warranty: string;
  description: string;
  product_like: string;
  liked: number | boolean;
  privacy_policy: string;
  shipping_returns: string;
  why_choose_watchpro: string;
  like: number;
  comment: IComment[];
  category: {id: string; name: string};
  collect: string;
  view: string;
  created_at: string;
  updated_at: string;
  shop: IShop;
  brand: IBrand;
  user: IUser;
}

interface IResponse {
  status: boolean;
  data: IProduct[];
}

async function fetchTrending(): Promise<IProduct[] | null> {
  try {
    const url = `${config.BASE_URL}user/trending_product`;

    const response: IResponse = await client.get(url);
    if (response.data.length > 0 && response.status === true) {
      return response.data;
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFetchTrending = () => {
  const cacheKey = QueryKeys.trendings;
  return useQuery(cacheKey, () => fetchTrending());
};

export {useFetchTrending};
