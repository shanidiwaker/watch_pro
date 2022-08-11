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
  logo: [{image: string}];
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
  cover_photo: string;
}

export interface IProducts {
  id: number;
  user_id: number;
  shop_id: number;
  brand_id: number;
  price: number;
  name: string;
  image: string;
  images: string;
  collected: string;
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
}

async function fetchProducts(): Promise<IResponseData | undefined> {
  try {
    let url = '';

    url = `${config.BASE_URL}user/getproduct?pagenumber=1&limit=500`;
    const response: IResponseData = await client.get(url);

    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

const useFetchProducts = () => {
  const cacheKey = QueryKeys.homeProducts;

  return useQuery(cacheKey, () => fetchProducts(), {enabled: true});
};

export {useFetchProducts};
