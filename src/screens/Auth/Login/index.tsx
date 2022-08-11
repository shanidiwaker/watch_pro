/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import React, { useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { Divider } from 'native-base';
import TouchID from 'react-native-touch-id';
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
import { userLogin } from '../../../redux/reducers/user/UserServices';
import { theme } from '../../../theme';
import useUserInfo from '../../../hooks/useUserInfo';
import SocialMediaLogin from './components/SocialMediaLogin';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

interface MyFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(2, 'Invalid name!')
    .required('Name is required!'),
  password: Yup.string()
    .min(3, 'Display name should be 8 to 128 characters long.')
    .required('Please enter a password!'),
});

function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootNavigationType>();
  const { isLoggedIn } = useUserInfo();
  // formik
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (
    values: MyFormValues,
    helpers: FormikHelpers<MyFormValues>,
  ) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    await dispatch(userLogin(data));
    helpers.setSubmitting(false);
    helpers.resetForm();
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
    return values.username.length > 0 && values.password.length > 0;
  }, [values]);

  return (
    <ImageBackground
      source={images.LOGIN_OPTIONS_BACKGROUND}
      style={styles.alignCenter}>
      <SafeAreaView style={styles.fullScreen}>
        <HeaderSimple
          title="Account Login"
          bg="transparent"
          color={theme.colors.appWhite['600']}
        />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{ flex: 1 }}
          contentContainerStyle={{ justifyContent: 'center' }}
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
            <Caption
              fontWeight="400"
              fontSize={14}
              numberOfLines={2}
              color="#fff"
              mb={5}>
              Welcome To Watch Pro{' '}
            </Caption>

            <CustomTextInput
              value={values.username}
              placeholder="Username"
              onPressHandler={handleChange('username')}
              keyboardType="email-address"
              error={touched.username && errors.username}
              onBlurHandler={handleBlur('username')}
              offdarckmod
            />

            <CustomTextInput
              value={values.password}
              placeholder="Password"
              onPressHandler={handleChange('password')}
              isSecure
              // propStyle={styles.margin_top}
              error={touched.password && errors.password}
              onBlurHandler={handleBlur('password')}
              offdarckmod
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
              style={styles.margin_vertical}>
              <Text style={styles.forgot}>forgot password?</Text>
            </TouchableOpacity>

            <CustomButton
              title="login"
              offdarckmod={true}
              isTransparent
              isLoading={isSubmitting}
              onPressHandler={() => {
                handleSubmit();
              }}
            />
            {/* <View style={styles.emtyBox} /> */}
            <SocialMediaLogin />
            <Divider bg={theme.colors.appWhite[200]} mt={10} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateAccount');
              }}
              style={styles.account__wrapper}>
              <Caption style={styles.account__wrapper_title}>
                Create an account
              </Caption>
              <Image
                source={images.RIGHT_ARROW}
                style={[styles.imgSize, styles.opacity]}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    backgroundColor: theme.colors.gray[150],
  },
  emtyBox: {
    height: 150,
  },

  alignCenter: { alignItems: 'center' },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    flex: 1,
  },
  section__LockIcon_outer: {
    width: 90,
    height: 90,
    borderColor: theme.colors.black['3000'],
    borderWidth: 8,
    borderRadius: 90,
    marginBottom: 20,
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
  margin_vertical: { marginVertical: 15 },

  forgot: {
    color: theme.colors.appWhite['700'],
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 1,
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
