/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {IProduct} from '../../ProductDetails/Queries/useFetchProductDetails';

export interface IMyOrderItems {
  id: string;
  user_id: string;
  product_id: string;
  product: IProduct;
}

interface IResponseData {
  status: boolean;
  data: IMyOrderItems[];
  SubTotal: string;
}

async function fetchMyOrderItems(): Promise<IResponseData | undefined> {
  console.log("fetchMyOrderItems")
  try {
    const url = `${config.BASE_URL}user/get_order`;
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

const useFetchMyOrderItems = () => {
  const cacheKey = QueryKeys.cartItems;
  return useQuery(cacheKey, fetchMyOrderItems,{enabled:true});
};

export {useFetchMyOrderItems};
