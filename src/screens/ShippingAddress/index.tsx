/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useColorModeValue, View, Divider, Spinner} from 'native-base';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {FormikProps, useFormik} from 'formik';
import * as Yup from 'yup';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaderSimple from '../../components/HeaderSimple';
import {theme} from '../../theme';
import DropDwonList from '../../components/DropDwonList';
import {SubTitle} from '../../components/Typography';
import InputBox from '../../components/InputBox';
import COUNTRIES from './country.json';
import CustomButton from '../../components/CustomButton';

const validationSchema = Yup.object({
  brand: Yup.string().trim().required('Brand is required!'),
  category: Yup.string().trim().required('Category Returns required!'),
  name: Yup.string().trim().required('Name is required!'),

  price: Yup.string().trim().required('Price is required!'),
  // sale_price: Yup.string().trim().required('Sale Price is required!'),

  // size: Yup.string().trim().required('Size is required!'),
  // description: Yup.string().trim().required('Description is required!'),
  material: Yup.string().trim().required('Material is required!'),
  warranty: Yup.string().trim().required('Warranty is required!'),
  // why_choose_watchpro: Yup.string()
  //   .trim()
  //   .required('Why Choose Watch Pro is required!'),
  // shipping_returns: Yup.string().trim().required('Shipping Returns required!'),
  // privacy_policy: Yup.string()
  //   .trim()
  //   .required('Privacy Policy Returns required!'),
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
export default function ShippingAdress() {
  const [t, i18] = useTranslation();
  const inset = useSafeAreaInsets();
  const [states, setStates] = useState<any>([]);
  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    phone_no: '',
    full_address: '',
    state: '',
    city: '',
    pincode: '',
    country: '',
  };

  const onSubmit = async (values: any) => {
    //
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
    console.log('text', tempStates);
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
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[200],
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
          value={values.firstName}
          placeholder="First Name"
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          error={touched.firstName && errors.firstName}
        />

        <InputBox
          value={values.lastName}
          placeholder="Last Name"
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          error={touched.lastName && errors.lastName}
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
          bg={useColorModeValue(
            theme.colors.appWhite[700],
            theme.colors.black[2000],
          )}
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
                //
              }
              //handleSubmit();
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
