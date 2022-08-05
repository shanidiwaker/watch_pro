/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @format
 */
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {config} from '../../../config';
import {updateProfileAction} from '../../../redux/reducers/user/UserActions';
import {store} from '../../../redux/store';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';
import {RootNavigationType} from '../../Home';
import {IUser} from '../../Home/Queries/useFetchProducts';

export interface IEditProfile {
  username: string;
  email: string;
  mobile_number: string;
  image: string;
}

interface IResponseData {
  status: boolean;
  data: {message: string; user: IUser};
  message: string;
  username: [];
  email: [];
}

const useEditProfile = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootNavigationType>();
  const dispatch = useDispatch();
  const updateProfile = async (values: any) => {
    try {
      const formData = new FormData();

      if (values.image?.[0]?.uri) {
        const tempImage = values.image[0];
        const image = {
          name: tempImage.name,
          type: tempImage.type,
          uri: tempImage.uri,
        };
        formData.append('image', image);
      }
      if (values.cover_photo?.[0]?.uri) {
        const tempImage = values.cover_photo[0];
        const image = {
          name: tempImage.name,
          type: tempImage.type,
          uri: tempImage.uri,
        };
        formData.append('cover_photo', image);
      }

      Object.keys(values).map(key => {
        if (key === 'cover_photo') return false;
        if (key === 'image') return false;

        formData.append(key, values[key]);

        return key;
      });

      const url = `${config.BASE_URL}user/edit_profile`;
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
        Alert.alert('Success', jsonResponse.data.message);
        dispatch(updateProfileAction(jsonResponse.data.user));
        if (values.from !== 'profile') {
          navigation.goBack();
        }

        return jsonResponse;
      }
      Alert.alert('Success', jsonResponse.message);
      return jsonResponse;
    } catch (error: any) {
      const message = 'Something went wrong!';
      Alert.alert('Error', message);
      return error;
    }
  };

  const createAccount = async (values: any) => {
    try {
      const formData = new FormData();

      if (values.image?.[0]?.uri) {
        const tempImage = values.image[0];
        const image = {
          name: tempImage.name,
          type: tempImage.type,
          uri: tempImage.uri,
        };
        formData.append('image', image);
      }

      if (values.cover_photo?.[0]?.uri) {
        const tempImage = values.cover_photo[0];
        const image = {
          name: tempImage.name,
          type: tempImage.type,
          uri: tempImage.uri,
        };
        formData.append('cover_photo', image);
      }
      Object.keys(values).map(key => {
        if (key === 'cover_photo') return false;
        if (key === 'image') return false;

        formData.append(key, values[key]);

        return key;
      });
      const url = `${config.REGISTER_API}`;
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
        Alert.alert('Success', 'SignUp Successfully !!');

        navigation.goBack();
        return jsonResponse;
      }
      Alert.alert('Success', jsonResponse?.message);

      return jsonResponse;
    } catch (error: any) {
      const message = error;
      Alert.alert('Error', message);
      return error;
    }
  };

  const submitSupport = async (values: any) => {
    try {
      const url = `${config.SUPPORT_API}`;
      const response = await client.post(url, values);
      if (response.status) {
        Alert.alert('Success', response?.data?.message);

        navigation.goBack();
        return response;
      }
      Alert.alert('Error', response?.data?.message);

      return response;
    } catch (error: any) {
      const message = 'Something went wrong!';
      Alert.alert('Error', message);
      return error;
    }
  };

  return {
    updateProfile,
    createAccount,
    submitSupport,
  };
};

export {useEditProfile};
