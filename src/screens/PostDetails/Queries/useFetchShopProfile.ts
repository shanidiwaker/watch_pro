/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';
import {IProducts} from '../../Home/Queries/useFetchProducts';

interface IResponseData {
  status: boolean;
  data: IProducts[];
}

async function fetchShopProfile(
  id: number,
): Promise<IResponseData | undefined> {
  try {
    const url = `${config.BASE_URL}user/shop_by_id/${id}`;
    console.log('url', url);

    const response: IResponseData = await client.post(url, {shop_id: id});
    if (response.data.length > 0 && response.status === true) {
      return {data: response.data, status: response.status};
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

const useFetchShopProfile = (id: number) => {
  const cacheKey = [QueryKeys.shopDetails, id];
  return useQuery(cacheKey, () => fetchShopProfile(id));
};

export {useFetchShopProfile};
