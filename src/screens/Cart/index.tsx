/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Image, Divider, useColorModeValue } from 'native-base';
import Swipeout from 'react-native-swipeout';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../theme';
import { Caption, SubTitle, Title } from '../../components/Typography';
import { useCartOperations } from './Queries/useCartOperations';
import { ICartItems, useFetchCartItems } from './Queries/useFetchCartItems';
import HeaderSimple from '../../components/HeaderSimple';
import { useProductOperations as useProductOp } from '../ProductDetails/Queries/useProductOperations';

import { RootNavigationType } from '../Home';
import { useConfirmModal } from '../../components/CofirmationModel';
// import {Link,useRoute} from '@react-navigation/native'

function Cart() {
  const navigation = useNavigation<RootNavigationType>();

  const [selectedItem, setSelectedItem] = React.useState(0);
  const [itemPrice, setItemPrice] = React.useState(0);
  const { removetoCart } = useCartOperations();
  const { collectProduct } = useProductOp(0);
  const inset = useSafeAreaInsets();
  const confirm = useConfirmModal();
  const [cartitem, setCartItem] = React.useState()

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

  const { data: cartItem } = useFetchCartItems();

  //const productPrice = cartItem.data[0].product
  React.useEffect(() => {
    if (cartItem?.data?.length > 0) {

      const data = cartItem.data
      const sum = data.reduce((accumulator, object) => {
        return accumulator + object.product[0].price;
      }, 0);
      console.log('cartItem', sum)
      setItemPrice(sum)
    }
  })




  const handleContinue = () => {
    navigation.navigate('HomeTabs');
  };


  const checkout = () => {
    confirm?.show?.({
      title: <Title fontSize={18}>Confirmation</Title>,
      message: <SubTitle>Do you want to checkout?</SubTitle>,
      cancelLabel: 'No',
      onConfirm: async () => {
        navigation.navigate('Checkout');
      },
      submitLabel: 'Yes',
    });
  };

  const handleCollect = async (id: number) => {
    const data = await collectProduct(id);
    console.log('data', data.data)
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
        <HeaderSimple title="Cart" />
        <ScrollView
          style={{
            height: '100%',
          }}
          contentContainerStyle={[
            styles.root,
            {
              // height: '100%',
              backgroundColor: useColorModeValue(
                theme.colors.gray[100],
                theme.colors.black[2000],
              ),
              paddingBottom: 50,
            },
          ]}>
          {cartItem && cartItem?.data?.length > 0 ? (
            <>
              {cartItem?.data?.map((item: ICartItems) => {
                console.log(item)

                return (
                  <>
                    <Swipeout
                      right={swipeoutBtns}
                      onOpen={() => {
                        setSelectedItem(Number(item?.product[0]?.id));
                      }}>
                      <View
                        flexDirection="row"
                        width="100%"
                        bg={useColorModeValue(
                          theme.colors.gray[100],
                          theme.colors.black[2000],
                        )}
                        p={3}>
                        <View width="30%">
                          <Image
                            alt="watch2"
                            source={{ uri: item.product?.[0]?.images }}
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
                            mt={3}
                            color={useColorModeValue(
                              theme.colors.black[2000],
                              theme.colors.appWhite[600],
                            )}
                            fontSize={14}>
                            AED {item.product?.[0]?.price}
                          </Caption>
                          <Caption
                            color={useColorModeValue(
                              theme.colors.gray[400],
                              theme.colors.appWhite[600],
                            )}
                            fontSize={12}>
                            Tax included in the price
                          </Caption>
                          <Caption
                            mt={3}
                            color={useColorModeValue(
                              theme.colors.black[200],
                              theme.colors.appWhite[600],
                            )}
                            fontSize={14}>
                            Sold by{' '}
                            <Caption
                              fontSize={14}
                              color={useColorModeValue(
                                theme.colors.gray[400],
                                theme.colors.appWhite[600],
                              )}>
                              {item?.user?.username}
                            </Caption>
                          </Caption>
                          <Caption
                            color={useColorModeValue(
                              theme.colors.black[200],
                              theme.colors.appWhite[600],
                            )}
                            fontSize={14}>
                            Brand{' '}
                            <Caption
                              fontSize={14}
                              color={useColorModeValue(
                                theme.colors.gray[400],
                                theme.colors.appWhite[600],
                              )}>
                              {item?.product[0]?.brand?.name}
                            </Caption>
                          </Caption>
                          <Caption
                            color={useColorModeValue(
                              theme.colors.black[200],
                              theme.colors.appWhite[600],
                            )}
                            fontSize={14}>
                            Warranty{' '}
                            <Caption
                              fontSize={14}
                              color={useColorModeValue(
                                theme.colors.gray[400],
                                theme.colors.appWhite[600],
                              )}>
                              {item?.product[0]?.warranty}
                            </Caption>
                          </Caption>
                          <Caption
                            color={useColorModeValue(
                              theme.colors.black[200],
                              theme.colors.appWhite[600],
                            )}
                            fontSize={12}
                            mt={4}>
                            Swipe to remove item
                          </Caption>
                        </View>
                        <View
                          py={2}
                          position="absolute"
                          right={1}
                          top={1}
                          px={5}>
                          <TouchableOpacity
                            onPress={() => {
                              handleCollect(Number(item?.product_id));
                            }}>
                            <View
                              borderColor={useColorModeValue(
                                theme.colors.black[200],
                                theme.colors.appWhite[600],
                              )}
                              backgroundColor={useColorModeValue(
                                theme.colors.black[200],
                                theme.colors.appWhite[600],
                              )}
                              borderWidth={1}
                              borderRadius={2}
                              px={2}
                              mb={2}
                              py={2}>
                              {item?.product[0]?.collected ? (
                                <FontAwesome
                                  name="star"
                                  size={22}
                                  style={{
                                    color: useColorModeValue(
                                      theme.colors.appWhite[600],
                                      theme.colors.black[2000],
                                    ),
                                  }}
                                />
                              ) : (
                                <Feather
                                  name="star"
                                  size={22}
                                  color={useColorModeValue(
                                    theme.colors.appWhite[600],
                                    theme.colors.black[2000],
                                  )}
                                />
                              )}
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Swipeout>
                    <Divider />
                  </>
                );
              })}
              <View
                // position="absolute"
                px={7}
                right={0}
                bottom={0}
                width="100%"
                bg={useColorModeValue(
                  theme.colors.appWhite[600],
                  theme.colors.black[200],
                )}
                justifyContent="center"
                alignItems="center">
                <View style={styles.contact}>
                  <View
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    style={styles.Outcont1}>
                    <Caption mb={3}>
                      Sub Total ({cartItem?.data?.length} Item)
                    </Caption>
                    <Caption mb={3} ml={2} fontSize={18}>
                      AED {/* {productPrice[0].price} */} {itemPrice}
                    </Caption>
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
                      },
                    ]}
                    onPress={() => {
                      checkout();
                    }}>
                    <SubTitle style={styles.customer}>
                      Proceed to checkout
                    </SubTitle>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <View justifyContent="center" alignItems="center" mt={20}>
              <View>
                <Feather name="shopping-cart" size={150} />
                <View style={{ marginTop: 40 }}>
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
  root: {
    width: '100%',
    // height: '100%',
    flexGrow: 1,
  },
  productimage: { height: 100, width: 100, borderRadius: 360 },
  contact: {
    width: '100%',
    paddingBottom: 40,
    alignItems: 'center',
  },
  Outcont: {
    borderRadius: 5,
    width: 340,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Outcont1: {
    width: '100%',
    paddingTop: 10,
  },
  customer: {
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  customertwo: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Cart;
