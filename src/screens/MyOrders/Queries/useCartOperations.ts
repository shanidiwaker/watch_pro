/**
 * @format
 */
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';
import {RootNavigationType} from '../../Home';

interface IResponseDataAdd {
  status: boolean;
  order_id?: string;
  data: {message: string};
}

async function addintoCart(id: number): Promise<IResponseDataAdd | undefined> {
  try {
    const url = `${config.BASE_URL}user/add_to_cart`;
    const response: IResponseDataAdd = await client.post(url, {product_id: id});
    if (response.status === true) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {data: response.data, order_id: '', status: false};
  } catch (error) {
    return error as IResponseDataAdd;
  }
}
async function checkout(): Promise<IResponseDataAdd | undefined> {
  try {
    const url = `${config.BASE_URL}user/checkout`;
    const response: IResponseDataAdd = await client.post(url);
    if (response.status === true) {
      return {
        data: response.data,
        order_id: response.order_id,
        status: response.status,
      };
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseDataAdd;
  }
}
async function removeintoCart(
  id: number,
): Promise<IResponseDataAdd | undefined> {
  try {
    const url = `${config.BASE_URL}user/remove_cart`;
    const response: IResponseDataAdd = await client.post(url, {product_id: id});
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseDataAdd;
  }
}
async function delivertoAddress(params: {
  order_id: string;
  address_id: string;
}): Promise<IResponseDataAdd | undefined> {
  try {
    const url = `${config.BASE_URL}user/deliver_address`;
    const response: IResponseDataAdd = await client.post(url, params);
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseDataAdd;
  }
}
const useCartOperations = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootNavigationType>();

  const addtoCart = async (id: number) => {
    try {
      const result = await addintoCart(id);
      if (result?.data?.message === 'Product Added To Cart!!') {
        queryClient.invalidateQueries(QueryKeys.cartItems);
         Alert.alert('Success', result?.data.message) // new;
        return result;
      }
       Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new
      return error;
    }
  };

  const removetoCart = async (id: number) => {
    try {
      const result = await removeintoCart(id);
      if (result?.data?.message === 'Cart Item Remove Successfully!!') {
        queryClient.invalidateQueries(QueryKeys.cartItems);
         Alert.alert('Success', result?.data.message) // new;
        return result;
      }
       Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new
      return error;
    }
  };
  const proceedCheckout = async () => {
    try {
      const result = await checkout();
      if (result?.status === true) {
        queryClient.invalidateQueries(QueryKeys.cartItems);
        navigation.navigate('Checkout', {orderId: result?.order_id || ''});

         Alert.alert('Success', result?.data.message) // new;
        return result;
      }
       Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new
      return error;
    }
  };

  const totheAdress = async (data: {order_id: string; address_id: string}) => {
    try {
      const result = await delivertoAddress(data);
      if (result?.status === true) {
        queryClient.invalidateQueries(QueryKeys.cartItems);
        navigation.navigate('HomeTabs');
         Alert.alert('Success', result?.data.message) // new;
        return result;
      }
       Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new
      return error;
    }
  };

  return {addtoCart, removetoCart, proceedCheckout, totheAdress};
};

export {useCartOperations};
