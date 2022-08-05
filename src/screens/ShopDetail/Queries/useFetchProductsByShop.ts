/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {IProducts} from '../../Home/Queries/useFetchProducts';

// export interface IShop {
//   id: number;
//   user_id: number;
//   name: string;
//   logo: string;
//   shop_like: string;
//   created_at: string;
//   updated_at: string;
// }
// export interface IBrand {
//   id: number;
//   user_id: number;
//   shop_id: number;
//   name: string;
//   material: string;
//   logo: string;
//   created_at: string;
//   updated_at: string;
// }
// export interface IUser {
//   id: number;
//   username: string;
//   email: string;
//   mobile_number: string;
//   uid: string;
// }

// export interface IProducts {
//   id: number;
//   user_id: number;
//   shop_id: number;
//   brand_id: number;
//   name: string;
//   price: string;
//   liked: boolean;
//   image: string;
//   size: string;
//   material: string;
//   warranty: string;
//   product_like: string;
//   created_at: string;
//   updated_at: string;
//   shop: IShop;
//   brand: IBrand;
//   user: IUser;
// }

interface IResponseData {
  status: boolean;
  data: IProducts[];
}

async function fetchProducts(
  id: number,
  filter: any,
  indexTab: any,
): Promise<IResponseData | undefined> {
  try {
    let url = '';
    console.log("indexTab",indexTab)
    switch (indexTab) {
      case 0:
        // const url = `${config.BASE_URL}user/shop_product`;
        url = `${config.BASE_URL}user/shop_product_filter?sort_by=${filter?.brand}&warranty=${filter?.warranty}&material=${filter?.material}&size=${filter?.size}&price=${filter?.price}&color=${filter?.color}`;
        console.log('url', url);
        break;
      case 1:
        url = `${config.BASE_URL}user/brand_wise_product`;
        break;
      case 2:
        url = `${config.BASE_URL}user/alphabatical_product`;
        break;
      default:
        break;
    }
    const response: IResponseData = await client.post(url, {shop_id: id});
    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

const useFetchProductsByShop = (id: number, filter: any, indexTab: number) => {
  const cacheKey = [QueryKeys.shopDetails, id];
  return useQuery(cacheKey, () => fetchProducts(id, filter, indexTab));
};

export {useFetchProductsByShop};
