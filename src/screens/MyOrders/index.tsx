/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Image, Divider, useColorModeValue} from 'native-base';
import Swipeout from 'react-native-swipeout';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../theme';
import {Caption, SubTitle, Title} from '../../components/Typography';
import {useCartOperations} from '../Cart/Queries/useCartOperations';
import {
  IMyOrderItems,
  useFetchMyOrderItems,
} from './Queries/useFetchMyOrderItems';
import HeaderSimple from '../../components/HeaderSimple';
import {RootNavigationType} from '../Home';
// import {Link,useRoute} from '@react-navigation/native'

function MyOrders() {
  const navigation = useNavigation<RootNavigationType>();
  const {t} = useTranslation();
  const [selectedItem, setSelectedItem] = React.useState(0);
  const {removetoCart} = useCartOperations();
  const inset = useSafeAreaInsets();

  const swipeoutBtns = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        removetoCart(Number(selectedItem));
      },
    },
  ];
  const {data: myOrders} = useFetchMyOrderItems();
  
  const handleContinue = () => {
    navigation.navigate('HomeTabs');
  };

  const handleProductDetail = (v: any, status: string) => {

    navigation.navigate('ProductDetails', {
      id: v,
      status,
    });
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        paddingTop: inset.top,
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[200],
        ),
      }}>
      <>
        <HeaderSimple title={t('myOrders:myOrders')} />
        <ScrollView
          style={{
            height: '100%',
          }}
          contentContainerStyle={[
            styles.root,
            {
              backgroundColor: useColorModeValue(
                theme.colors.gray[100],
                theme.colors.black[2000],
              ),
              paddingBottom: 50,
            },
          ]}>
          <View
            bg={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            height={50}
            justifyContent="center"
            alignItems="center">
            <SubTitle
              color={useColorModeValue(
                theme.colors.appWhite[600],
                theme.colors.black[2000],
              )}
              fontWeight="400">
              Last 6 months
            </SubTitle>
          </View>
          {myOrders && myOrders?.data?.length > 0 ? (
            <>
              {myOrders?.data?.map((item: IMyOrderItems) => {
                return (
                  <Swipeout
                    right={swipeoutBtns}
                    style={{
                      backgroundColor: useColorModeValue(
                        theme.colors.gray[100],
                        theme.colors.black[2000],
                      ),
                    }}
                    onOpen={() => {
                      setSelectedItem(Number(item?.product[0]?.id));
                    }}>
                    <View
                      flexDirection="row"
                      width="100%"
                      bg={useColorModeValue(
                        theme.colors.appWhite[600],
                        theme.colors.black[2000],
                      )}
                      mb={3}
                      p={3}>
                      <View width="30%">
                        <Image
                          alt="watch2"
                          source={{uri: item?.product?.[0]?.images}}
                          style={styles.productimage}
                        />
                      </View>

                      <View width="70%" ml={2} mt={2}>
                        <Title
                          fontSize={20}
                          color={useColorModeValue(
                            theme.colors.black[2000],
                            theme.colors.appWhite[600],
                          )}>
                          {item.product?.[0]?.name}
                        </Title>
                        <Caption
                          color={useColorModeValue(
                            theme.colors.black[2000],
                            theme.colors.appWhite[600],
                          )}
                          fontSize={14}>
                          AED {item.product?.[0]?.price}
                        </Caption>
                        <View
                          bg={theme.colors.green[500]}
                          width={110}
                          borderRadius={4}
                          p={1}>
                          <SubTitle
                            color={theme.colors.appWhite[600]}
                            fontSize={12}
                            textAlign="center">
                            {item.status}
                          </SubTitle>
                        </View>
                      </View>
                      <View py={2} position="absolute" right={1} top={1} px={5}>
                        <TouchableOpacity
                          onPress={() => {
                            handleProductDetail(
                              item?.product[0]?.id,
                              item.status,
                            );
                          }}>
                          <View borderRadius={2} px={2} mb={2} py={2}>
                            <Feather
                              name="chevron-right"
                              size={24}
                              color={useColorModeValue(
                                theme.colors.black[200],
                                theme.colors.appWhite[600],
                              )}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Swipeout>
                );
              })}
              <Divider />
            </>
          ) : (
            <View justifyContent="center" alignItems="center" mt={20}>
              <View>
                <Feather name="shopping-cart" size={150} />
                <View style={{marginTop: 40}}>
                  <Caption>There are no items in your cart</Caption>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.Outcont,
                  {
                    borderColor: useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    ),
                    borderWidth: 2,
                    marginTop: 30,
                  },
                ]}
                onPress={() => {
                  handleContinue();
                }}>
                <SubTitle style={styles.customertwo}>
                  CONTINUE SHOPPING
                </SubTitle>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.gray[100],
  },
  root: {
    width: '100%',
    // height: '100%',
    flexGrow: 1,
  },
  productimage: {height: 100, width: 100, borderRadius: 360, borderWidth: 1},

  Outcont: {
    borderRadius: 5,
    width: 340,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  customertwo: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default MyOrders;
