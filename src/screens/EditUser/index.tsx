/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FormikProps, useFormik} from 'formik';
import React, {useMemo} from 'react';
import {Alert, Image, Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Spinner, useColorModeValue, View} from 'native-base';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/TextInput';
import {PHONE_REGEX} from '../../constants/common';
import {RootStackParamList} from '../../navigation';
import {theme} from '../../theme';
import MediaPicker, {
  IAssetType,
  PickerHandle,
} from '../../components/MediaPicker';
import {IMedia} from '../Add';
import {validateImage} from '../../utils/validator';
import {showSnackbar} from '../../utils/SnackBar';
import {useEditProfile} from './Queries/useEditProfile';
import {useProfile} from '../Me/Queries/useProfile';
import HeaderSimple from '../../components/HeaderSimple';
import {Title} from '../../components/Typography';
import useUserInfo from '../../hooks/useUserInfo';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
interface IEditUser {
  username: string;
  mobile_number: string;
  email: string;
  image: IMedia[];
  cover_photo: IMedia[];
}

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  mobile_number: Yup.string().matches(
    PHONE_REGEX,
    'Phone number is not valid!',
  ),
  email: Yup.string()
    .email('Enter a valid email address!')
    .required('Please enter email address'),
});

function EditAccount() {
  const mediaPicker = React.useRef<PickerHandle>(null);
  const coverPicker = React.useRef<PickerHandle>(null);
  const {data: profile, isLoading: profileLoading} = useProfile();
  const {user} = useUserInfo();
  const {updateProfile} = useEditProfile();

  // formik
  const initialValues = {
    image: [{uri: user?.image}],
    cover_photo: [{uri: user?.cover_photo}],
    username: profile?.User?.username || '',
    mobile_number: profile?.User?.mobile_number?.toString() || '',
    email: profile?.User?.email || '',
  };
  const onSubmit = async (values: any) => {
    if (
      values.image.length > 0 &&
      values.image?.[0].uri !== '' &&
      values.cover_photo.length > 0 &&
      values.cover_photo?.[0].uri !== ''
    ) {
      await updateProfile(values);
    } else {
      Alert.alert('Alert', 'Please select avatar');
    }

    // helpers.resetForm();
  };

  const formik: FormikProps<IEditUser> = useFormik<IEditUser>({
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
    setFieldValue,
    isSubmitting,
  } = formik;

  const isValidate = useMemo(() => {
    return (
      values.username.length > 0 &&
      values.email.length > 0 &&
      values.mobile_number.length === 10
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
          const allowedSize = 100;
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
          const allowedSize = 100;
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
    setFieldValue('cover_photo', tempImages);
  };

  const selectAddMedia = () => {
    mediaPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };

  const onSelectCoverMedia = () => {
    coverPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView
      style={[
        styles.fullScreen,
        {
          backgroundColor: useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[200],
          ),
        },
      ]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        enableOnAndroid
        contentContainerStyle={[styles.fullScreen, styles.alignItems_center]}>
        <HeaderSimple title="Edit Profile" />

        {profileLoading ? (
          <Spinner mb={20} mt={20} />
        ) : (
          <View style={styles.section__wrapper}>
            <TouchableOpacity
              onPress={selectAddMedia}
              style={{
                borderRadius: 10,
              }}>
              {values.image.length > 0 ? (
                // eslint-disable-next-line react-native/no-inline-styles
                <View
                  style={[
                    styles.avatarContainer,
                    {
                      borderRadius: 10,
                      padding: 0,
                      borderColor: useColorModeValue(
                        theme.colors.black[200],
                        theme.colors.gray[200],
                      ),
                    },
                  ]}>
                  <Image
                    source={{uri: values.image?.[0].uri}}
                    style={styles.logoImg}
                  />
                </View>
              ) : (
                <View
                  height={100}
                  width={100}
                  borderRadius={10}
                  borderColor={useColorModeValue(
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}>
                  <View
                    borderRadius={10}
                    bg="rgba(0,0,0,0.5)"
                    height="100%"
                    width="100%"
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                    zIndex={999}>
                    <Title color={theme.colors.appWhite[600]}>
                      Profile Pic
                    </Title>
                  </View>
                  <Image source={images.CAMERA} style={styles.logoImg} />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSelectCoverMedia}
              style={{
                borderRadius: 10,
                width: '100%',
              }}>
              {values.cover_photo.length > 0 ? (
                // eslint-disable-next-line react-native/no-inline-styles require("../.././assets/images/user.png")
                <View
                  mt={2}
                  style={[
                    styles.avatarContainer,
                    {
                      borderRadius: 10,
                      padding: 0,
                      height: 150,
                      width: '100%',
                      borderColor: useColorModeValue(
                        theme.colors.black[200],
                        theme.colors.gray[200],
                      ),
                    },
                  ]}>
                  <Image
                    source={{uri: values.cover_photo?.[0].uri}}
                    style={{
                      borderRadius: 10,
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              ) : (
                <View
                  mb={2}
                  mt={2}
                  width="100%"
                  borderRadius={10}
                  borderColor={useColorModeValue(
                    theme.colors.black[200],
                    theme.colors.gray[200],
                  )}>
                  <View
                    borderRadius={10}
                    bg="rgba(0,0,0,0.5)"
                    height="100%"
                    width="100%"
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                    zIndex={999}>
                    <Title color={theme.colors.appWhite[600]}>Cover Pic</Title>
                  </View>
                  <View style={[styles.avatarContainer, {width: '100%'}]}>
                    <Image source={images.CAMERA} style={styles.bgImg} />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            <CustomTextInput
              placeholder="Name"
              onPressHandler={handleChange('username')}
              propStyle={styles.mt_30}
              value={values.username}
              error={touched.username && errors.username}
              onBlurHandler={handleBlur('username')}
            />

            <CustomTextInput
              placeholder="Email"
              onPressHandler={handleChange('email')}
              propStyle={styles.mt_10}
              value={values.email}
              error={touched.email && errors.email}
              onBlurHandler={handleBlur('email')}
            />

            <CustomTextInput
              placeholder="Mobile"
              onPressHandler={handleChange('mobile_number')}
              propStyle={styles.mt_10}
              value={values.mobile_number}
              isNumberPad
              error={touched.mobile_number && errors.mobile_number}
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
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  alignItems_center: {alignItems: 'center'},
  bgImg: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  section__wrapper: {
    width: '70%',
    height: '90%',
    alignItems: 'center',
    marginTop: '10%',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  mt_30: {marginTop: 30},
  mt_10: {marginTop: 10},
  mb_30: {marginBottom: 30},
  avatarContainer: {
    backgroundColor: theme.colors.appWhite[600],
    borderRadius: 10,
    height: 100,
    width: 100,
  },
});

export default EditAccount;
