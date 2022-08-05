/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @format
 */
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {IAddress} from '..';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {RootNavigationType} from '../../Home';

export interface IEditProfile {
  username: string;
  email: string;
  mobile_number: string;
  image: string;
}

interface IResponseData {
  status: boolean;
  data: {message: string};
}

const useSaveAddress = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootNavigationType>();

  async function editAddress(
    data: IAddress,
  ): Promise<IResponseData | undefined> {
    try {
      const url = `${config.BASE_URL}user/edit_address/${data.id}`;
      const response: IResponseData = await client.post(url, data);
      if (response.status === true) {
        queryClient.invalidateQueries(QueryKeys.address);
        navigation.goBack();
        Alert.alert('Success', response?.data.message);

        return {data: response.data, status: response.status};
      }
      return {data: response.data, status: false};
    } catch (error) {
      return error as IResponseData;
    }
  }

  async function addAddress(
    data: IAddress,
  ): Promise<IResponseData | undefined> {
    try {
      const url = `${config.BASE_URL}user/add_address`;
      const response: IResponseData = await client.post(url, data);
      if (response.status === true) {
        queryClient.invalidateQueries(QueryKeys.address);
        navigation.goBack();
        Alert.alert('Success', response?.data.message);

        return {data: response.data, status: response.status};
      }
      return {data: response.data, status: false};
    } catch (error) {
      return error as IResponseData;
    }
  }

  return {addAddress, editAddress};
};

export {useSaveAddress};
