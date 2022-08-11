/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';

interface IUserChat {
  id: string;
  name: string;
  avtar: string;
}
export interface IMessageReponse {
  id: string | number;
  text: string;
  created_at: Date | number;
  user: IUserChat;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

export interface IResponseData {
  status: boolean;
  data: IMessageReponse[];
}

async function fetchMessages(
  id: number,
  userId: number,
): Promise<IResponseData | undefined> {
  try {
    console.log({
      receiver_id: id,
      sender_id: userId,
    });
    const url = `${config.BASE_URL}user/get_recevier_message`;
    const response: IResponseData = await client.post(url, {
      receiver_id: id,
      sender_id: userId,
    });
    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

const useFetchMessages = (id: number, userId: number) => {
  const cacheKey = QueryKeys.messages;
  return useQuery(cacheKey, () => fetchMessages(id, userId));
};

export {useFetchMessages};
