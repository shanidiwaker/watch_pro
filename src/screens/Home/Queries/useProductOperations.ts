/**
 * @format
 */
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';
import {IProducts, IShop, IUser} from '../../Home/Queries/useFetchProducts';
// import {IResponseData as IProductResponse} from './useFetchProducts';

export interface IShopRes extends IShop {
  user: IUser;
  Like: string;
  Followers: string;
  Product: string;
}

interface IResponseData {
  status: boolean;
  data: {message: string};
}

export interface IResponseDataProduct {
  status: boolean;
  data: IProducts[];
}

export async function productLike(
  id: number,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/product_like`;
    const response: IResponseData = await client.post(url, {product_id: id});
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}
export async function productDelete(
  id: number,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/deleteproduct`;
    const response: IResponseData = await client.post(url, {product_id: id});
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}
export async function productCollect(
  id: number,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/product_add_collect`;
    const response: IResponseData = await client.post(url, {product_id: id});
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

async function fetchProducts(
  id: number,
): Promise<IResponseDataProduct | undefined> {
  try {
    let url = '';
    let response: IResponseDataProduct;
    if (id === 0) {
      url = `${config.BASE_URL}user/getproduct?pagenumber=1&limit=500`;
      response = await client.get(url);
    } else {
      url = `${config.BASE_URL}user/category_wise_product`;
      response = await client.post(url, {
        category_id: id,
      });
    }

    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

const useProductOperations = () => {
  const queryClient = useQueryClient();

  // const updateCache = async (id: number, type: string) => {
  //   const response = await queryClient.getQueryData<IProductResponse>(
  //     QueryKeys.homeProducts,
  //   );
  //   if (response) {
  //     const {data} = response;
  //     const updated = data.map(item => {
  //       if (item.id === id) {
  //         if (type === 'like') {
  //           return {...item, like: item.like + 1, liked: true};
  //         }
  //       }
  //       return item;
  //     });

  //     const updatedList = {...response, data: updated};
  //     await queryClient.setQueryData<IProductResponse>(
  //       QueryKeys.homeProducts,
  //       updatedList,
  //     );
  //   }
  // };

  const likePeoduct = async (id: number) => {
    try {
      const result = await productLike(id);
      // updateCache(id, 'like');
      queryClient.invalidateQueries(QueryKeys.homeProducts);
      queryClient.invalidateQueries(QueryKeys.shopDetails);
      queryClient.invalidateQueries([QueryKeys.shopDetails, id]);
      queryClient.invalidateQueries([QueryKeys.productById, id]);
      queryClient.invalidateQueries(QueryKeys.trendings);
      queryClient.invalidateQueries(QueryKeys.cartItems);
      queryClient.invalidateQueries(QueryKeys.userProfile);
      queryClient.invalidateQueries(QueryKeys.reels);
      //  Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const result = await productDelete(id);
      // updateCache(id, 'like');
      queryClient.invalidateQueries(QueryKeys.homeProducts);
      queryClient.invalidateQueries(QueryKeys.userProfile);
      Alert.alert('Success', result?.data?.message);
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };

  const productsbyCategory = async (id: number) => {
    try {
      const result = await fetchProducts(id);
      queryClient.setQueryData(QueryKeys.homeProducts, result);
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };

  return {likePeoduct, productsbyCategory, deleteProduct};
};

export {useProductOperations};
