/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @format
 */
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from 'react-query';
import {config} from '../../../config';
import {QueryKeys} from '../../../utils/QueryKeys';
import {IResponseData as ICategoryReponse} from './useFetchCategories';
import {IResponseData as IBrandReponse} from './useFetchBrands';
import {store} from '../../../redux/store';
import {RootNavigationType} from '../../Home';

interface IResponseData {
  data: {message: string};
  status: boolean;
}
const useSubmitProduct = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootNavigationType>();

  const createProduct = async (values: any) => {
    try {
      const formData = new FormData();
      const brands = await queryClient.getQueryData<IBrandReponse>(
        QueryKeys.categories,
      );
      const categories = await queryClient.getQueryData<ICategoryReponse>(
        QueryKeys.categories,
      );
      if (values.images.length > 0) {
        values?.images?.map((image: any) => {
          formData.append('image[]', image);
          return image;
        });
      }

      Object.keys(values).map(key => {
        if (key === 'images') return false;
        if (key === 'category') {
          const category = categories?.data.filter(
            elem => elem.name === values[key],
          );
          formData.append('category_id', category?.[0]?.id);
        } else if (key === 'brand') {
          // const brand = brands?.data.filter(elem => elem.name === values[key]);
          formData.append('brand_id', values.brand_id);
          formData.append(key, values.colorId);
        } else if (key === 'color') {
          formData.append(key, values.colorId);
        } else if (key === 'material') {
          formData.append(key, values.materialId);
        } else if (key === 'size') {
          formData.append(key, values.sizeId);
        } else if (key === 'warranty') {
          formData.append(key, values.warrantyId);
        } else {
          formData.append(key, values[key]);
        }
        return key;
      });

      const url = `${config.BASE_URL}user/addproduct`;
      const {token} = store.getState().user;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      // const textRes = await response.text()
      const jsonResponse: IResponseData = await response.json();

      if (jsonResponse.status === true) {
        queryClient.invalidateQueries(QueryKeys.homeProducts);
        queryClient.invalidateQueries(QueryKeys.userProfile);
        Alert.alert('Success', jsonResponse.data.message);
        navigation.goBack();
        return jsonResponse;
      }
      Alert.alert('Error', jsonResponse.data.message);

      return jsonResponse;
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      Alert.alert('Error', message);
      return error;
    }
  };
  const updateProduct = async (values: any, productId: number) => {
    try {
      const formData = new FormData();
      const brands = await queryClient.getQueryData<IBrandReponse>(
        QueryKeys.categories,
      );
      const categories = await queryClient.getQueryData<ICategoryReponse>(
        QueryKeys.categories,
      );

      // Object.keys(values).map(key => {
      //   if (key === 'images') return false;
      //   if (key === 'category') {
      //     const category = categories?.data.filter(
      //       elem => elem.name === values[key],
      //     );
      //     formData.append('category_id', category?.[0]?.id);
      //   } else if (key === 'brand') {
      //     const brand = brands?.data.filter(elem => elem.name === values[key]);
      //     formData.append('brand_id', brand?.[0]?.id);
      //   } else {
      //     formData.append(key, values[key]);
      //   }

      //   return key;
      // });
      if (values.images.length > 0) {
        values?.images?.map((image: any) => {
          formData.append('image[]', image);
          return image;
        });
      }
      Object.keys(values).map(key => {
        if (key === 'images') return false;
        if (key === 'category') {
          const category = categories?.data.filter(
            elem => elem.name === values[key],
          );
          formData.append('category_id', category?.[0]?.id);
        } else if (key === 'brand') {
          // const brand = brands?.data.filter(elem => elem.name === values[key]);
          // formData.append('brand_id', brand?.[0]?.id);
          formData.append(key, values.brand_id);
        } else if (key === 'color') {
          formData.append(key, values.colorId);
        } else if (key === 'material') {
          formData.append(key, values.materialId);
        } else if (key === 'size') {
          formData.append(key, values.sizeId);
        } else if (key === 'warranty') {
          formData.append(key, values.warrantyId);
        } else {
          formData.append(key, values[key]);
        }
        return key;
      });
      const url = `${config.BASE_URL}user/updateproduct/${productId}`;

      const {token} = store.getState().user;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const jsonResponse: IResponseData = await response.json();
      if (jsonResponse.status === true) {
        queryClient.invalidateQueries(QueryKeys.homeProducts);
        queryClient.invalidateQueries(QueryKeys.shopDetails);
        queryClient.invalidateQueries([QueryKeys.shopDetails, productId]);
        queryClient.invalidateQueries([QueryKeys.productById, productId]);
        queryClient.invalidateQueries(QueryKeys.trendings);
        queryClient.invalidateQueries(QueryKeys.cartItems);
        queryClient.invalidateQueries(QueryKeys.userProfile);
        queryClient.invalidateQueries(QueryKeys.userProfile);
        const cache = [QueryKeys.productById, productId];
        queryClient.invalidateQueries(cache);
        Alert.alert('Success', jsonResponse.data.message);

        navigation.goBack();

        // }
        return jsonResponse;
      }
      Alert.alert('Error', jsonResponse.data.message);

      return jsonResponse;
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      Alert.alert('Error', message);

      return error;
    }
  };

  const updateImages = async (values: any, productId: number) => {
    try {
      const formData = new FormData();

      if (values.images.length > 0) {
        values.images.map((image: any) => {
          formData.append('image[]', image);
          return image;
        });
      }
      formData.append('product_id', productId);
      const url = `${config.BASE_URL}user/add_image_by_product`;
      const {token} = store.getState().user;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const jsonResponse: IResponseData = await response.json();
      if (jsonResponse.status === true) {
        queryClient.invalidateQueries(QueryKeys.homeProducts);

        queryClient.invalidateQueries(QueryKeys.userProfile);
        const cache = [QueryKeys.productById, productId];
        queryClient.invalidateQueries(cache);
        Alert.alert('Success', jsonResponse.data.message);
        navigation.goBack();
        return jsonResponse;
      }
      Alert.alert('Error', jsonResponse.data.message);
      return jsonResponse;
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      Alert.alert('Error', message);

      return error;
    }
  };
  const deleteImages = async (imageId: any, productId: number) => {
    try {
      const formData = new FormData();

      formData.append('image_id[]', imageId);
      formData.append('product_id', productId);
      const url = `${config.BASE_URL}user/delete_image_by_product`;
      const {token} = store.getState().user;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const jsonResponse: IResponseData = await response.json();
      if (jsonResponse.status === true) {
        queryClient.invalidateQueries(QueryKeys.homeProducts);
        queryClient.invalidateQueries(QueryKeys.userProfile);
        const cache = [QueryKeys.productById, productId];
        queryClient.invalidateQueries(cache);
        Alert.alert('Success', jsonResponse.data.message);

        // navigation.goBack();
        return jsonResponse;
      }

      Alert.alert('Error', jsonResponse.data.message);

      return jsonResponse;
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      Alert.alert('Error', message);
      return error;
    }
  };

  return {
    createProduct,
    updateProduct,
    updateImages,
    deleteImages,
  };
};

export {useSubmitProduct};
