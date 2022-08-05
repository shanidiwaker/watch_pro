import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';

interface IUser {
  id: number | null;
  username: string | null;
  email: string | null;
  mobile_number: number | null;
  image: string | null;
  description: string | null;
  uid: string | null;
}

export interface ICommon {
  id: number | null;
  user_id: number | null;
  shop_id: number | null;
  brand_id: number | null;
  category_id: number | null;
  name: string | null;
  image: string | null;
  price: string | null;
  sale_price: string | null;
  description: string | null;
  product_view_count: number | null;
  total_like?: number | null;
}

export interface IResponse {
  status: boolean;
  Like: boolean;
  Followers: number | null;
  Following: number | null;

  User: IUser;
  Post: ICommon[] | null;

  Collects: ICommon[];
  Likes: ICommon[];
}

async function getUserProfile(id: number): Promise<IResponse | null> {
  try {
    const url = `${config.BASE_URL}user/get_user`;
    const response: IResponse = await client.post(url, {user_id: id});
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFetchProfile = (id: number) => {
  const cacheKey = [QueryKeys.userProfile, id];
  return useQuery(cacheKey, () => getUserProfile(id));
};

export {useFetchProfile};
