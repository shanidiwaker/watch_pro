/**
 * @format
 */
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';
import {IProducts} from '../../Home/Queries/useFetchProducts';
import {
  productCollect,
  productLike,
} from '../../Home/Queries/useProductOperations';

export interface IComment {
  product_id: string;
  comment_id: string;
  comment: string;
}

export interface IResponseData {
  status: boolean;
  data: {message: string};
}

export interface IResponseDataTRending {
  status: boolean;
  data: IProducts[];
}

async function commentONProduct(
  data: IComment,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/add_comment`;
    const response: IResponseData = await client.post(url, data);
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}
async function commentreply(
  data: IComment,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/add_comment_reply`;
    const response: IResponseData = await client.post(url, data);
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

async function trending_product(): Promise<IResponseDataTRending | undefined> {
  try {
    const url = `${config.BASE_URL}user/trending_product`;
    const response: IResponseDataTRending = await client.get(url);
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseDataTRending;
  }
}

export async function commentLike(
  id: number,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/comment_like`;
    const response: IResponseData = await client.post(url, {comment_id: id});
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

export async function followProduct(
  id: number,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/shop_follow`;
    const response: IResponseData = await client.post(url, {shop_id: id});
    console.log('response', JSON.stringify(response, null, 2));
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}
const useProductOperations = (productId: number) => {
  const queryClient = useQueryClient();

  const commentProduct = async (data: IComment) => {
    try {
      const result = await commentONProduct(data);
      if (result?.status === true) {
        queryClient.invalidateQueries([QueryKeys.productById, productId]);
        queryClient.invalidateQueries(QueryKeys.reels);

        Alert.alert('Success', result?.data.message); // new;
        return result;
      }
      Alert.alert('Error', result?.data.message); // new
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };

  const productFollow = async (id: number) => {
    try {
      const result = await followProduct(id);
      if (result?.status === true) {
        queryClient.invalidateQueries(QueryKeys.shopDetails);
        queryClient.invalidateQueries([QueryKeys.shopDetails, productId]);
        queryClient.invalidateQueries([QueryKeys.productById, productId]);
        queryClient.invalidateQueries(QueryKeys.trendings);
        queryClient.invalidateQueries(QueryKeys.cartItems);
        queryClient.invalidateQueries(QueryKeys.userProfile);
        Alert.alert('Success', result?.data.message); // new;
        return result;
      }
      Alert.alert('Error', result?.data.message); // new
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };
  const likeComment = async (id: number) => {
    try {
      const result = await commentLike(id);
      // if (result?.status === true) {
      //    Alert.alert('Success', result?.data.message) // new;
      //   return result;
      // }
      queryClient.invalidateQueries([QueryKeys.productById, productId]);

      //  Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };

  const likeProduct = async (id: number) => {
    try {
      const result = await productLike(id);

      queryClient.invalidateQueries(QueryKeys.shopDetails);
      queryClient.invalidateQueries([QueryKeys.shopDetails, productId]);
      queryClient.invalidateQueries([QueryKeys.productById, productId]);
      queryClient.invalidateQueries(QueryKeys.trendings);
      queryClient.invalidateQueries(QueryKeys.cartItems);
      queryClient.invalidateQueries(QueryKeys.userProfile);
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };

  const collectProduct = async (id: number) => {
    try {
      const result = await productCollect(id);
      // if (result?.status === true) {
      queryClient.invalidateQueries(QueryKeys.shopDetails);
      queryClient.invalidateQueries([QueryKeys.shopDetails, productId]);
      queryClient.invalidateQueries([QueryKeys.productById, productId]);
      queryClient.invalidateQueries(QueryKeys.trendings);
      queryClient.invalidateQueries(QueryKeys.cartItems);
      queryClient.invalidateQueries(QueryKeys.userProfile);
      Alert.alert('Success', result?.data?.message);

      return result;
      // }
      //  Alert.alert('Error', result?.data.message) // new

      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };

  const fetchTrendingProducts = async () => {
    try {
      const result = await trending_product();
      if (result?.status === true) {
        queryClient.setQueryData(QueryKeys.productById, result.data);
        return result;
      }
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };
  const commentReply = async (data: IComment) => {
    try {
      const result = await commentreply(data);
      if (result?.status === true) {
        queryClient.invalidateQueries([QueryKeys.productById, productId]);
        Alert.alert('Success', result?.data.message); // new;
        return result;
      }
      Alert.alert('Error', result?.data.message); // new
      return result;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong'); // new

      return error;
    }
  };
  return {
    commentProduct,
    likeProduct,
    likeComment,
    productFollow,
    collectProduct,
    fetchTrendingProducts,
    commentReply,
  };
};

export {useProductOperations};
