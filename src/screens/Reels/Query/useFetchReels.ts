/**
 * @format
 */
import {useCallback} from 'react';
import {useInfiniteQuery} from 'react-query';
import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';

export interface INewsFeedResponseData {
  data: any[];
  status: boolean;
  total_count: number;
}

export interface IFeedPage {
  data: any[];
  pageNo: number;
  hasNext: boolean;
}
export interface IFeedPages {
  pages: IFeedPage[];
  pageParams?: number[];
}

async function fetchFeeds(
  id: number,
  pageNumber: number,
  reel: number,
): Promise<IFeedPage | undefined> {
  try {
    const url = `${config.REELS}?pagenumber=${pageNumber}&limit=2&id=${id}&reel=${reel}`;
    const response: INewsFeedResponseData = await client.get(url);

    if (response.data.length > 0 && response.status) {
      return {data: response.data, pageNo: pageNumber, hasNext: true};
    }
    return {data: [], pageNo: pageNumber, hasNext: false};
  } catch (error) {
    return {data: [], pageNo: pageNumber, hasNext: false};
  }
}

const useReels = (id: number, reel: number, enabled = true) => {
  const listQuery = useInfiniteQuery(
    QueryKeys.reels,
    ({pageParam = 1}) => fetchFeeds(id, pageParam, reel),
    {
      getNextPageParam: lastPage => {
        return lastPage?.hasNext ? lastPage.pageNo + 1 : null;
      },
      enabled,
    },
  );

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = listQuery;

  const feedList: any[] = [];

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (data) {
    data.pages.forEach(page => {
      if (page?.data) {
        feedList.push(...page.data);
      }
    });
  }

  return {
    ...listQuery,
    feedList,
    onEndReached,
  };
};

const useSingleNewsFeed = (documentId: string, enabled = true) => {
  const {feedList} = useReels(enabled);
  const newsFeed: any = feedList.find(
    item => item.documentId === documentId,
  ) as any;
  return {newsFeed};
};

export {useReels, useSingleNewsFeed};
