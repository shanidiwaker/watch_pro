/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View as RNView,
} from 'react-native';
import {
  Text,
  useColorModeValue,
  View,
  Actionsheet,
  useDisclose,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import VideoPlayer from 'react-native-video-player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { RootNavigationType } from '../../screens/Home';
import { theme } from '../../theme';
import { Caption, Title } from '../Typography';
import ImagesLocal from '../../assets/images';
import { IProducts } from '../../screens/Home/Queries/useFetchProducts';
import { textEllipsis } from '../../utils';

interface IWatchItem {
  item: IProducts;
  handleLike: (id: number) => void;
  deleteProduct?: (id: number) => void;
  editProduct?: (id: number) => void;
  handleCollect?: (id: number) => void;
  width?: string;
  height?: number;
  isOwner?: boolean;
  isCollected?: boolean;
  reel: number;
  isShop?: boolean;
}

export function WatchItem(props: IWatchItem) {
  const {
    item,
    handleLike,
    width,
    height,
    isOwner,
    handleCollect,
    deleteProduct,
    editProduct,
    isCollected,
    reel,
    isShop,
  } = props;
  const navigation = useNavigation<RootNavigationType>();
  const randomBool = useMemo(() => Math.random() < 0.5, []);

  const {
    name,
    user,
    collected,
    product_view_count,
    images,
    thamblain,
    shop,
    like: product_like,
    id,
    liked,
    is_post,
  } = item;
  console.log('shop', shop);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { t } = useTranslation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // navigation.navigate(width ? 'ProductDetails' : 'PostDetails', {id});
        if (is_post === 0 || isShop) {
          navigation.navigate('ProductDetails', { id, status: '' });
        } else {
          navigation.navigate('Reels', { id, reel });
        }

        //
      }}>
      <View
        style={[
          styles.item,
          {
            backgroundColor: useColorModeValue(
              theme.colors.gray[100],
              theme.colors.black[200],
            ),
            width: width || '95%',
          },
        ]}>
        <View position="relative">
          {thamblain ? (
            thamblain.split('.').reverse()[0] === 'mp4' ? (
              <VideoPlayer
                video={{ uri: images }}
                login_options_background
                volume={0}
                resizeMode="cover"
                style={[
                  styles.watchImg,
                  { height: height || randomBool ? 150 : 280 },
                ]}
                thumbnail={{
                  uri: 'https://i.picsum.photos/id/866/1600/900.jpg',
                }}
              />

            ) : (
              <FastImage
                source={{ uri: thamblain }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={[
                  styles.watchImg,
                  { height: height || randomBool ? 150 : 280 },
                ]}
                resizeMode="cover"
              />
            )
          ) : (
            <Image
              // eslint-disable-next-line global-require
              source={require('../../assets/images/logo.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={[
                styles.watchImg,
                { height: height || randomBool ? 150 : 280 },
              ]}
              resizeMode="contain"
            />
          )}
          {is_post ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Reels', { id, reel });
              }}
              style={{ position: 'absolute', top: 5, right: 5, zIndex: 99999 }}>
              <Feather name="film" size={25} color="#fff" />
            </TouchableOpacity>
          ) : null}

          {isOwner ? (
            <>
              <RNView style={styles.eyeWrapper}>
                <Image
                  source={ImagesLocal.EYE}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ width: 18, height: 18, marginRight: 5 }}
                  resizeMode="cover"
                />
                <Text color="#ffffff">{product_view_count}</Text>
              </RNView>
              <View style={styles.treedots}>
                <TouchableOpacity onPress={onOpen}>
                  <RNView>
                    <Entypo name="dots-three-horizontal" size={23} />
                  </RNView>
                </TouchableOpacity>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content>
                    <Actionsheet.Item
                      onPress={() => {
                        editProduct?.(id);
                        onClose();
                      }}>
                      {t('common:edit')}
                    </Actionsheet.Item>
                    <Actionsheet.Item
                      onPress={() => {
                        deleteProduct?.(id);
                        onClose();
                      }}>
                      {t('common:delete')}
                    </Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>
              </View>
            </>
          ) : null}
        </View>

        <View px={2} pb={1}>
          <Title
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}>
            {name}
          </Title>

          <View
            flexDirection="row"
            alignItems="center"
            mt={2}
            justifyContent="space-between">
            <View flexDirection="row" alignItems="center">
              {user && !width ? (
                <>
                  {shop?.[0]?.logo ? (
                    <Image
                      source={{ uri: shop?.[0]?.logo }}
                      style={[styles.img, { borderWidth: 1 }]}
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
                      <Feather name="user" size={16} />
                    </View>
                  )}

                  <Caption
                    fontSize={12}
                    ml={1}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}>
                    {textEllipsis(shop?.[0]?.name || '', 15)}
                  </Caption>
                </>
              ) : (
                <Caption style={styles.AEDText}>AED {item.price}</Caption>
              )}
            </View>
            {isCollected ? (
              <TouchableOpacity
                onPress={() => {
                  handleLike(item.id);
                }}>
                <View flexDirection="row" alignItems="center">
                  {collected ? (
                    <FontAwesome
                      name="star"
                      size={18}
                      style={{ color: theme.colors.red[900] }}
                    />
                  ) : (
                    <Feather
                      name="star"
                      size={18}
                      color={useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      )}
                    />
                  )}
                  <Caption
                    fontSize={12}
                    ml={1}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}>
                    {product_like || ''}
                  </Caption>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleLike(item.id);
                }}>
                <View flexDirection="row" alignItems="center">
                  {liked ? (
                    <FontAwesome
                      name="heart"
                      size={18}
                      style={{ color: theme.colors.red[900] }}
                    />
                  ) : (
                    <Feather
                      name="heart"
                      size={18}
                      color={useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      )}
                    />
                  )}
                  <Caption
                    fontSize={12}
                    ml={1}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}>
                    {product_like || ''}
                  </Caption>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

WatchItem.defaultProps = {
  width: '',
  height: 0,
  isOwner: false,
  deleteProduct: null,
  editProduct: null,
  handleCollect: null,
  isCollected: false,
  isShop: false,
};
const styles = StyleSheet.create({
  watchImg: {
    width: '100%',
    borderRadius: 4,
    alignSelf: 'stretch',
  },
  AEDText: {
    fontSize: 12,
    color: theme.colors.gray[400],
  },
  item: {
    margin: 5,
    borderRadius: 4,

    // backgroundColor: theme.colors.gray[100],
  },
  img: {
    height: 24,
    width: 24,
    alignSelf: 'stretch',
    borderRadius: 360,
  },
  eyeWrapper: {
    width: 46,
    height: 24,
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: theme.colors.transparentGray[200],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  treedots: {
    width: 46,
    height: 24,
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
