/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @format
 */
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {config} from '../../../config';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';
import {store} from '../../../redux/store';
import {RootNavigationType} from '../../Home';
import {shopCreateSucess} from '../../../redux/reducers/user/UserActions';
import {IShop} from '../../Home/Queries/useFetchProducts';
import {Alert} from 'react-native';

interface IResponseData {
  data: {message: string; shop: IShop[]};
  status: boolean;
}
const useSubmitShop = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootNavigationType>();
  const dispatch = useDispatch();
  const createShop = async (values: any) => {
    try {
      const formData = new FormData();

      if (values.images?.length > 0) {
        values.images?.map(image => {
          formData.append('logo[]', image);
          return true;
        });
      }
      formData.append('name', values.name);

      const url = values.id
        ? `${config.BASE_URL}user/editshop/${values.id}`
        : `${config.BASE_URL}user/addshop`;
      console.log('jsonResponse', url);
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
        Alert.alert("Success", jsonResponse.data.message)

        dispatch(shopCreateSucess(jsonResponse.data.shop?.[0]));
        navigation.goBack();
        return jsonResponse;
      }
      Alert.alert("Error", jsonResponse.message)

      return jsonResponse;
    } catch (error: any) {
      
      const message = error?.message || 'Something went wrong!';
      

      Alert.alert("Error", message)
      return error;
    }
  };

  return {
    createShop,
  };
};

export {useSubmitShop};
