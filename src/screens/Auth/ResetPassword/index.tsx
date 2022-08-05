/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {FormikHelpers, FormikProps, useFormik} from 'formik';
import React, {useMemo} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import images from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import HeaderSimple from '../../../components/HeaderSimple';
import CustomTextInput from '../../../components/TextInput';
import {Title} from '../../../components/Typography';
import {RootStackParamList} from '../../../navigation';
import {IResetRequestData} from '../../../redux/reducers/user/UserInterface';
import {resetPassword} from '../../../redux/reducers/user/UserServices';
import {theme} from '../../../theme';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

export type ResetPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPassword'
>;

interface MyFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  otp: Yup.string().trim().min(8, 'Invalid otp!').required('otp is required!'),
  password: Yup.string()
    .min(3, 'Display name should be 8 to 128 characters long.')
    .required('Please enter a password!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password not matched!')
    .required('Please enter confirm password!'),
});

function ResetPassword(props: ResetPasswordScreenProps) {
  const navigation = useNavigation<RootNavigationType>();
  const dispatch = useDispatch();
  const {route} = props;
  // formik
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
    otp: route.params.otp.toString(),
  };
  const onSubmit = async (
    values: MyFormValues,
    helpers: FormikHelpers<MyFormValues>,
  ) => {
    const data: IResetRequestData = {
      username: values.username,
      new_password: values.password,
      otp: route.params.otp,
      confirm_new_password: values.password,
    };
    console.log('data', JSON.stringify(data, null, 2));
    const response = await dispatch(resetPassword(data));
    if (response.action.payload.status) {
      if (values.otp !== '12345678') {
        navigation.navigate('Login');
      } else {
        navigation.goBack();
      }
    }
    helpers.resetForm();
    // navigation.navigate('Login');
  };

  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
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
    setFieldValue,
  } = formik;

  React.useEffect(() => {
    if (route) {
      setFieldValue('otp', route.params.otp);
      setFieldValue('username', route.params.username);
    }
  }, [route, setFieldValue]);

  const isValidate = useMemo(() => {
    return (
      values.username.length > 0 &&
      values.password.length > 0 &&
      values.confirmPassword.length > 0 &&
      values.otp.length > 0
    );
  }, [values]);

  return (
    <ImageBackground
      source={images.LOGIN_OPTIONS_BACKGROUND}
      style={styles.alignCenter}>
      <SafeAreaView style={styles.fullScreen}>
        <HeaderSimple
          title="Reset Password"
          bg="transparent"
          color={theme.colors.appWhite['600']}
        />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.section__LockIcon_outer}>
              <View style={styles.section__lockIcon_inner}>
                <View style={styles.section__lockIcon_innerMost}>
                  <Image
                    source={images.LOCK_ICON}
                    style={styles.section__lockIcon_img}
                  />
                </View>
              </View>
            </View>
            {/* <Image source={images.LOGO} style={styles.logoImg} /> */}

            <CustomTextInput
              placeholder="Name"
              onPressHandler={handleChange('username')}
              propStyle={styles.mt_30}
              value={values.username}
              editable={false}
              error={touched.username && errors.username}
              onBlurHandler={handleBlur('username')}
            />
            {values.otp !== '12345678' && (
              <CustomTextInput
                placeholder="OTP"
                keyboardType="number-pad"
                propStyle={styles.mt_10}
                onPressHandler={handleChange('otp')}
                value={values.otp?.toString()}
                error={touched.otp && errors.otp}
                onBlurHandler={handleBlur('otp')}
              />
            )}

            <CustomTextInput
              placeholder="Password"
              onPressHandler={handleChange('password')}
              isSecure
              propStyle={styles.mt_10}
              value={values.password}
              error={touched.password && errors.password}
              onBlurHandler={handleBlur('password')}
            />

            <CustomTextInput
              placeholder="Confirm Password"
              onPressHandler={handleChange('confirmPassword')}
              isSecure
              propStyle={[styles.mt_10, styles.mb_30]}
              value={values.confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
              onBlurHandler={handleBlur('confirmPassword')}
            />

            <CustomButton
              title="Submit"
              isLoading={isSubmitting}
              onPressHandler={() => {
                handleSubmit();
              }}
              isDisable={isSubmitting}
            />

            <View style={styles.mb_30} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%',
    height: '100%',
  },

  fullScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.gray[150],
  },
  section__LockIcon_outer: {
    width: 90,
    height: 90,
    borderColor: theme.colors.black['3000'],
    borderWidth: 8,
    borderRadius: 90,
    marginBottom: 40,
    marginTop: 45,
  },
  section__lockIcon_inner: {
    width: '100%',
    height: '100%',
    borderColor: theme.colors.appWhite['700'],
    backgroundColor: theme.colors.black['3000'],
    borderWidth: 1,
    padding: 5,
    borderRadius: 74,
  },
  section__lockIcon_innerMost: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.black['4000'],
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section__lockIcon_img: {width: 42, height: 42},
  

  main__header_back: {width: '15%', alignItems: 'flex-end'},
  main__header_title__wrapper: {width: '70%', alignItems: 'center'},
  imgSize: {
    width: 24,
    height: 24,
  },
  section__wrapper: {
    width: '70%',
    height: '90%',
    alignItems: 'center',
    marginTop: '10%',
  },
  logoImg: {width: 90, height: 90, resizeMode: 'contain'},
  mt_30: {marginTop: 30},
  mt_10: {marginTop: 10},
  mb_30: {marginBottom: 30},
});

export default ResetPassword;
