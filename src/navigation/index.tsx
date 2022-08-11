import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RNBootSplash from 'react-native-bootsplash';

import {navTheme} from '../theme';

import useUserInfo from '../hooks/useUserInfo';
import {navigationRef} from './navigationRef';
import About from '../screens/About/Index';
import Add from '../screens/Add';
import Search from '../screens/Search';
import PostDetails from '../screens/PostDetails';
import UserProfile from '../screens/UserProfile';
import Me from '../screens/Me';
import ProductDetails from '../screens/ProductDetails';
import ShopDetail from '../screens/ShopDetail';
import Chat from '../screens/Chat';
import Settings from '../screens/Settings';
import GeneralSettings from '../screens/GeneralSettings';

// Auth Screen
import Login from '../screens/Auth/Login';
import LoginOptions from '../screens/Auth/LoginOptions';
import UnSplash from '../screens/Auth/UnSplash';
import CreateAccount from '../screens/Auth/CreateAccount';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import CreateShop from '../screens/CreateShop';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ResetPassword from '../screens/Auth/ResetPassword';
import SearchedProducts from '../screens/SearchedAllProduct';
import {IProducts} from '../screens/Search/Queries/useSearchProducts';
import EditAccount from '../screens/EditUser';
import AddAddress, {IAddress} from '../screens/AddAddress';
import ChatDetails from '../screens/ChatDetails';
import {IShop} from '../screens/Home/Queries/useFetchProducts';
import Comments from '../screens/Comments';
import UserList from '../screens/UserList';
import Support from '../screens/CustomerSupport';
import HomeTabs from './HomeTabs';
import EditProfile from '../screens/EditProfile';
import AccountSettings from '../screens/AccountSettings';
import SupportForm from '../screens/CustomerSupport/SupportForm';
import MyOrders from '../screens/MyOrders';
import Cards from '../screens/Payment';
import ShippingAdress from '../screens/ShippingAddress';
import BPayment from '../screens/BitCoinPayment';
import Reels from '../screens/Reels';
import AddReel from '../screens/AddReels';

export type ChatType =
  | 'all'
  | 'likes'
  | 'follower'
  | 'comments'
  | 'product_like'
  | 'product_collect'
  | 'product_comment'
  | 'shop_like'
  | 'shop_follower'
  | 'user_follower'
  | 'user_following';
export type RootStackParamList = {
  HomeTabs: undefined;
  Login: undefined;
  LoginOptions: undefined;
  UnSplash: undefined;
  CreateAccount: undefined;
  DrawerMenu: undefined;
  Add: undefined;
  EditProduct: {id: number};
  Search: undefined;
  UserProfile: {user_id: number};
  ShopDetail: {id: number; shopName: string; shopImage: string};
  ShopProfile: {id: number};
  Me: undefined;
  About: undefined;
  ProductDetails: {id: number; status: string};
  Chat: {type: ChatType; id?: number};
  Settings: undefined;
  GeneralSettings: undefined;
  Cart: undefined;
  Checkout: undefined;
  createShop: undefined;
  updateShop: {shop: IShop};
  ForgotPassword: undefined;
  ResetPassword: {otp: string; username: string};
  SearchedProducts: {products: IProducts[]};
  EditAccount: undefined;
  AddAddress: undefined;
  EditAddress: {data: IAddress};
  ChatDetails: {user_id: string; image: string; name: string};
  Comments: {id: number};
  UserList: {type: ChatType; id?: number; title: string};
  Support: undefined;
  EditProfile: undefined;
  AccountSettings: undefined;
  SupportForm: undefined;
  MyOrders: undefined;
  Payment: {address_id: number};
  ShippingAdress: undefined;
  BPayment: undefined;
  Reels: {id: number; reel: number};
  AddReel: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavContainer() {
  const {isLoggedIn} = useUserInfo();

  // React.useEffect(() => {
  //   if (isLoggedIn) {

  //   }
  // }, [isLoggedIn]);
  const hideSplasScreen = () => {
    RNBootSplash.hide({fade: true});
  };

  return (
    <NavigationContainer
      theme={navTheme}
      independent
      ref={navigationRef}
      onReady={hideSplasScreen}>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="UnSplash" component={UnSplash} />
            <Stack.Screen name="LoginOptions" component={LoginOptions} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="UnSplash" component={UnSplash} /> */}
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Add" component={Add} />
            <Stack.Screen name="AddReel" component={AddReel} />
            <Stack.Screen name="EditProduct" component={Add} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="ShopDetail" component={ShopDetail} />
            <Stack.Screen name="ShopProfile" component={PostDetails} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Me" component={Me} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="GeneralSettings" component={GeneralSettings} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="createShop" component={CreateShop} />
            <Stack.Screen name="updateShop" component={CreateShop} />
            <Stack.Screen name="AddAddress" component={AddAddress} />
            <Stack.Screen name="EditAddress" component={AddAddress} />
            <Stack.Screen name="ChatDetails" component={ChatDetails} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="SupportForm" component={SupportForm} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="AccountSettings" component={AccountSettings} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="MyOrders" component={MyOrders} />
            <Stack.Screen name="Payment" component={Cards} />
            <Stack.Screen name="ShippingAdress" component={ShippingAdress} />
            <Stack.Screen name="BPayment" component={BPayment} />
            <Stack.Screen name="Reels" component={Reels} />
            <Stack.Screen
              name="SearchedProducts"
              component={SearchedProducts}
            />
            <Stack.Screen name="EditAccount" component={EditAccount} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
