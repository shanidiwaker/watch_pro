/**
 * @format
 */
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {showSnackbar} from '../../../utils/SnackBar';

interface IResponseData {
  status: boolean;
  data: {message: string};
}

async function sendMsg(data: {
  receiver_id: string;
  message: string;
}): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/send_message`;
    const response: IResponseData = await client.post(url, data);
    if (response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: response.data, status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

const useMessageOperations = () => {
  const queryClient = useQueryClient();

  const sendMessage = async (data: {receiver_id: string; message: string}) => {
    try {
      const result = await sendMsg(data);
      console.log("result",result,data)
      if (result?.status === true) {
        queryClient.invalidateQueries(QueryKeys.messages);
        return result;
      }
       Alert.alert('Error', result?.data.message) // new
      return result;
    } catch (error) {
       Alert.alert('Error',  'Something went wrong') // new
      return error;
    }
  };

  return {sendMessage};
};

export {useMessageOperations};
