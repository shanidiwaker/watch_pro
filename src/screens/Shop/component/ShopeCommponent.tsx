/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useColorModeValue} from 'native-base';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';
import {theme} from '../../../theme';
import {SubTitle, Caption} from '../../../components/Typography';
import {IShopRes} from '../Queries/useFetchProducts';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

interface IProps {
  item: IShopRes;
  handlelikeShop: (id: number) => void;
  handleFollow: (id: number) => void;
}

function ShopCommponent(props: IProps) {
  const {t} = useTranslation();

  const navigation = useNavigation<RootNavigationType>();
  const {item, handlelikeShop, handleFollow} = props;
  const {name, collects,is_post, logo, Like, Followers, Product, id} = item;
  console.log("item",item)
  return (
    <View style={styles.bgShope}>
         {is_post ? (
            <TouchableOpacity
              style={{position: 'absolute', top: 5, right: 5, zIndex: 99999}}>
              <Feather name="film" size={25} color="#fff" />
            </TouchableOpacity>
          ) : null}

      <View
        style={{
          backgroundColor: useColorModeValue(
            theme.colors.black[600],
            theme.colors.black[200],
          ),
          padding: 5,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            // navigation.navigate('ShopProfile', {id: item?.id});
          }}>
          <View style={styles.ImgMainView}>
            <View>
              <Image
                // eslint-disable-next-line global-require
                source={{uri: logo?.[0]?.image}}
                style={styles.logo1}
              />
            </View>
            <SubTitle fontWeight={600} style={styles.ShopName}>
              {name}
            </SubTitle>
          </View>
        </TouchableOpacity>
        <View style={styles.Imgclock}>
          <Pressable
            onPress={() =>
               {item.id % 2 !== 0 ? 
                
                navigation.navigate('ShopDetail', {
                  id,
                  shopName: name,
                  shopImage: logo?.[0]?.image,
                })
                :
                navigation.navigate('ShopDetailSecond', {
                  id,
                  shopName: name,
                  shopImage: logo?.[0]?.image,
                })  
              }

            }
            style={styles.logoButton}>
            <Image source={{uri: logo?.[0]?.image}} style={styles.logo} />
          </Pressable>
          <View
            style={[
              styles.clockView,
              {
                backgroundColor: useColorModeValue(
                  theme.colors.appWhite[600],
                  theme.colors.black[200],
                ),
              },
            ]}>
            <View style={styles.clockNextView}>
              <Pressable
                onPress={() => {
                  handlelikeShop(id);
                }}>
                <Feather
                  name="heart"
                  style={[
                    styles.Icons,
                    {
                      color: useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      ),
                    },
                  ]}
                />
                <Caption
                  style={[
                    styles.IconsText,
                    {
                      color: useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      ),
                    },
                  ]}>
                  {Like && Like} {t('product:like')}
                </Caption>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleFollow(id);
                }}>
                <MaterialIcons
                  name="group"
                  style={[
                    styles.Icons,
                    {
                      color: useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      ),
                    },
                  ]}
                />
                <Caption
                  style={[
                    styles.IconsText,
                    {
                      color: useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      ),
                    },
                  ]}>
                  {Followers && Followers} {t('profile:followers')}
                </Caption>
              </Pressable>
              <Pressable>
                <Feather
                  name="watch"
                  style={[
                    styles.Icons,
                    {
                      color: useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      ),
                    },
                  ]}
                />
                <Caption
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {Product && Product} {t('shop:products')}
                </Caption>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
export default ShopCommponent;
const styles = StyleSheet.create({
  bgShope: {},

  logoButton: {width: '100%', height: 120, borderRadius: 4},
  logo: {width: '100%', height: 120, borderRadius: 4},
  logo1: {height: 40, width: 40, borderRadius: 360},
  ImgMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15,
  },
  ShopName: {
    color: theme.colors.appWhite[600],
    fontSize: 16,
    margin: 10,
    // fontFamily: 'Proxima Nova',
  },
  Imgclock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockView: {
    width: '100%',
    height: 70,
    borderRadius: 6,
  },
  clockNextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  Icons: {
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  IconsText: {
    color: theme.colors.black[2000],
  },
});
