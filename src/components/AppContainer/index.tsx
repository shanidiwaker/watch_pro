/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useColorModeValue, View} from 'native-base';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import Header from '../Header';
// import { string } from 'yup';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

export interface _Header {
  children: any;
  isBack?: boolean;
  isFilter?: boolean;
  isSearch?: boolean;
  isProfile?: boolean;
  isShare?: boolean;
  shopName?: string;
  shopImage?: string;
  isMenu?: boolean;
  isShop?: boolean;
  onChangeSearch?: (text: string) => void;
}
function AppContainer(props: _Header) {
  const {
    children,
    isBack,
    isProfile,
    shopName,
    shopImage,
    isShare,
    isFilter,
    isSearch,
    isMenu,
    isShop,
    onChangeSearch,
  } = props;
  const inset = useSafeAreaInsets();

  return (
    <View
      style={{
        flexGrow: 1,
        paddingTop: inset.top,
        backgroundColor: useColorModeValue(
          theme.colors.gray[100],
          theme.colors.black[2000],
        ),
      }}>
      <Header
        isBack={isBack}
        isFilter={isFilter}
        isSearch={isSearch}
        isProfile={isProfile}
        isShare={isShare}
        shopName={shopName}
        shopImage={shopImage}
        isMenu={isMenu}
        isShop={isShop}
        onChangeSearch={onChangeSearch}
      />
      <View
        bg={useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[2000],
        )}
        height="100%"
        paddingBottom={75}>
        {children}
      </View>
    </View>
  );
}
AppContainer.defaultProps = {
  isBack: false,
  isFilter: false,
  isSearch: false,
  isProfile: false,
  isShare: false,
  shopName: false,
  shopImage: false,
  isMenu: true,
  isShop: false,
  onChangeSearch: null,
};
export default AppContainer;
