/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {IProduct} from '../../ProductDetails/Queries/useFetchProductDetails';

export interface ICartItems {
  id: string;
  user_id: string;
  product_id: string;
  product: IProduct;
}

interface IResponseData {
  status: boolean;
  data: ICartItems[];
  SubTotal: string;
}

async function fetchCartItems(): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/get_cart`;
    const response: IResponseData = await client.get(url);
    if (response.status === true) {
      return {
        data: response.data,
        SubTotal: response.SubTotal,
        status: response.status,
      };
    }
    return {data: response.data, SubTotal: '0.00', status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

const useFetchCartItems = () => {
  const cacheKey = 'fetchCartItems';
  return useQuery(cacheKey, fetchCartItems);
};

export {useFetchCartItems};
