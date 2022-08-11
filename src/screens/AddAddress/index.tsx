/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useColorModeValue, View, Divider, Spinner} from 'native-base';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {FormikProps, useFormik} from 'formik';
import * as Yup from 'yup';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaderSimple from '../../components/HeaderSimple';
import {theme} from '../../theme';
import DropDwonList from '../../components/DropDwonList';
import {SubTitle} from '../../components/Typography';
import InputBox from '../../components/InputBox';
import COUNTRIES from './country.json';
import {useSaveAddress} from './Queries/useSaveAddress';
import {RootStackParamList} from '../../navigation';
import {PHONE_REGEX} from '../../constants/common';

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditAddress'
>;

const validationSchema = Yup.object({
  full_address: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Full Address is required!'),
  state: Yup.string().min(3, 'Invalid state!').required('State is required!'),
  phone_no: Yup.string()
    .matches(PHONE_REGEX, 'Phone number is not valid!')
    .required('Please enter mobile'),
  username: Yup.string().min(3, 'Invalid Name!').required('Name is required!'),
  city: Yup.string().min(3, 'Invalid city!').required('City is required!'),
  pincode: Yup.string()
    .min(3, 'Invalid pincode!')
    .required('Pincode is required!'),
});

interface MyFormValues {
  firstName: string;
  lastName: string;
  username: string;
  phone_no: string;
  id?: '';
  full_address: string;
  state: string;
  city: string;
  pincode: string;
  country: string;
}
export default function ShippingAdress(props: ProfileScreenProps) {
  const [t, i18] = useTranslation();
  const {route} = props;
  const data = route.params?.data;
  const inset = useSafeAreaInsets();
  const [states, setStates] = useState<any>([]);
  const {addAddress, editAddress} = useSaveAddress();

  // const initialValues = {
  //   firstName: '',
  //   lastName: '',
  //   username: '',
  //   phone_no: '',
  //   full_address: '',
  //   state: '',
  //   city: '',
  //   pincode: '',
  //   country: '',
  // };
  console.log('data', JSON.stringify(data, null, 2));
  const initialValues = {
    full_address: data?.full_address || '',
    state: data?.state || '',
    city: data?.city || '',
    pincode: data?.pincode || '',
    phone_no: data?.phone_no || '',
    username: data?.username || '',
    country: data?.country || '',
  };

  const onSubmit = async (values: any) => {
    if (Number(route?.params?.data?.id) > 0) {
      values.id = data.id;
      editAddress(values);
    } else {
      await addAddress(values);
    }
  };

  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit,
  });
  const {
    setFieldValue,
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    isSubmitting,
    touched,
    errors,
  } = formik;

  const handleCountry = (text: string) => {
    const tempStates = COUNTRIES.filter(x => x.label === text);
    setFieldValue('country', text);
    setStates(tempStates?.[0]?.states);
  };

  const handleState = (text: string) => {
    setFieldValue('state', text);
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        paddingTop: inset.top,
        paddingHorizontal: 20,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[2000],
        ),
      }}>
      <HeaderSimple title={t('common:ShippingAdress')} bg="transparent" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 25,
        }}>
        <DropDwonList
          heading={t('common:Location')}
          type="Location"
          data={COUNTRIES}
          value={values.country}
          setValue={handleCountry}
        />
        <Divider mt={5} mb={5} />

        <InputBox
          value={values.username}
          placeholder="Full Name"
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          error={touched.username && errors.username}
        />
        <InputBox
          value={values.phone_no}
          placeholder="Phone Number"
          onChangeText={handleChange('phone_no')}
          onBlur={handleBlur('phone_no')}
          error={touched.phone_no && errors.phone_no}
        />

        <Divider mt={5} />
        <InputBox
          value={values.full_address}
          placeholder="Address"
          onChangeText={handleChange('full_address')}
          onBlur={handleBlur('full_address')}
          error={touched.full_address && errors.full_address}
        />

        <View mt={3}>
          <DropDwonList
            heading={t('common:state')}
            type="State"
            data={states}
            value={values.state}
            setValue={handleState}
          />
        </View>
        <InputBox
          value={values.city}
          placeholder="City"
          onChangeText={handleChange('city')}
          onBlur={handleBlur('city')}
          error={touched.city && errors.city}
        />
        <InputBox
          value={values.pincode}
          placeholder="Pine Code"
          onChangeText={handleChange('pincode')}
          onBlur={handleBlur('pincode')}
          error={touched.pincode && errors.pincode}
        />
        <View
         
          mt={5}>
          <TouchableOpacity
            style={[
              styles.Outcont,
              {
                backgroundColor: useColorModeValue(
                  theme.colors.gray[100],
                  theme.colors.black[200],
                ),
              },
            ]}
            onPress={() => {
              if (!isSubmitting) {
                handleSubmit();
              }
            }}>
            {isSubmitting ? (
              <Spinner />
            ) : (
              <SubTitle
                style={styles.customer}
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
                fontSize={14}>
                Save
              </SubTitle>
            )}
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.SubmitButton}>
          <SubTitle style={styles.SubmitButtonText}>
            {t('common:Save_And_Continue')}
          </SubTitle>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Outcont: {
    borderRadius: 5,

    borderWidth: 0.5,
    width: 340,
    paddingTop: 10,
    paddingBottom: 10,
  },
  customer: {
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
