/**
 * @format
 */
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';
import {
  IResponseDataProduct,
  productLike,
} from '../../Home/Queries/useProductOperations';

export interface IComment {
  product_id: string;
  comment: string;
}

export interface IFilterResponse {
  status: boolean;
  data: any;
}

async function fetchProductsByFilter(
  filter: string,
  id: number,
  option = '',
): Promise<IResponseDataProduct | undefined> {
  try {
    let url = '';
    switch (filter) {
      case 'Show All':
        url = `${config.BASE_URL}user/shop_product`;
        break;
      case 'By Brands':
        url = `${config.BASE_URL}user/brand_wise_product`;
        break;
      case 'Alphabeticals':
        url = `${config.BASE_URL}user/alphabatical_product`;
        break;
      case 'other':
        url = `${config.BASE_URL}user/shop_product_filter?q=${option}`;
        break;
      default:
        break;
    }
    const response: IResponseDataProduct = await client.post(url, {
      shop_id: id,
    });

    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function fetchSizes(): Promise<IFilterResponse | undefined> {
  try {
    const url = `${config.BASE_URL}user/get_size`;

    const response: IFilterResponse = await client.get(url);

    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}
async function fetchColors(): Promise<IFilterResponse | undefined> {
  try {
    const url = `${config.BASE_URL}user/get_color`;

    const response: IFilterResponse = await client.get(url);

    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function fetchWarranty(): Promise<IFilterResponse | undefined> {
  try {
    const url = `${config.BASE_URL}user/get_warranty`;

    const response: IFilterResponse = await client.get(url);

    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function fetchMaterial(): Promise<IFilterResponse | undefined> {
  try {
    const url = `${config.BASE_URL}user/get_material`;

    const response: IFilterResponse = await client.get(url);

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

  const likeProduct = async (id: number) => {
    try {
      const result = await productLike(id);
      if (result?.status === true) {
        queryClient.invalidateQueries(QueryKeys.shopDetails);
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

  const productsbyFilter = async (filter: string, id: number, option = '') => {
    try {
      const result = await fetchProductsByFilter(filter, id, option);
      queryClient.setQueryData(QueryKeys.shopDetails, result);
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new

      return error;
    }
  };

  const getSizes = async () => {
    try {
      const result = await fetchSizes();
      queryClient.setQueryData(QueryKeys.sizes, result);
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new

      return error;
    }
  };

  const getColors = async () => {
    try {
      const result = await fetchColors();
      queryClient.setQueryData(QueryKeys.colors, result);
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new

      return error;
    }
  };

  const getWarranty = async () => {
    try {
      const result = await fetchWarranty();
      queryClient.setQueryData(QueryKeys.warranty, result);
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new

      return error;
    }
  };

  const getMaterial = async () => {
    try {
      const result = await fetchMaterial();
      queryClient.setQueryData(QueryKeys.sizes, result);
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new

      return error;
    }
  };

  return {
    likeProduct,
    productsbyFilter,
    getSizes,
    getColors,
    getWarranty,
    getMaterial,
  };
};

export {useProductOperations};
