/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import React, { useMemo } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import images from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import HeaderSimple from '../../../components/HeaderSimple';
import SeparatorLine from '../../../components/SeparatorLine';
import CustomTextInput from '../../../components/TextInput';
import { Caption, Title } from '../../../components/Typography/index';
import { RootStackParamList } from '../../../navigation';
import { forgotPassword } from '../../../redux/reducers/user/UserServices';
import { theme } from '../../../theme';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

interface MyFormValues {
  username: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(2, 'Invalid name!')
    .required('Name is required!'),
});

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootNavigationType>();

  // formik
  const initialValues = {
    username: '',
  };

  const onSubmit = async (
    values: MyFormValues,
    helpers: FormikHelpers<MyFormValues>,
  ) => {
    if (values.username.length > 0) {
      const data = {
        username: values.username,
      };
      const response = await dispatch(forgotPassword(data));
      console.log('response.action', response.action);
      if (response.action.payload.status) {
        navigation.navigate('ResetPassword', {
          otp: response.action.payload.otp,
          username: values.username,
        });
      }
      helpers.setSubmitting(false);
      helpers.resetForm();
    }
  };

  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
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
    return values.username.length > 0;
  }, [values]);

  return (
    <ImageBackground
      source={images.LOGIN_OPTIONS_BACKGROUND}
      style={styles.alignCenter}>
      <SafeAreaView style={styles.fullScreen}>
        <HeaderSimple
          title="Forgot Password"
          bg="transparent"
          color={theme.colors.appWhite['600']}
        />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{ flex: 1 }}
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
            <CustomTextInput
              value={values.username}
              placeholder="Username"
              onPressHandler={handleChange('username')}

              keyboardType="email-address"
              error={touched.username && errors.username}
              onBlurHandler={handleBlur('username')}
            />

            <CustomButton
              title="Submit"
              isLoading={isSubmitting}
              onPressHandler={() => {
                handleSubmit();
              }}
            // isDisable={!isValidate || isSubmitting}
            />

            <SeparatorLine />

            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.account__wrapper}>
              <Image
                source={images.LEFT_ARROW}
                style={[styles.imgSize, styles.opacity]}
              />
              <Caption style={styles.account__wrapper_title}>Go Back</Caption>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.gray['150'],
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%',
    height: '100%',
  },

  alignCenter: { alignItems: 'center' },

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
  section__lockIcon_img: { width: 42, height: 42 },
  margin_vertical: { marginVertical: 25 },
  caption: {
    color: theme.colors.appWhite['700'],
    fontSize: 12,
    textTransform: 'capitalize',
    letterSpacing: 1,
    textAlign: 'center',
    opacity: 0.5,
  },

  imgSize: {
    width: 24,
    height: 24,
  },

  account__wrapper: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  account__wrapper_title: {
    color: theme.colors.appWhite['700'],
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
  },
  opacity: { opacity: 0.6 },
});
