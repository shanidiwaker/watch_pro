/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FormikProps, useFormik} from 'formik';
import React, {useMemo} from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {View, Divider, useColorModeValue} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import FontAwesome from 'react-native-vector-icons';

import images from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/TextInput';
import {Caption, Title, SubTitle} from '../../../components/Typography';
import {PHONE_REGEX} from '../../../constants/common';
import {RootStackParamList} from '../../../navigation';
import {theme} from '../../../theme';
import MediaPicker, {
  IAssetType,
  PickerHandle,
} from '../../../components/MediaPicker';
import {validateImage} from '../../../utils/validator';
import {IMedia} from '../../Add';
import {showSnackbar} from '../../../utils/SnackBar';
import {useEditProfile} from '../../EditUser/Queries/useEditProfile';
import HeaderSimple from '../../../components/HeaderSimple';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
interface MyFormValues {
  username: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  description: string;
  image: IMedia[];
  cover_photo: IMedia[];
}

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  description: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Description is required!'),
  mobile: Yup.string()
    .matches(PHONE_REGEX, 'Phone number is not valid!')
    .required('Please enter mobile'),
  email: Yup.string()
    .email('Enter a valid email address!')
    .required('Please enter email address'),
  password: Yup.string()
    .min(3, 'Display name should be 8 to 128 characters long.')
    .required('Please enter a password!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password not matched!')
    .required('Please enter confirm password!'),
});

