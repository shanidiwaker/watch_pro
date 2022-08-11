/**
 * @format
 */
import {useQuery} from 'react-query';
import {config} from '../../../config';
import {ChatType} from '../../../navigation';
import client from '../../../utils/ApiClient';
import {QueryKeys} from '../../../utils/QueryKeys';

export interface IChat {
  user_id: string;
  user_name: string;
  image: string;
  message: string;
  created_at: string;
}

export interface IResponseData {
  status: boolean;
  data: IChat[];
}
export interface ITempResponseData {
  liked_user: IChat[];
  collected_user: IChat[];
  commented_user: IChat[];
  new_followers: IChat[];
  status: boolean;
  data: IChat[];
}

async function fetchLikeChats(): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/likes_collects`;
    const response: ITempResponseData = await client.post(url);
    if (response.status === true) {
      return {
        data: [...response.liked_user, ...response.collected_user],
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function fetchUserList(): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/get_all_users`;
    const response: any = await client.get(url);
    if (response.status === true) {
      return {
        data: response.Data,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}
async function fetchComments(): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/comments`;
    const response: ITempResponseData = await client.post(url);
    if (response.status === true) {
      return {
        data: response.commented_user,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function productLike(id: number): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/product_like_user_list`;
    const response: ITempResponseData = await client.post(url, {
      product_id: id,
    });
    if (response.status === true) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}
async function productCollect(id: number): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/product_collect_user_list`;
    const response: ITempResponseData = await client.post(url, {
      product_id: id,
    });
    if (response.status === true) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function productComments(id: number): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/product_follower_user_list`;
    const response: ITempResponseData = await client.post(url, {
      product_id: id,
    });
    if (response.status === true) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function shopLikes(id: number): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/shop_like_user_list`;
    const response: ITempResponseData = await client.post(url, {
      shop_id: id,
    });
    if (response.status === true) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function shopFollower(id: number): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/shop_follow_user_list`;
    const response: ITempResponseData = await client.post(url, {
      shop_id: id,
    });
    if (response.status === true) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}
async function userFollower(id: number): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/user_follower_list`;
    const response: ITempResponseData = await client.post(url, {
      user_id: id,
    });
    if (response.status === true) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

async function userFollowing(id: number): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/user_following_list`;
    const response: ITempResponseData = await client.post(url, {
      user_id: id,
    });
    if (response.status === true) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}
async function fetchFollower(): Promise<IResponseData | undefined> {
  try {
    // url = `${config.BASE_URL}user/get_message_user_list`;
    const url = `${config.BASE_URL}user/new_followers`;
    const response: ITempResponseData = await client.post(url);
    if (response.status === true) {
      return {
        data: response.new_followers,
        status: response.status,
      };
    }
    return {data: [], status: false};
  } catch (error) {
    return {data: [], status: false};
  }
}

const useFetchChats = (type: ChatType, id = 0) => {
  const cacheKey = [QueryKeys.chats, type];
  let tempFunction: () => void;
  switch (type) {
    case 'all':
      tempFunction = () => fetchUserList();
      break;
    case 'likes':
      tempFunction = () => fetchLikeChats();
      break;
    case 'comments':
      tempFunction = () => fetchComments();
      break;
    case 'follower':
      tempFunction = () => fetchFollower();
      break;
    case 'product_like':
      tempFunction = () => productLike(id);
      break;
    case 'product_collect':
      tempFunction = () => productCollect(id);
      break;
    case 'product_comment':
      tempFunction = () => productComments(id);
      break;
    case 'shop_like':
      tempFunction = () => shopLikes(id);

      break;
    case 'shop_follower':
      tempFunction = () => shopFollower(id);
      break;
    case 'user_follower':
      tempFunction = () => userFollower(id);
      break;
    case 'user_following':
      tempFunction = () => userFollowing(id);
      break;
    default:
      break;
  }
  return useQuery(cacheKey, () => tempFunction());
};

export {useFetchChats};
