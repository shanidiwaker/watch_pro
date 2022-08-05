/**
 * @format
 */
import {config} from '../../../config';
import client from '../../../utils/ApiClient';

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
  mobile_number: string;
  uid: string;
}

export interface IProducts {
  id: number;
  user_id: number;
  shop_id: number;
  brand_id: number;
  name: string;
  image: string;
  like: string;
  size: string;
  material: string;
  warranty: string;
  view: string;
  liked: boolean;
  product_like: string;
  created_at: string;
  updated_at: string;
  shop: IShop;
  brand: IBrand;
  user: IUser;
}

export interface IResponseData {
  status: boolean;
  data: IProducts[];
  trending_product: IProducts[];
}

async function fetchProducts(
  query: string,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/searchproduct/${query}`;
    const response: IResponseData = await client.get(url);
    if (response.data.length > 0 && response.status === true) {
      return {
        data: response.data,
        trending_product: response.trending_product,
        status: response.status,
      };
    }
    return {data: [], trending_product: [], status: false};
  } catch (error) {
    return {data: [], trending_product: [], status: false};
  }
}

const useSearchProducts = () => {
  const searchProduct = async (query: string) => {
    try {
      const response = await fetchProducts(query);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return {searchProduct};
};

export {useSearchProducts};
