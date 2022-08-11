/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View as VIEW} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {View, Divider, Spinner, useColorModeValue} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {RootNavigationType} from '../../components/Header';
import CustomImageSlider from '../../components/imageSlider';
import {Caption, SubTitle, Title} from '../../components/Typography';
import {
  IProduct,
  useFetchProductDetails,
} from './Queries/useFetchProductDetails';
import Error from '../../components/Error';
import {useCartOperations} from '../Cart/Queries/useCartOperations';
import {useFetchCartItems} from '../Cart/Queries/useFetchCartItems';
import {useProductOperations} from './Queries/useProductOperations';
import {useFetchTrending} from './Queries/useFetchTrending';
import {theme} from '../../theme';
import {dateFormatter} from '../../utils';
import CommentComponent from './CommentComponent';
import DetailComponent from './DetailComponent';
import TrendingComponent from './TrendingComponent';
import useUserInfo from '../../hooks/useUserInfo';
import HeaderSimple from '../../components/HeaderSimple';
import {useEvent} from 'react-native-reanimated';

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;

function ProductDetails(props: ProfileScreenProps) {
  const {route} = props;
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const {user: loggedinUser} = useUserInfo();
  const {
    data: details,
    error,
    isLoading,
    refetch,
  } = useFetchProductDetails(route.params.id);
  // const [intoCart, setIntoCart] = useState(false);
  const product = details as IProduct;
  const {addtoCart, removetoCart} = useCartOperations();
  const {data: cartItem} = useFetchCartItems();
  const navigation = useNavigation<RootNavigationType>();
  const {collectProduct, likeProduct} = useProductOperations(route.params.id);
  const {data: trendings, isLoading: isTredingLoading} = useFetchTrending();
  // React.useEffect(() => {
  //   if (cartItem?.data && cartItem?.data?.length > 0 && product) {
  //     const isPresent = cartItem?.data?.filter(
  //       (x: ICartItems) => x.product.id === product.id,
  //     );
  //     if (isPresent.length > 0) {
  //       setIntoCart(true);
  //     } else {
  //       setIntoCart(false);
  //     }
  //   }
  // }, [cartItem, product]);
  // React.useEffect(() => {
  //   if (!isFocused) setIntoCart(false);
  // }, [isFocused]);
  if (error) {
    return <Error retry={refetch} />;
  }

  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  const {
    like,
    shipping_returns,
    sale_price,
    price,
    why_choose_watchpro,
    description,
    privacy_policy,
    name,
    isInCart,
    shop: productShop,
    brand,
    collect,
    size,
    warranty,
    id,
    material,
    total_comment,
    comment,
    liked,
    images,
    user,
    shop: pShop,
    collected,
    created_at,
  } = product;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleProductLike = async (pid: number) => {
    navigation.navigate('UserList', {
      type: 'product_like',
      title: 'Likes',
      id: pid || route.params.id,
    });
  };

  const handleProductCollectedBy = async (pid: number) => {
    navigation.navigate('UserList', {
      type: 'product_collect',
      title: 'Collects',
      id: pid || route.params.id,
    });
  };
  const handleCollect = async () => {
    await collectProduct(route.params.id);
  };

  const handleComment = () => {
    navigation.navigate('Comments', {
      id: route.params.id,
    });
  };

  const ProductLike = async () => {
    await likeProduct(route.params.id);
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
      <HeaderSimple
        title="Product"
        isShare
        bg="transparent"
        profile={{
          profilePic: user.image ?? 'https://www.aphki.or.id//post/avatar.png',
          name: user.username ?? 'Shop Name',
          user_id: user?.id,
        }}
      />
      {/* <Header
        shopName={user.username ?? 'Shop Name'}
        user={user}
        shop={pShop}
        isBack
        shopImage={user.image ?? 'https://www.aphki.or.id//post/avatar.png'}
        isProfile
        isShare
      /> */}
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
        {route.params?.status ? (
          <View
            bg={theme.colors.green[500]}
            width="100%"
            borderRadius={4}
            p={2}>
            <SubTitle
              color={theme.colors.appWhite[600]}
              fontSize={16}
              textAlign="center">
              {route.params?.status}
            </SubTitle>
          </View>
        ):null}
        <CustomImageSlider isProdiuct={false} slider={images} />

        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          px={5}
          py={3}
          bg={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          )}>
          <View flexDirection="row" justifyContent="space-between">
            <View justifyContent="center" alignItems="center" mr={7}>
              <TouchableOpacity onPress={() => ProductLike()}>
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
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleProductLike(route.params.id)}>
                <Caption
                  fontSize={12}
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {like && like} {t('product:like')}
                </Caption>
              </TouchableOpacity>
            </View>

            <View justifyContent="center" alignItems="center" mr={7}>
              <TouchableOpacity onPress={handleCollect}>
                {collected ? (
                  <FontAwesome
                    name="star"
                    size={25}
                    style={{color: theme.colors.red[900]}}
                  />
                ) : (
                  <Feather
                    name="star"
                    size={24}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleProductCollectedBy(route.params.id)}>
                <Caption
                  fontSize={12}
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {collect && collect} {t('product:collects')}
                </Caption>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleComment}>
              <View justifyContent="center" alignItems="center">
                <IoniconsIcon
                  name="chatbox-outline"
                  size={24}
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}
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
          {loggedinUser?.id !== user?.id && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('ChatDetails', {
                  user_id: user?.id.toString() || '',
                  name: user?.username || '',
                  image: user?.image || '',
                });
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
                <Feather
                  size={20}
                  name="send"
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Divider bg={theme.colors.gray[400]} />
        <View
          pt={5}
          px={4}
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
        <Divider bg={theme.colors.gray[400]} />
        <View
          bg={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          )}>
          <DetailComponent
            brandName={brand.name}
            material={material}
            size={size}
            brandMaterial={brand.material}
            warranty={warranty}
            sale_price={sale_price}
            price={price}
            title={t('product:productdetails')}
          />
          <DetailComponent
            isComplete
            title={t('product:whyWatchPro')}
            detail={why_choose_watchpro}
          />
          <DetailComponent
            isComplete
            title={t('product:shopingReturn')}
            detail={shipping_returns}
          />

          <DetailComponent
            isComplete
            title={t('product:privacy_policy')}
            detail={privacy_policy}
          />

          <View>
            <View px={3} pt={5} pb={5}>
              <Title
                fontSize={20}
                fontWeight="600"
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {t('product:youMay')}
              </Title>
            </View>
            <Divider bg={theme.colors.gray[400]} />

            <View flexDirection="row" justifyContent="space-around" flex={1}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                
                contentContainerStyle={{
                  // flexGrow: 1,
                  // flex: 1,
                }}>
                {isTredingLoading ? (
                  <Spinner mb={20} mt={20} />
                ) : (
                  trendings &&
                  trendings?.map((item: any) => {
                    return (
                      <TrendingComponent
                        item={item}
                        handleProductLike={ProductLike}
                      />
                    );
                  })
                )}
              </ScrollView>
            </View>

            <Divider bg={theme.colors.gray[400]} />

            <CommentComponent comment={comment} id={route.params.id} />
          </View>
          <Divider bg={theme.colors.gray[400]} />
          {loggedinUser?.id !== user?.id ? (
            <View
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              px={5}
              pb={10}
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
                  if (isInCart) {
                    removetoCart(id);
                    // setIntoCart(false);
                  } else {
                    addtoCart(id);
                    // setIntoCart(true);
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
                    {isInCart ? t('product:removeCart') : t('product:addCart')}
                  </Title>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </VIEW>
  );
}

export default ProductDetails;
