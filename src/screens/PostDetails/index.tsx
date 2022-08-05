/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-duplicates */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View as VIEW} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {View, Divider, Spinner, useColorModeValue} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import Header, {RootNavigationType} from '../../components/Header';
import CustomImageSlider from '../../components/imageSlider';
import {Caption, Title} from '../../components/Typography';

import {
  IProduct,
  useFetchProductDetails,
} from '../ProductDetails/Queries/useFetchProductDetails';
import Error from '../../components/Error';
import {useProductOperations} from '../ProductDetails/Queries/useProductOperations';
import {theme} from '../../theme';
import {dateFormatter} from '../../utils';
import CommentComponent from '../ProductDetails/CommentComponent';
import {useCartOperations} from '../Cart/Queries/useCartOperations';
import useUserInfo from '../../hooks/useUserInfo';
import {useFetchShopProfile} from './Queries/useFetchShopProfile';

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PostDetails'
>;

function PostDetails(props: ProfileScreenProps) {
  const {route} = props;
  const inset = useSafeAreaInsets();
  const [intoCart, setIntoCart] = useState(false);
  const {addtoCart, removetoCart} = useCartOperations();
  const {user: loggedinUser} = useUserInfo();

  const {t} = useTranslation();

  const navigation = useNavigation<RootNavigationType>();
  const {
    data: shopProfle,
    error,
    isLoading,
    refetch,
  } = useFetchShopProfile(route.params.id);
  const {productFollow, collectProduct} = useProductOperations(route.params.id);
  const product = details;

  if (error) {
    return <Error retry={refetch} />;
  }

  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }
  const {
    like,
    id,
    comment,
    liked,
    total_comment,
    user,
    shop,
    description,
    name,
    collect,
    followed,
    images,
    isCollected,
    sale_price,
    price,
    created_at,
  } = shopProfle;
  const handleProductLike = async () => {
    navigation.navigate('UserList', {
      type: 'product_like',
      title: 'Likes',
      id: route?.params?.id,
    });
  };
  const handleCollect = async () => {
    await collectProduct(route?.params.id);
  };

  const handleComment = () => {
    navigation.navigate('Comments', {
      id: route?.params?.id,
    });
  };
  const handleFollow = async () => {
    console.log(followed);
    console.log('shop', JSON.stringify(shop, null, 2));
    await productFollow(shop?.[0]?.user_id);
  };

  return (
    <VIEW
      style={{
        paddingTop: inset.top,
          height: '100%',
        backgroundColor: useColorModeValue(
          theme.colors.gray[100],
          theme.colors.black[200],
        ),
      }}>
      <Header
        shopName={user.username ?? 'user Name'}
        isBack
        shopImage={user.image ?? 'https://www.aphki.or.id//post/avatar.png'}
        isProfile
        isShare
        user={user}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          backgroundColor: useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[200],
          ),
        }}
        contentContainerStyle={{paddingBottom: inset.top + 10}}
        showsVerticalScrollIndicator={false}>
        <CustomImageSlider isProdiuct={false} slider={images} />

        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          px={5}
          bg={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          )}
          py={3}>
          <View flexDirection="row" justifyContent="space-between">
            <TouchableOpacity onPress={handleProductLike}>
              <View justifyContent="center" alignItems="center" mr={7}>
                {liked ? (
                  <FontAwesome
                    name="heart"
                    size={25}
                    style={{color: theme.colors.red[900]}}
                  />
                ) : (
                  <Feather
                    name="heart"
                    size={25}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}
                  />
                )}
                <Caption
                  fontSize={12}
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {like && like} {t('product:like')}
                </Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCollect}>
              <View justifyContent="center" alignItems="center" mr={7}>
                {isCollected ? (
                  <FontAwesome
                    name="star"
                    size={25}
                    style={{color: theme.colors.red[900]}}
                  />
                ) : (
                  <FeatherIcon
                    name="star"
                    size={24}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}
                  />
                )}
                <Caption
                  fontSize={12}
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {collect && collect} {t('product:collects')}
                </Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleComment}>
              <View justifyContent="center" alignItems="center">
                <IoniconsIcon
                  name="chatbox-outline"
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}
                  size={24}
                />
                <Caption
                  fontSize={12}
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {total_comment && total_comment} {t('product:comments')}
                </Caption>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleFollow}>
            <View
              px={5}
              py={2}
              borderColor={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}
              borderWidth={1}
              borderRadius={2}>
              <Title
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {followed ? t('product:following') : t('product:follow')}
              </Title>
            </View>
          </TouchableOpacity>
        </View>
        <Divider bg={theme.colors.gray[400]} />
        <View
          pt={5}
          px={4}
          mb={5}
          pb={5}
          bg={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          )}>
          <Title
            fontSize={20}
            fontWeight="600"
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}>
            {name}
          </Title>
          <Caption
            mt={2}
            color={useColorModeValue(
              theme.colors.gray[400],
              theme.colors.appWhite[600],
            )}>
            {description}
          </Caption>
          <Caption
            mt={5}
            color={useColorModeValue(
              theme.colors.gray[400],
              theme.colors.appWhite[600],
            )}>
            Posted on {dateFormatter(created_at)}
          </Caption>
        </View>

        <CommentComponent comment={comment} id={route.params.id} />
        <Divider bg={theme.colors.gray[400]} />
        {loggedinUser?.id !== user?.id ? (
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            px={5}
            py={5}>
            <View>
              <Caption
                fontSize={20}
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                AED {price}
              </Caption>
              <Caption
                color={useColorModeValue(
                  theme.colors.gray[400],
                  theme.colors.appWhite[600],
                )}>
                {t('product:tax')}
              </Caption>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (intoCart) {
                  removetoCart(id);
                  setIntoCart(false);
                } else {
                  addtoCart(id);
                  setIntoCart(true);
                }
              }}>
              <View
                px={5}
                py={2}
                borderColor={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
                borderWidth={1}
                borderRadius={2}>
                <Title
                  letterSpacing={0.14}
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {intoCart ? t('product:removeCart') : t('product:addCart')}
                </Title>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </VIEW>
  );
}

export default PostDetails;