function CreateAccount() {
  const navigation = useNavigation<RootNavigationType>();
  const mediaPicker = React.useRef<PickerHandle>(null);
  const coverPicker = React.useRef<PickerHandle>(null);
  const [isLoading, setLaoding] = React.useState(false);
  const [isValidatCover, setIsValidatCover] = React.useState(false);
  const {t} = useTranslation();
  const {createAccount} = useEditProfile();
  const inset = useSafeAreaInsets();

  // formik
  const initialValues = {
    username: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: '',
    image: [],
    cover_photo: [],
  };

  const onSubmit = async (values: any) => {
    setLaoding(true);
    // if (
    //   values.image.length > 0 &&
    //   values.image?.[0].uri !== '' &&
    //   values.cover_photo.length > 0 &&
    //   values.cover_photo?.[0].uri !== ''
    // ) {
    values.mobile_number = values.mobile;
    await createAccount(values);
    
    setLaoding(false);
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
    setFieldValue,
  } = formik;

  const isValidate = useMemo(() => {
    return (
      values.username.length > 0 &&
      values.email.length > 0 &&
      values.password.length > 0 &&
      values.confirmPassword.length > 0 &&
      values.mobile.length === 10
    );
  }, [values]);
  const onSelectImage = (files: IAssetType[]) => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const tempImages: IMedia[] = [];
    if (files.length > 0) {
      files.map(file => {
        const fileType: string = file.type!;
        const fileSize: number = file.fileSize!;
        const fileUri: string = file.uri!;

        if (fileType.includes('image')) {
          const fileName: string = file.fileName!;
          const allowedSize = 5;
          if (validateImage(fileName, fileType, fileSize, allowedSize)) {
            tempImages.push({
              uri: fileUri,
              type: fileType,
              name: fileName,
            });
          }
        }
        return file;
      });
    }
    setFieldValue('image', tempImages);
  };
  const selectAddMedia = () => {
    mediaPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };
  const onSelectCoverMedia = () => {
    coverPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };
  const onSelectCover = (files: IAssetType[]) => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const tempImages: IMedia[] = [];
    if (files.length > 0) {
      files.map(file => {
        const fileType: string = file.type!;
        const fileSize: number = file.fileSize!;
        const fileUri: string = file.uri!;

        if (fileType.includes('image')) {
          const fileName: string = file.fileName!;
          const allowedSize = 5;
          if (validateImage(fileName, fileType, fileSize, allowedSize)) {
            tempImages.push({
              uri: fileUri,
              type: fileType,
              name: fileName,
            });
          } else {
            setIsValidatCover(true);
          }
        }
        return file;
      });
    }
    setFieldValue('cover_photo', tempImages);
  };

  return (
    <ImageBackground
      source={images.UNSPLASH_BACKGROUND}
      style={{
        paddingTop: inset.top,
        paddingBottom: inset.bottom+20,
      }}>
      <HeaderSimple
        title={t('profile:createHeading')}
        bg="transparent"
        color={theme.colors.appWhite['600']}
      />

      <ScrollView>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          enableOnAndroid
          contentContainerStyle={[styles.fullScreen, styles.alignItems_center]}>
          <View style={styles.section__wrapper}>
            <View
              borderRadius={10}
              width="100%"
              borderColor={theme.colors.gray[200]}>
              <View flexDirection="row" width="100%" alignItems="center">
                <TouchableOpacity onPress={selectAddMedia}>
                  <View
                    style={{borderRadius: 360, width: 64, height: 64}}
                    bg={theme.colors.black[150]}
                    justifyContent="center"
                    alignItems="center">
                    {values.image.length > 0 ? (
                      <Image
                        source={{uri: values.image?.[0].uri}}
                        style={styles.logoImg}
                      />
                    ) : (
                      <Image
                        source={images.Gallry}
                        style={{height: 15, width: 25}}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <View style={{marginLeft: 10}}>
                  <Title color={theme.colors.appWhite[600]}>
                    Upload profile photo
                  </Title>
                  <Caption color={theme.colors.appWhite[600]} fontSize={10}>
                    Maximum file size is 5mb
                  </Caption>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={onSelectCoverMedia}
              style={{
                borderRadius: 10,
                width: '100%',
              }}>
              <View
                mt={2}
                borderRadius={10}
                height={100}
                width="100%"
                justifyContent="center"
                alignItems="center"
                bg={theme.colors.gray[500]}
                borderColor={theme.colors.gray[200]}>
                {values.cover_photo.length > 0 ? (
                  <Image
                    source={{uri: values.cover_photo?.[0].uri}}
                    style={{
                      borderRadius: 10,
                      resizeMode: 'cover',
                      height: '100%',
                      width: '100%',
                    }}
                  />
                ) : (
                  <>
                    <Title color={theme.colors.appWhite[600]} fontSize={14}>
                      Add Cover Photo
                    </Title>
                    <Caption color={theme.colors.appWhite[600]} fontSize={10}>
                      Maximum file size is 5mb. Tab to upload{' '}
                    </Caption>
                  </>
                )}
              </View>
            </TouchableOpacity>
            <Divider bg={theme.colors.appWhite[200]} mt={30} mb={30} />
            <CustomTextInput
              placeholder="Name"
              onPressHandler={handleChange('username')}
              value={values.username}
              error={touched.username && errors.username}
              onBlurHandler={handleBlur('username')}
            />

            <CustomTextInput
              placeholder="Email"
              onPressHandler={handleChange('email')}
              value={values.email}
              keyboardType="email-address"
              error={touched.email && errors.email}
              onBlurHandler={handleBlur('email')}
            />

            <CustomTextInput
              placeholder="Mobile No."
              onPressHandler={handleChange('mobile')}
              value={values.mobile}
              isNumberPad
              keyboardType="number-pad"
              error={touched.mobile && errors.mobile}
              onBlurHandler={handleBlur('mobile')}
            />
            <CustomTextInput
              placeholder="Tell something about yourself"
              isMultiLine
              onPressHandler={handleChange('description')}
              propStyle={styles.mt_11}
              value={values.description}
              error={touched.description && errors.description}
              onBlurHandler={handleBlur('description')}
            />
            <Divider bg={theme.colors.appWhite[200]} />

            <CustomTextInput
              placeholder="Enter Password"
              onPressHandler={handleChange('password')}
              isSecure
              propStyle={styles.mt_12}
              value={values.password}
              error={touched.password && errors.password}
              onBlurHandler={handleBlur('password')}
            />
            <CustomTextInput
              placeholder="Re-Enter Password"
              onPressHandler={handleChange('confirmPassword')}
              isSecure
              value={values.confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
              onBlurHandler={handleBlur('confirmPassword')}
            />
            <CustomButton
              isLoading={isSubmitting}
              title="Create account"
              isTransparent
              onPressHandler={() => {
                handleSubmit();
              }}
            />
            <Divider bg={theme.colors.appWhite[200]} mt={10} />

            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.account__wrapper}>
              <Caption style={styles.account__wrapper_title}>
                I already have an account
              </Caption>
              <Image
                source={images.RIGHT_ARROW}
                style={[styles.imgSize, styles.opacity]}
              />
            </TouchableOpacity>

            <MediaPicker
              options={{mediaType: 'photo', selectionLimit: 1}}
              ref={mediaPicker}
              onSelectImage={onSelectImage}
            />
            <MediaPicker
              options={{mediaType: 'photo', selectionLimit: 1}}
              ref={coverPicker}
              onSelectImage={onSelectCover}
            />

            <View style={styles.mb_30} />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    backgroundColor: theme.colors.gray[150],
  },
  alignItems_center: {alignItems: 'center'},

  section__wrapper: {
    width: '70%',
    height: '90%',
    alignItems: 'center',
    marginTop: '10%',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 360,
  },
  imgSize: {
    width: 24,
    height: 24,
  },
  opacity: {opacity: 0.6},

  mt_11: {height: 150, alignItems: 'flex-start'},
  mt_12: {marginTop: 40},
  mb_30: {marginBottom: 30},
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
});

export default CreateAccount;
