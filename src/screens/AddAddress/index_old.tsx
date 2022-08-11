/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {FormikProps, useFormik} from 'formik';
import {useColorModeValue} from 'native-base';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import CustomButton from '../../components/CustomButton';
import HeaderSimple from '../../components/HeaderSimple';
import CustomTextInput from '../../components/TextInput';
import {RootStackParamList} from '../../navigation';
import {theme} from '../../theme';
import {useSaveAddress} from './Queries/useSaveAddress';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditAddress'
>;

export interface IAddress {
  username: string;
  phone_no: string;
  id?: '';
  full_address: string;
  state: string;
  city: string;
  pincode: string;
}

const validationSchema = Yup.object({
  full_address: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Full Address is required!'),
  state: Yup.string().min(3, 'Invalid state!').required('State is required!'),
  phone_no: Yup.string()
    .min(10, 'Invalid phone!')
    .required('Phone is required!'),
  username: Yup.string()
    .min(3, 'Invalid UserName!')
    .required('UserNamef is required!'),
  city: Yup.string().min(3, 'Invalid city!').required('City is required!'),
  pincode: Yup.string()
    .min(3, 'Invalid name!')
    .required('Pincode is required!'),
});

function AddAddress(props: ProfileScreenProps) {
  const {route} = props;
  const data = route.params?.data;
  const {addAddress, editAddress} = useSaveAddress();
  const inset = useSafeAreaInsets();

  // formik
  console.log('profile', JSON.stringify(data, null, 2));

  const initialValues = {
    full_address: data?.full_address || '',
    state: data?.state || '',
    city: data?.city || '',
    pincode: data?.pincode || '',
    phone_no: data?.phone_no || '',
    username: data?.username || '',
  };
  const onSubmit = async (values: any) => {
    if (Number(route?.params?.data?.id) > 0) {
      values.id = data.id;
      editAddress(values);
    } else {
      await addAddress(values);
    }
  };

  const formik: FormikProps<IAddress> = useFormik<IAddress>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit,
  });

  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    handleBlur,
    isSubmitting,
  } = formik;

  const isValidate = useMemo(() => {
    return (
      values.full_address.length > 0 &&
      values.city.length > 0 &&
      values.state.length > 0 &&
      values.pincode.length > 0
    );
  }, [values]);

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
      <HeaderSimple
        title={data?.state ? 'Update Address' : 'Add Address'}
        bg="transparent"
        color={theme.colors.appWhite[600]}
      />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        enableOnAndroid
        contentContainerStyle={[styles.fullScreen, styles.alignItems_center]}>
        <View style={styles.section__wrapper}>
          <CustomTextInput
            placeholder="User Name"
            onPressHandler={handleChange('username')}
            propStyle={styles.mt_30}
            value={values.username}
            error={touched.username && errors.username}
            onBlurHandler={handleBlur('username')}
          />
          <CustomTextInput
            placeholder="Phone"
            onPressHandler={handleChange('phone_no')}
            propStyle={styles.mt_10}
            value={values.phone_no}
            isNumberPad
            error={touched.phone_no && errors.phone_no}
            onBlurHandler={handleBlur('phone_no')}
          />
          <CustomTextInput
            placeholder="Full Address"
            onPressHandler={handleChange('full_address')}
            propStyle={styles.mt_10}
            value={values.full_address}
            error={touched.full_address && errors.full_address}
            onBlurHandler={handleBlur('full_address')}
          />

          <CustomTextInput
            placeholder="State"
            onPressHandler={handleChange('state')}
            propStyle={styles.mt_10}
            value={values.state}
            error={touched.state && errors.state}
            onBlurHandler={handleBlur('email')}
          />

          <CustomTextInput
            placeholder="City"
            onPressHandler={handleChange('city')}
            propStyle={styles.mt_10}
            value={values.city}
            error={touched.city && errors.city}
            onBlurHandler={handleBlur('email')}
          />
          <CustomTextInput
            placeholder="Pincode"
            onPressHandler={handleChange('pincode')}
            propStyle={styles.mt_10}
            value={values.pincode}
            isNumberPad
            error={touched.pincode && errors.pincode}
            onBlurHandler={handleBlur('email')}
          />

          <CustomButton
            title="Submit"
            onPressHandler={() => {
              handleSubmit();
            }}
            isLoading={isSubmitting}
            isDisable={!isValidate || isSubmitting}
          />

          <View style={styles.mb_30} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.black[2000],
  },
  alignItems_center: {alignItems: 'center'},

  section__wrapper: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    // marginTop: '10%',
  },

  mt_30: {marginTop: 30},
  mt_10: {marginTop: 10},
  mb_30: {marginBottom: 30},
});

export default AddAddress;
