/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Radio, Spinner, useColorModeValue, Divider} from 'native-base';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {theme} from '../../theme';
import {Caption, SubTitle, Title} from '../../components/Typography';
import {useFetchAddress} from '../AddAddress/Queries/useFetchAddress';
import Error from '../../components/Error';
import {IAddress} from '../AddAddress';
import {useCartOperations} from '../Cart/Queries/useCartOperations';
import HeaderSimple from '../../components/HeaderSimple';
import {RootNavigationType} from '../Home';

export type CheckoutScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Payment'
>;

function Cards(props: CheckoutScreenProps) {
  const {route} = props;
  const navigation = useNavigation<RootNavigationType>();
  const [value, setValue] = React.useState('one');
  const {data: address, isLoading, isError, refetch} = useFetchAddress();
  const {proceedCheckout} = useCartOperations();
  const {t} = useTranslation();
  const inset = useSafeAreaInsets();

  if (isError) {
    return <Error retry={refetch} />;
  }
  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  const handleDeliver = async () => {
    console.log('value', value);
    if (value === 'one') {
      navigation.navigate('BPayment');
      // const response = await proceedCheckout(route.params?.address_id);
      // console.log('response', response);
    } else {
      const response = await proceedCheckout(route.params?.address_id, 'cod');
      console.log('response', response);
    }

    // await totheAdress({order_id: route.params?.orderId, address_id: id});
  };
  return (
    <View
      style={{
        paddingTop: inset.top,
        height: '100%',
        width: '100%',
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[2000],
        ),
      }}>
      <HeaderSimple title={t('common:payment')} />
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
          <SubTitle fontSize={16}>Choose from your payment method </SubTitle>

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
                    setValue(nextValue);
                  }}>
                  <Radio
                    colorScheme="primary"
                    value="one"
                    my="1"
                    alignItems="center">
                    <Title pl={2}>Pay online</Title>
                  </Radio>
                </Radio.Group>
                {/* <View ml={7}>
                  <Caption>John Doe</Caption>
                  <Caption>Expires on 10/2025</Caption>
                </View> */}
              </View>
              <View py={2} position="absolute" right={0}>
                <Feather
                  name="chevron-right"
                  size={24}
                  color={theme.colors.appWhite[600]}
                />
              </View>
            </View>
          </View>
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
                    setValue(nextValue);
                  }}>
                  <Radio
                    colorScheme="primary"
                    value="two"
                    my="1"
                    alignItems="center">
                    <Title pl={2}>Cash on Delivery (COD)</Title>
                  </Radio>
                </Radio.Group>
                <View ml={7} width="80%">
                  <Caption>
                    Pay by cash on delivery. Additional fees of AED 10 may
                    apply.
                  </Caption>
                </View>
              </View>
              <View py={2} position="absolute" right={0}>
                <Feather
                  name="chevron-right"
                  size={24}
                  color={theme.colors.appWhite[600]}
                />
              </View>
            </View>
          </View>

          {/* <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('AddAddress');
            }}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              mt={5}
              p={3}
              borderRadius={5}
              bg={theme.colors.gray[100]}>
              <View>
                <SubTitle
                  color={theme.colors.black[2000]}
                  fontWeight="600"
                  textTransform="uppercase"
                  fontSize={14}>
                  Add new Payment method
                </SubTitle>
              </View>

              <Feather name="plus" color={theme.colors.gray[400]} size={24} />
            </View>
          </TouchableOpacity> */}
          <View
            // position="absolute"
            mt={3}
            // px={7}
            right={0}
            bottom={0}
            borderRadius={8}
            width="100%"
            bg={useColorModeValue(
              theme.colors.appWhite[600],
              theme.colors.black[2000],
            )}
            justifyContent="center"
            alignItems="center">
            <View style={styles.contact}>
              <TouchableOpacity
                style={[
                  styles.Outcont,
                  {
                    backgroundColor: useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    ),
                    borderColor: useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    ),
                    borderWidth: 2,
                  },
                ]}
                onPress={handleDeliver}>
                <SubTitle
                  style={styles.customer}
                  color={useColorModeValue(
                    theme.colors.appWhite[600],
                    theme.colors.black[2000],
                  )}
                  textTransform="uppercase">
                  Proceed to checkout
                </SubTitle>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Divider />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.white,
    padding: 15,
    width: '100%',
    height: '80%',
  },
  contact: {
    width: '100%',
    paddingBottom: 40,
    alignItems: 'center',
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

export default Cards;
