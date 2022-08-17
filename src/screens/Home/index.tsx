/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Spinner, useColorModeValue, View } from 'native-base';
import {
  BackHandler,
  ListRenderItem,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import TouchID from 'react-native-touch-id';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { DrawerParamList } from '../../navigation/DrawerMenu';
import AppContainer from '../../components/AppContainer';
import { WatchItem } from '../../components/WatchItem';
import { theme } from '../../theme';
import { Caption } from '../../components/Typography';
import Error from '../../components/Error';
import { IProducts, useFetchProducts } from './Queries/useFetchProducts';
import {
  IResponseDataProduct,
  useFetchReelCategories,
} from '../Add/Queries/useFetchReelCategories';
import { useProductOperations } from './Queries/useProductOperations';
import { useProductOperations as ProductOperations } from '../ProductDetails/Queries/useProductOperations';
import Selector from '../../components/LangaugeSelector';
import { useNavigation } from '@react-navigation/native';
import { createThumbnail } from "react-native-create-thumbnail";
// import useProduct from './useProduct';

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#e00606', // Android,
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  // passcodeFallback: true ,
};

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function Home() {
  const [productsList, setProductList] = React.useState<IProducts[]>([]);
  const [caetgory, setCategory] = React.useState<string>('All');
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const { data: categories } = useFetchReelCategories();
  const { likePeoduct, productsbyCategory, reelsbyCategory } = useProductOperations();
  const [img, setImg] = React.useState([]);
  const { data: products, error, isLoading, refetch } = useFetchProducts();
  const [isCatLoading, setIsCatLoading] = React.useState(false);
  // console.log("products",products)
  const navigation = useNavigation<RootNavigationType>();

  React.useMemo(() => {
    return (
      categories &&
      categories.data.unshift({
        id: 0,
        name: 'All',
      })
    );
  }, [categories]);
  // console.log('reels=====>', categories),

  React.useEffect(() => {
    TouchID.authenticate('', optionalConfigObject)
      .then((success: string) => {
        //
        setIsAuth(true);
      })
      .catch((err: any) => {
        BackHandler.exitApp();
        //
      });
  }, []);

  React.useEffect(() => {
    if (products) {
      setProductList(products?.data || []);
      // setImg(products?.data[0]?.thamblain)
      // console.log('p=============>list====>', products?.data);
    }
  }, [products]);

  const handleLike = async (id: number) => {
    await likePeoduct(id);
  };

  const renderItem: ListRenderItem<IProducts> = ({ item }) => (
    <WatchItem key={`${item.name}`} item={item} handleLike={handleLike} reel={0} />
  );

  // create thumbnail
  // createThumbnail({
  //   url: products?.data[0]?.images,
  //   timeStamp: 10000,
  // })
  //   .then(response =>
  //     setImg(response?.path))
  //   .catch(err => console.log({ err }));
  // // console.log(img[0])

  const handleCategory = async (id: number) => {
    setIsCatLoading(true);

    try {
      const response: IResponseDataProduct = await reelsbyCategory(id);
      if (response?.status === true) {
        // console.log('called=======>======>', response);

        setProductList(response?.data);
      } else {
        setProductList([]);
      }
      setIsCatLoading(false);

      return response;
    } catch (err) {
      setIsCatLoading(false);

      return err;
    }
  };
  // if (!isAuth) {
  //   return (
  //     <View
  //       width="100%"
  //       height="100%"
  //       backgroundColor={useColorModeValue(
  //         theme.colors.appWhite[600],
  //         theme.colors.black[200],
  //       )}
  //     />
  //   );
  // }

  if (error) {
    return <Error retry={refetch} />;
  }
  if (isLoading) {
    return (
      <View
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        flex={1}>
        <Spinner mb={20} mt={50} />
      </View>
    );
  }

  return (
    <AppContainer>
      <View style={styles.root}>
        <StatusBar
          barStyle={useColorModeValue('dark-content', 'light-content')}
        />
        {isCatLoading ? (
          <View flex={1}>
            <Spinner mb={20} mt={20} />
          </View>
        ) : (
          <MasonryList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<View />}
            contentContainerStyle={styles.container}
            style={{ justifyContent: 'center' }}
            numColumns={2}
            data={productsList}
            onRefresh={refetch}
            ListEmptyComponent={
              <View justifyContent="center" alignItems="center" mt={10}>
                <Caption>Product not found</Caption>
              </View>
            }
            renderItem={renderItem}
          />
          // <>
          //   {/* {products?.data?.map((item) => {
          //     console.log('item===============>', item);
          //     return (
          //       <FlatList
          //         data={item?.name}
          //         renderItem={renderItem}
          //         // keyExtractor={item => item.id}
          //         numColumns={2} />
          //     )

          //   })} */}
          //   {/* <View style={{ backgroundColor: 'red', flex: 1, justifyContent: 'space-between' }}>
          //     {products?.data?.map((item) => {
          //       console.log('item===============>', item);
          //       return (
          //         <TouchableOpacity onPress={(item) => { (renderItem(item)) }}>
          //           <Image
          //             // key={`${item.name}`}
          //             source={{ uri: img }}
          //             // eslint-disable-next-line react-native/no-inline-styles
          //             style={[
          //               // styles.watchImg,
          //               { height: 150 },
          //             ]}
          //             resizeMode="contain" />
          //         </TouchableOpacity>
          //       )
          //     })}
          //   </View> */}
          // </>
        )}

        <View
          bg={theme.colors.white}
          position="absolute"
          style={{ bottom: 40 }}
          width="100%">
          <ScrollView
            horizontal
            style={{
              backgroundColor: useColorModeValue(
                theme.colors.appWhite[600],
                theme.colors.black[200],
              ),
            }}>
            {categories &&
              categories.data?.map((item: any) => {
                return (
                  <TouchableOpacity
                    key={`${item.id}_`}
                    activeOpacity={0.9}
                    onPress={() => {
                      handleCategory(item.id);
                      setCategory(item.name);
                    }}>
                    <View p={3}>
                      <Caption
                        color={useColorModeValue(
                          theme.colors.black[2000],
                          theme.colors.appWhite[600],
                        )}
                        textTransform="capitalize"
                        fontWeight={item.name === caetgory ? '600' : '200'}
                        opacity={caetgory === item.name ? 1 : 1}
                        fontSize={14}>
                        {item.name}
                      </Caption>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
    </AppContainer>
  );
}
const styles = StyleSheet.create({
  root: { height: '100%', paddingBottom: 100 },
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // bottomContainer: {width: '100%', position: 'absolute', bottom: 0},
});

export default Home;
