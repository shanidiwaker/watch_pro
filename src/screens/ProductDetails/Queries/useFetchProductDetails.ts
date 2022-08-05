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
  user_id: string;
}

export interface IComment {
  id: string;
  user_id: string;
  username: string;
  product_id: string;
  liked: number;
  ago: string;
  comment: string;
  count_comment_like: string;
  name: string;
  user_logo: string;
  comment_reply: IComment[];
}
interface IImage {
  image: string;
}
export interface IProduct {
  id: number;
  user_id: number;
  shop_id: number;
  sale_price: number;
  price: number;
  category_id: number;
  brand_id: number;
  name: string;
  images: IImage[];
  size: string;
  followed: boolean;
  total_comment: string;
  material: string;
  intoCart: boolean;
  warranty: string;
  isCollected: boolean;
  description: string;
  product_like: string;
  collected: boolean;
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
  color: string;
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
    // QueryKeys.cartItems
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFetchProductDetails = (id: number) => {
  const cacheKey = [QueryKeys.productById, id];
  return useQuery(cacheKey, () => fetchProductById(id));
};

export {useFetchProductDetails};
