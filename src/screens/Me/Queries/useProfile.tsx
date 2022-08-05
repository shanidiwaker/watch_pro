import { useQuery } from "react-query";
import { config } from "../../../config";
import client from "../../../utils/ApiClient";
import { QueryKeys } from "../../../utils/QueryKeys";

interface IUser {
	id: number | null;
	username: string | null;
	email: string | null;
	mobile_number: number | null;
	image:string | null;
	description: string | null;
	uid: string | null;
}

export interface ICommon {
	id: number | null;
	user_id: number | null;
	shop_id: number | null;
	brand_id: number | null;
	category_id: number | null;
	name: string | null;
	image: string | null;
	price:string | null;
	sale_price:string | null;
	description: string | null;
	product_view_count: number | null;
	total_like?: number | null;
}

export interface IResponse {
	status: boolean;
	Like: boolean;
	Followers: number | null;
	Following: number | null;

	User: IUser;
	Post: ICommon[] | null;

	Collects: ICommon[];
	Likes:ICommon[];
}

async function getUserProfile(): Promise<IResponse | null>{
	try {
		const url = `${config.BASE_URL}user/user_profile`;
		const response: IResponse = await client.get(url);
		return Promise.resolve(response);
	} catch (error) {
		return Promise.reject(error);
	}
}

const useProfile = () => {
	const cacheKey = QueryKeys.userProfile;
	return useQuery(cacheKey,getUserProfile);
};

export {useProfile};