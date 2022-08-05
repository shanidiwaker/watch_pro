/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {View} from 'native-base';
import {ListRenderItem, StyleSheet} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import AppContainer from '../../components/AppContainer';
import {WatchItem} from '../../components/WatchItem';

import {IProducts} from '../Home/Queries/useFetchProducts';
import {useProductOperations} from '../Home/Queries/useProductOperations';
// import useProduct from './useProduct';

export type SearchedProductsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchedProducts'
>;

function SearchedProducts(props: SearchedProductsScreenProps) {
  const {route} = props;
  const {likePeoduct} = useProductOperations();

  const handleLike = async (id: number) => {
    await likePeoduct(id);
  };

  const renderItem: ListRenderItem<IProducts> = ({item}) => (
    <WatchItem item={item} handleLike={handleLike} />
  );
  const products = route?.params?.products;
  return (
    <AppContainer isBack>
      <View style={styles.root}>
        <MasonryList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View />}
          contentContainerStyle={styles.container}
          numColumns={2}
          data={products || []}
          renderItem={renderItem}
        />
      </View>
    </AppContainer>
  );
}
const styles = StyleSheet.create({
  root: {height: '100%', paddingBottom: 35},
  container: {
    alignSelf: 'stretch',
  },
});

export default SearchedProducts;
