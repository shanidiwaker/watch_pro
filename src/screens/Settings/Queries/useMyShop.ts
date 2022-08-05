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

export interface IProduct {
  id: number;
  user_id: number;
  shop_id: number;
  sale_price: number;
  brand_id: number;
  name: string;
  image: string;
  size: string;
  material: string;
  warranty: string;
  description: string;
  product_like: string;
  privacy_policy: string;
  shipping_returns: string;
  why_choose_watchpro: string;
  like: number;
  comment: string;
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

async function fetchProductById(id: number): Promise<IProduct | null> {
  try {
    const url = `${config.BASE_URL}user/product_by_id`;

    const response: IResponse = await client.post(url, {product_id: id});
    if (response.data.length > 0 && response.status === true) {
      return response.data[0];
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFetchProductDetails = (id: number) => {
  const cacheKey = QueryKeys.productById;
  return useQuery(cacheKey, () => fetchProductById(id));
};

export {useFetchProductDetails};
