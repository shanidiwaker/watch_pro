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
  likes_collects: number;
  new_followers: number;
  comment: number;
}

async function fetchMessagesCount(): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/message`;
    const response: IResponseData = await client.post(url);
    if (response.status === true) {
      return {
        likes_collects: response.likes_collects,
        new_followers: response.new_followers,
        comment: response.comment,
        status: response.status,
      };
    }
    return {status: false, likes_collects: 0, new_followers: 0, comment: 0};
  } catch (error) {
    return {status: false, likes_collects: 0, new_followers: 0, comment: 0};
  }
}

const useMessageCounts = () => {
  const cacheKey = QueryKeys.messages;
  return useQuery(cacheKey, () => fetchMessagesCount());
};

export {useMessageCounts};
