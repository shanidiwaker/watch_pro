/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Share,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {View, Divider, ChevronLeftIcon, useColorModeValue} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {Caption, SubTitle} from '../Typography';
import useUserInfo from '../../hooks/useUserInfo';
import {IShop, IUser} from '../../screens/Home/Queries/useFetchProducts';
import {textEllipsis} from '../../utils';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

interface _Header {
  isBack?: boolean;
  isFilter?: boolean;
  isSearch?: boolean;
  isProfile?: boolean;
  isMenu?: boolean;
  isShare?: boolean;
  fromUserProfile?: boolean;
  shopName?: string;
  shopImage?: string;
  isShop?: boolean;
  user?: IUser;
  shop?: IShop;
  onChangeSearch?: (text: string) => void;
}

function Header(props: _Header) {
  const {
    isBack,
    isFilter,
    isSearch,
    isProfile,
    shopName,
    fromUserProfile,
    isShare,
    shopImage,
    isShop,
    isMenu,
    user: userProfile,
    shop,
    onChangeSearch,
  } = props;
  const {t, i18n} = useTranslation();
  const navigation = useNavigation<RootNavigationType>();
  const widthManu = isShare || isFilter;
  const profile = !isProfile && !fromUserProfile;
  const {user} = useUserInfo();
  const handlePressProfile = () => {
    if (!isShop) {
      navigation.navigate('UserProfile', {user_id: Number(userProfile?.id)});
    }
  };
  const handlePressMe = () => {
    navigation.navigate('Me');
  };
  console.log('shopImage',shopImage)
  const handleSetting = () => {
    navigation.navigate('Settings');
  };
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View>
      <View
        flexDirection="row"
        alignItems="center"
        py={2}
        bg={
          fromUserProfile
            ? 'transparent'
            : useColorModeValue(
                theme.colors.appWhite[600],
                theme.colors.black[2000],
              )
        }
        justifyContent="space-between">
        <View
          width={isProfile ? (widthManu ? '25%' : '25%') : '15%'}
          justifyContent="center"
          alignItems="center">
          {isBack ? (
            <View flexDirection="row" alignItems="center" >
              <TouchableOpacity activeOpacity={0.9} onPress={navigation.goBack}
              style={{padding:10}}
              >
                <ChevronLeftIcon
                  // color={
                  //   fromUserProfile
                  //     ? theme.colors.white
                  //     : theme.colors.black[900]
                  // }
                  color={
                    fromUserProfile
                      ? useColorModeValue(
                          theme.colors.black[200],
                          theme.colors.appWhite[600],
                        )
                      : useColorModeValue(
                          theme.colors.black[200],
                          theme.colors.appWhite[600],
                        )
                  }
                />
              </TouchableOpacity>
              {isProfile && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={handlePressProfile}>
                  <View flexDirection="row" alignItems="center">
                    {shopImage || user?.image ? (
                      <Image
                        source={{
                          uri: shopImage || user?.image,
                        }}
                        style={styles.img}
                      />
                    ) : (
                      <View
                        style={[
                          styles.img,
                          {
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                        ]}>
                        <Feather name="user" size={22} />
                      </View>
                    )}

                    <SubTitle
                      fontWeight="600"
                      fontSize={14}
                      ml={2}
                      color={useColorModeValue(
                        theme.colors.black[200],
                        theme.colors.appWhite[600],
                      )}>
                      {textEllipsis(shopName || '', 8) || 'John Due'}
                    </SubTitle>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handlePressMe}
              style={{
                borderColor: useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                ),
                borderRadius: 360,
                borderWidth: 0.5,
              }}>
              {user?.image ? (
                <Image source={{uri: user?.image}} style={styles.img} />
              ) : (
                <View
                  style={[
                    styles.img,
                    {
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Feather name="user" size={22} />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>

        {profile && (
          <View width={widthManu ? '70%' : '75%'}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <View
                backgroundColor={useColorModeValue(
                  theme.colors.gray[200],
                  theme.colors.black[200],
                )}
                style={styles.searchContainer}>
                {isSearch ? (
                  <View
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center">
                    <Feather
                      name="search"
                      size={18}
                      color={theme.colors.gray[400]}
                    />
                    <TextInput
                      placeholder={t('common:search')}
                      placeholderTextColor={useColorModeValue(
                        theme.colors.black[200],
                        theme.colors.appWhite[600],
                      )}
                      style={[
                        styles.input,
                        {
                          color: useColorModeValue(
                            theme.colors.black[200],
                            theme.colors.appWhite[600],
                          ),
                        },
                      ]}
                      onChangeText={onChangeSearch}
                    />
                  </View>
                ) : (
                  <View
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center">
                    <Feather
                      name="search"
                      size={18}
                      color={theme.colors.gray[400]}
                    />
                    <Caption
                      ml={2}
                      fontSize={14}
                      color={theme.colors.gray[400]}>
                      {t('common:search')}
                    </Caption>
                  </View>
                )}

                <View>
                  {/* <Feather
                    name="camera"
                    size={16}
                    color={theme.colors.gray[400]}
                  /> */}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}

        <View
          width={widthManu ? '15%' : '10%'}
          justifyContent="center"
          alignItems="center">
          {isShare ? (
            <TouchableOpacity onPress={handleShare}>
              <View
                flexDirection="row"
                mr={5}
                justifyContent="center"
                alignItems="center">
                <Caption
                  mr={1}
                  color={
                    fromUserProfile
                      ? useColorModeValue(
                          theme.colors.black[200],
                          theme.colors.appWhite[600],
                        )
                      : useColorModeValue(
                          theme.colors.black[200],
                          theme.colors.appWhite[600],
                        )
                  }>
                  Share
                </Caption>
                <Feather
                  name="share-2"
                  size={20}
                  color={
                    fromUserProfile
                      ? useColorModeValue(
                          theme.colors.black[200],
                          theme.colors.appWhite[600],
                        )
                      : useColorModeValue(
                          theme.colors.black[200],
                          theme.colors.appWhite[600],
                        )
                  }
                />
              </View>
            </TouchableOpacity>
          ) : isFilter ? (
            <TouchableOpacity onPress={handleSetting}>
              <Feather
                name="menu"
                size={20}
                color={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}
              />
            </TouchableOpacity>
          ) : (
            isMenu && (
              <TouchableOpacity onPress={handleSetting}>
                <Feather
                  name="menu"
                  size={20}
                  color={useColorModeValue(
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
      {!fromUserProfile && <Divider />}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    // paddingVertical: 9,
    height: 32,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 45,
  },
  img: {height: 40, width: 40, borderRadius: 360},
  input: {
    height: '100%',
    width: '85%',
    marginLeft: 5,
    borderRadius: 360,
  },
});
Header.defaultProps = {
  isBack: false,
  isFilter: false,
  isSearch: false,
  isProfile: false,
  isShop: false,
  isShare: false,
  fromUserProfile: false,
  shopName: '',
  shopImage: '',
  isMenu: true,
  onChangeSearch: null,
  user: null,
  shop: null,
};
export default Header;
