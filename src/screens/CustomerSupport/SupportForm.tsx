/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FormikProps, useFormik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {View} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/TextInput';
import {RootStackParamList} from '../../navigation';
import {theme} from '../../theme';
import {useEditProfile} from '../EditUser/Queries/useEditProfile';
import HeaderSimple from '../../components/HeaderSimple';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
interface MyFormValues {
  description: string;
  email: string;
  name: string;
  title: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  description: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Description is required!'),
  email: Yup.string()
    .email('Enter a valid email address!')
    .required('Please enter email address'),
  title: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
});

function SupportForm() {
  const [isLoading, setLaoding] = React.useState(false);
  const {submitSupport} = useEditProfile();
  // formik
  const initialValues = {
    title: '',
    description: '',
    email: '',
    name: '',
  };

  const onSubmit = async (values: any) => {
    setLaoding(true);

    await submitSupport(values);

    setLaoding(false);
  };

  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit,
  });

  const {handleChange, handleSubmit, values, touched, errors, handleBlur} =
    formik;

  return (
    <SafeAreaView style={styles.fullScreen}>
      <HeaderSimple
        title="Support"
        bg="transparent"
        color={theme.colors.appWhite[600]}
      />
      <ScrollView>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          enableOnAndroid
          contentContainerStyle={[styles.fullScreen, styles.alignItems_center]}>
          <View style={styles.section__wrapper}>
            <CustomTextInput
              placeholder="Name"
              onPressHandler={handleChange('name')}
              propStyle={styles.mt_30}
              value={values.name}
              error={touched.name && errors.name}
              onBlurHandler={handleBlur('name')}
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
              placeholder="Title"
              onPressHandler={handleChange('title')}
              propStyle={styles.mt_10}
              value={values.title}
              error={touched.title && errors.title}
              onBlurHandler={handleBlur('title')}
            />

            <CustomTextInput
              placeholder="Description"
              onPressHandler={handleChange('description')}
              propStyle={[styles.mt_10, {height: 150}]}
              value={values.description}
              isMultiLine
              error={touched.description && errors.description}
              onBlurHandler={handleBlur('description')}
            />

            <CustomButton
              title="Submit"
              onPressHandler={() => {
                handleSubmit();
              }}
              isLoading={isLoading}
              // isDisable={!isValidate || isSubmitting}
            />

            <View style={styles.mb_30} />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: theme.colors.black[2000],
  },
  alignItems_center: {alignItems: 'center'},

  section__wrapper: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mt_30: {marginTop: 30},
  mt_10: {marginTop: 10},
  mb_30: {marginBottom: 30},
});

export default SupportForm;
