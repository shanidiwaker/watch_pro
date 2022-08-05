/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';

export interface IFaqs {
  id: string;
  question: string;
  answer: string;
}

interface IResponseData {
  status: boolean;
  data: IFaqs[];
  SubTotal: string;
}

async function fetchFaqs(): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/get_faq`;
    const response: IResponseData = await client.get(url);
    if (response.status === true) {
      return {
        data: response.data,
        SubTotal: response.SubTotal,
        status: response.status,
      };
    }
    return {data: response.data, SubTotal: '0.00', status: false};
  } catch (error) {
    return error as IResponseData;
  }
}

const useSupportFaqs = () => {
  const cacheKey = 'support';
  return useQuery(cacheKey, fetchFaqs);
};

export {useSupportFaqs};
