/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Pressable,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollView, Spinner, useColorModeValue, View} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import ShopCommponent from './component/ShopeCommponent';
import {Title, Caption} from '../../components/Typography';
import Error from '../../components/Error';
import {IShopRes, useFetchShops} from './Queries/useFetchProducts';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function Shop() {
  const inset = useSafeAreaInsets();
  const {t} = useTranslation();
  const {data: shops, error, isLoading, refetch} = useFetchShops();
  const navigation = useNavigation<RootNavigationType>();
  const keyExtractor = useCallback(
    (item: IShopRes, index: number) => `key-${index}-${item.id}`,
    [],
  );
  console.log("shops",shops)
  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  if (error) {
    return <Error retry={refetch} />;
  }

  const handleLikes = async (id: number) => {
    navigation.navigate('UserList', {
      type: 'shop_like',
      title: 'Likes',
      id,
    });
  };
  const handleFollower = async (id: number) => {
    navigation.navigate('UserList', {
      type: 'shop_follower',
      title: 'Likes',
      id,
    });
  };
  const renderItem: ListRenderItem<IShopRes> = ({item}) => (
    <ShopCommponent
      item={item}
      handlelikeShop={handleLikes}
      handleFollow={handleFollower}
    />
  );

  return (
    <ScrollView
      style={[
        styles.bgShope,
        {
          paddingTop: inset.top,
          backgroundColor: useColorModeValue(
            theme.colors.black[2000],
            theme.colors.black[800],
          ),
        },
      ]}>
      <ImageBackground
        source={require('../../assets/images/shop/BG-Clock.png')}
        style={styles.BGimage}>
        <LinearGradient
          colors={['transparent', '#191818']}
          style={styles.linearConrainer}>
          <View style={styles.shopContain}>
            <View style={styles.ShopView}>
              <Title fontWeight={600} style={styles.ShopText}>
                {t('shop:shopForYou')}
              </Title>
              <Caption style={styles.ChooseYourText}>
                {t('shop:chooseStore')}
              </Caption>
            </View>

            <Pressable style={styles.IconView}>
              <Feather name="book" style={styles.IconBook} />
            </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View
        bg={useColorModeValue(
          theme.colors.black[2000],
          theme.colors.black[800],
        )}
        p={3}>
        <FlatList
          contentContainerStyle={[
            styles.contentContainerStyle,
            {
              backgroundColor: useColorModeValue(
                theme.colors.black[2000],
                theme.colors.black[800],
              ),
            },
          ]}
          style={{
            backgroundColor: useColorModeValue(
              theme.colors.black[2000],
              theme.colors.black[800],
            ),
          }}
          data={shops?.data || []}
          keyExtractor={keyExtractor}
          ListHeaderComponent={isLoading ? <Spinner mb={20} mt={20} /> : null}
          refreshing={isLoading}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onRefresh={refetch}
        />
      </View>
    </ScrollView>
  );
}
export default Shop;
const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 50,
  },
  bgShope: {},
  BGimage: {
    width: '100%',
    height: 190,
  },
  // eslint-disable-next-line react-native/no-color-literals
  ShopText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    lineHeight: 24,
    /* identical to box height */
    textAlign: 'center',
    color: theme.colors.appWhite[600],
    marginBottom: 5,
  },
  ChooseYourText: {
    // fontFamily: 'Proxima Nova',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.appWhite[600],
  },
  ShopView: {
    marginTop: 70,
    width: '80%',
  },
  shopContain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  IconView: {
    position: 'absolute',
    right: 50,
    top: 60,
    backgroundColor: theme.colors.appWhite[600],
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  IconBook: {
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    top: 10,
  },
  linearConrainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
