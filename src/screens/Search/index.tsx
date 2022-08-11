/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import {
  View,
  Text,
  ChevronRightIcon,
  Spinner,
  useColorModeValue,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import AppContainer from '../../components/AppContainer';
import {theme} from '../../theme';
import {Caption, SubTitle} from '../../components/Typography';
import {IProducts, useSearchProducts} from './Queries/useSearchProducts';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function Search() {
  const navigation = useNavigation<RootNavigationType>();
  const [query, setQuery] = React.useState('');
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [products, setProducts] = React.useState<IProducts[]>([]);
  const [trendProducts, setTrendProducts] = React.useState<IProducts[]>([]);
  const [totalProduct, setTotalProducts] = React.useState<IProducts[]>([]);
  const [notFound, setNotFound] = React.useState(false);
  const {searchProduct} = useSearchProducts(); //
  const handleSearch = async (text: string) => {
    setIsLoading(true);
    const result = await searchProduct(text);
    if (result?.status === true) {
      setProducts(result?.data);
      setTotalProducts(result?.data);
      setTrendProducts(result?.trending_product);
    } else {
      setProducts([]);
      setTrendProducts([]);
      setNotFound(true);
    }
    setIsLoading(false);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handler = useCallback(debounce(handleSearch, 1000), []);

  // const handleGoProfile = () => {
  //   navigation.navigate('UserProfile');
  // };

  const onChangeSearch = (text: string) => {
    setQuery(text);
    handler(text);
  };

  const handleGotoDetail = (id: number) => {
    navigation.navigate('PostDetails', {id});
  };
  return (
    <AppContainer isBack isFilter isSearch onChangeSearch={onChangeSearch}>
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <View px={2}>
          {/* <View
            bg={theme.colors.black[150]}
            height={110}
            p={5}
            borderRadius={8}>
            <Caption color={theme.colors.white} fontWeight="400" fontSize={14}>
              Suggestion
            </Caption>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                  'Username 1',
                  'Username 2',
                  'Username 3',
                  'Username 4',
                  'Username 5',
                  'Username 6',
                ].map(item => {
                  return (
                    <View
                      bg={theme.colors.black[200]}
                      m={2}
                      py={1}
                      px={3}
                      borderRadius={45}
                      borderColor={theme.colors.black[700]}
                      borderWidth={1}>
                      <Caption
                        color={theme.colors.white}
                        fontWeight="400"
                        fontSize={14}>
                        {item}
                      </Caption>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View> */}
          {isLoading ? (
            <Spinner mb={10} mt={10} />
          ) : products.length > 0 ? (
            <>
              <Caption
                fontWeight="400"
                fontSize={14}
                my={2}
                color={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}>
                {t('common:searchedProduct')} {query && `"${query}"`}
              </Caption>
              <View>
                {products.splice(0, 5).map(item => {
                  const {user, name} = item;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => handleGotoDetail(item.id)}>
                      <View
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                        p={3}
                        borderRadius={8}
                        bg={useColorModeValue(
                          theme.colors.gray[100],
                          theme.colors.black[2000],
                        )}>
                        <View>
                          <SubTitle
                            color={useColorModeValue(
                              theme.colors.black[2000],
                              theme.colors.appWhite[600],
                            )}
                            mb={2}
                            fontSize={14}>
                            {name}
                          </SubTitle>
                          <View flexDirection="row" alignItems="center">
                            <Image
                              source={{
                                uri: 'https://www.aphki.or.id//post/avatar.png',
                              }}
                              style={styles.img}
                            />
                            <Caption
                              fontWeight={500}
                              color={useColorModeValue(
                                theme.colors.black[2000],
                                theme.colors.appWhite[600],
                              )}
                              fontSize={12}
                              ml={1}>
                              {user.username}
                            </Caption>
                          </View>
                        </View>

                        <ChevronRightIcon
                          color={theme.colors.gray[400]}
                          size="8"
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {products.length > 5 ? (
                <TouchableOpacity
                  style={styles.seeMore}
                  onPress={() => {
                    navigation.navigate('SearchedProducts', {
                      products: totalProduct,
                    });
                  }}>
                  <Caption
                    textAlign="center"
                    color={useColorModeValue(
                      theme.colors.black[200],
                      theme.colors.appWhite[600],
                    )}>
                    View all {totalProduct && totalProduct.length} results
                  </Caption>
                </TouchableOpacity>
              ) : null}
              <View
                bg={useColorModeValue(
                  theme.colors.gray[100],
                  theme.colors.black[2000],
                )}
                mt={2}
                px={2}>
                <Caption
                  fontWeight="400"
                  fontSize={14}
                  my={2}
                  color={useColorModeValue(
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}>
                  {t('common:trendings')}
                </Caption>
                {trendProducts &&
                  trendProducts.length > 0 &&
                  trendProducts.map(item => {
                    const {name: title, image} = item;
                    return (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => handleGotoDetail(item.id)}>
                        <View
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                          borderRadius={8}>
                          <View flexDirection="row" alignItems="center">
                            <Image
                              source={{uri: image}}
                              style={styles.watchImg}
                            />
                            <Caption
                              color={useColorModeValue(
                                theme.colors.black[2000],
                                theme.colors.appWhite[600],
                              )}
                              fontWeight="400"
                              mb={2}
                              ml={3}
                              fontSize={16}>
                              {title}
                            </Caption>
                          </View>
                          <TouchableOpacity activeOpacity={0.9}>
                            <ChevronRightIcon
                              color={theme.colors.gray[400]}
                              size="8"
                            />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </>
          ) : notFound ? (
            <View mt={10} mb={10} justifyContent="center" alignItems="center">
              <Caption
                color={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}>
                Product not found
              </Caption>
            </View>
          ) : (
            <View mt={10} mb={10} justifyContent="center" alignItems="center">
              <Caption
                color={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}>
                Search your favorite products
              </Caption>
            </View>
          )}
        </View>
      </ScrollView>
    </AppContainer>
  );
}
const styles = StyleSheet.create({
  root: {paddingHorizontal: -10},
  img: {height: 24, width: 24, borderRadius: 360},
  watchImg: {height: 52, width: 52, borderRadius: 8},
  seeMore: {
    borderRadius: 8,
    borderColor: theme.colors.gray[100],
    borderWidth: 1,
    padding: 10,
  },
});

export default Search;
