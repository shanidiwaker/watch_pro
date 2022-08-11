/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Radio, Spinner, useColorModeValue, Divider} from 'native-base';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {Caption, SubTitle, Title} from '../../components/Typography';
import {useFetchAddress} from '../AddAddress/Queries/useFetchAddress';
import Error from '../../components/Error';
import {useCartOperations} from '../Cart/Queries/useCartOperations';
import HeaderSimple from '../../components/HeaderSimple';
import {IAddress} from '../AddAddress/index_old';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

export type CheckoutScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Checkout'
>;

function Checkout(props: CheckoutScreenProps) {
  const {route} = props;
  const navigation = useNavigation<RootNavigationType>();
  const [value, setValue] = React.useState('0');
  const {data: address, isLoading, isError, refetch} = useFetchAddress();
  const {proceedCheckout} = useCartOperations();
  const inset = useSafeAreaInsets();

  if (isError) {
    return <Error retry={refetch} />;
  }
  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }
  const handleDeliver = async (id: number) => {
    navigation.navigate('Payment', {address_id: id});
    // const response = await proceedCheckout(id);
    // console.log('response', response);
    // await totheAdress({order_id: route.params?.orderId, address_id: id});
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
      <HeaderSimple title="Shipping Details" />
      <Divider />
      <ScrollView
        contentContainerStyle={[
          styles.root,
          {
            backgroundColor: useColorModeValue(
              theme.colors.appWhite[600],
              theme.colors.black[2000],
            ),
          },
        ]}>
        <View width="100%" height="100%">
          <SubTitle fontSize={16} color={theme.colors.black[2000]}>
            Recently Used
          </SubTitle>
          {address && address?.data.length > 0
            ? address?.data.map((item: IAddress, index) => {
                return (
                  <View
                    width="100%"
                    mt={3}
                    bg={useColorModeValue(
                      theme.colors.gray[100],
                      theme.colors.black[200],
                    )}
                    p={2}
                    borderRadius={4}
                    pb={3}>
                    <View flexDirection="row">
                      <View>
                        <Radio.Group
                          name="myRadioGroup"
                          value={value}
                          onChange={nextValue => {
                            setValue(index.toString());
                          }}>
                          <Radio
                            colorScheme="primary"
                            value={index.toString()}
                            my="1"
                            alignItems="center">
                            <Title pl={2}>{item.username}</Title>
                          </Radio>
                        </Radio.Group>
                        <View ml={7}>
                          <Caption>{item.full_address}</Caption>
                          <Caption>
                            {item.city}, {item.state}, {item.pincode}
                          </Caption>
                          <Caption>{item.state}</Caption>
                          <Caption>Phone : {item.phone_no}</Caption>
                        </View>
                      </View>
                      <View py={2} position="absolute" right={0}>
                        <Feather name="chevron-right" size={24} />
                      </View>
                    </View>

                    {index === Number(value) ? (
                      <>
                        <View
                          bg={useColorModeValue(
                            theme.colors.black[200],
                            theme.colors.gray[100],
                          )}
                          borderRadius={6}
                          mt={3}>
                          <TouchableOpacity
                            style={[
                              styles.Outcont,
                              {
                                borderColor: useColorModeValue(
                                  theme.colors.appWhite[600],
                                  theme.colors.black[2000],
                                ),
                                borderWidth: 1,
                              },
                            ]}
                            onPress={() => {
                              handleDeliver(item.id || 0);
                            }}>
                            <SubTitle
                              style={styles.customer}
                              color={useColorModeValue(
                                theme.colors.appWhite[600],
                                theme.colors.black[200],
                              )}
                              fontSize={14}>
                              Deliver to this address
                            </SubTitle>
                          </TouchableOpacity>
                        </View>
                        <View
                          bg={useColorModeValue(
                            theme.colors.appWhite[600],
                            theme.colors.black[2000],
                          )}
                          mt={2}>
                          <TouchableOpacity
                            style={[
                              styles.Outcont,
                              {
                                borderColor: useColorModeValue(
                                  theme.colors.black[200],
                                  theme.colors.appWhite[600],
                                ),
                                borderWidth: 1,
                              },
                            ]}
                            onPress={() => {
                              navigation.navigate('EditAddress', {data: item});
                            }}>
                            <SubTitle
                              style={styles.customer}
                              color={useColorModeValue(
                                theme.colors.black[2000],
                                theme.colors.appWhite[600],
                              )}
                              fontSize={14}>
                              Edit Address
                            </SubTitle>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : null}
                  </View>
                );
              })
            : null}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('AddAddress');
            }}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              mt={2}
              p={3}
              borderRadius={8}
              bg={theme.colors.gray[100]}>
              <View>
                <SubTitle color={theme.colors.black[2000]} fontSize={14}>
                  Add new Address
                </SubTitle>
              </View>

              <Feather name="plus" color={theme.colors.gray[400]} size={24} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.white,
    padding: 15,
    width: '100%',
    height: '100%',
  },

  Outcont: {
    borderRadius: 5,
    // borderColor: theme.colors.black[2000],
    // borderWidth: 2,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  customer: {
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Checkout;
