/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {View, Spinner, useColorModeValue} from 'native-base';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {FormikProps, useFormik} from 'formik';
import * as Yup from 'yup';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../theme';
import {Caption, SubTitle, Title} from '../../components/Typography';
import InputBox from '../../components/InputBox';
import MediaPicker, {
  IAssetType,
  PickerHandle,
} from '../../components/MediaPicker';
import {validateImage} from '../../utils/validator';
import {showSnackbar} from '../../utils/SnackBar';
import {useSubmitShop} from './Queries/useSubmitShop';
import useUserInfo from '../../hooks/useUserInfo';
import HeaderSimple from '../../components/HeaderSimple';
import {useGetShopDetails} from './useGetShopDetails';
import * as imageConversion from 'image-conversion';
import ImageResizer from 'react-native-image-resizer';
export interface IMedia {
  uri: string;
  name: string;
  url?: string;
  type: string;
}

interface MyFormValues {
  name: string;
  images: IMedia[];
  oldImages: any[];
}

const validationSchema = Yup.object({});

function Add() {
  const {createShop} = useSubmitShop();
  const user = useUserInfo();
  const {data} = useGetShopDetails();
  const inset = useSafeAreaInsets();
  const initialValues = {
    oldImages: user?.shop?.logo,
    name: user?.shop?.name ? user?.shop?.name : '',
  };

  const onSubmit = async (values: any) => {
    if (user?.shop?.id) {
      if (values.oldImages?.length === 0) {
        Alert.alert('Alert', 'Please enter at least one image or text.');
      } else {
        values.id = user?.shop.id;
        await createShop(values);
      }
    } else if (values.images && values.images?.[0].uri !== '') {
      // if (user.shop) {
      //   values.id = user.shop.id;
      //   await createShop(values);
      // } else {
      await createShop(values);
      // }
    } else {
      Alert.alert('Alert', 'Please enter at least one image or text.');
    }
    // helpers.resetForm();
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
    // errors,
    handleBlur,
    handleChange,
    isSubmitting,
  } = formik;

  const mediaPicker = React.useRef<PickerHandle>(null);

  const onSelectImage = (files: IAssetType[]) => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    console.log(files)
 
    const images: IMedia[] =
      values?.images?.length > 0 ? [...values.images] : [];
    if (files.length > 0) {
      files.map(file => {
        const fileType: string = file.type!;
        const fileSize: number = file.fileSize!;
        const fileUri: string = file.uri!;
   
/*         ImageResizer.createResizedImage(file.uri!, 1600, 1600,'JPEG', 20, undefined)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        }); */

          if (fileType.includes('image')) {
            const fileName: string = file.fileName!;
            const allowedSize = 5;
            if (validateImage(fileName, fileType, fileSize, allowedSize)) {
              images.push({
                uri: fileUri,
                type: fileType,
                name: fileName,
              });
            }
          }
         
      
        console.log('images',fileUri)
        
        return file;
      });
    }

    setFieldValue('images', images);


  };
  const selectAddMedia = () => {
    mediaPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };

  return (
    <View
      style={[
        styles.fullScreen,
        {
          paddingTop: inset.top,
          backgroundColor: useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[2000],
          ),
        },
      ]}>
      <HeaderSimple title={user.shop ? 'Update Shop' : 'Create Shop'} />
      <ScrollView
        contentContainerStyle={[
          styles.root,
          {
            backgroundColor: useColorModeValue(
              theme.colors.appWhite[600],
              theme.colors.black[2000],
            ),
          },
        ]}
        style={{
          backgroundColor: useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[2000],
          ),
        }}>
        {user.shop ? (
          <View
            style={[
              styles.headiconbox,
              {
                height: 50,
                backgroundColor: useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                ),
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Title
              color={useColorModeValue(
                theme.colors.appWhite[600],
                theme.colors.black[2000],
              )}>
              Edit Shop "{user.shop?.name}"
            </Title>
          </View>
        ) : (
          <View style={styles.headiconbox}>
            <View style={styles.header_IconOuter_border}>
              <View style={styles.inner_border}>
                <Feather
                  name="shopping-bag"
                  size={40}
                  style={styles.headericon}
                  color="white"
                />
              </View>
            </View>
          </View>
        )}
        <View px={10}>
          <View width="100%" mt={3} mb={3}>
            <InputBox
              value={values.name}
              placeholder="Shop Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
          </View>
          {values?.oldImages && values?.oldImages?.length > 0 ? (
            <View style={styles.imageList}>
              {values?.oldImages?.map((image: any) => {
                return (
                  <Image
                    source={{
                      uri: image.image,
                    }}
                    style={{
                      width: (Dimensions.get('screen').width / 100) * 80,
                      height: 120,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  />
                );
              })}
            </View>
          ) : null}
          {values?.images && values?.images?.length > 0 ? (
            <View style={styles.imageList}>
              {values?.images?.map((image: any) => {
                return (
                  <Image
                    source={{
                      uri: image.uri,
                    }}
                    style={{
                      width: (Dimensions.get('screen').width / 100) * 80,
                      height: 120,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  />
                );
              })}
            </View>
          ) : !user.shop ? (
            <TouchableOpacity style={styles.uploadbtn} onPress={selectAddMedia}>
              <View
                style={styles.Uploadimg}
                bg={useColorModeValue(
                  theme.colors.gray[100],
                  theme.colors.black[200],
                )}>
                <Title
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  Upload Photo
                </Title>
                <Caption
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  Maximum file size is 5mb.Tab to upload.
                </Caption>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={selectAddMedia}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Caption
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}>
            Add more photos
          </Caption>
          <Feather
            name="plus"
            size={20}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
          />
        </TouchableOpacity>

        <MediaPicker
          options={{mediaType: 'photo', selectionLimit: 10}}
          ref={mediaPicker}
          onSelectImage={onSelectImage}
        />
        <View bg={theme.colors.appWhite[700]} mt={5} borderRadius={5}>
          <TouchableOpacity style={styles.Outcont} onPress={handleSubmit}>
            {isSubmitting ? (
              <Spinner />
            ) : (
              <SubTitle
                style={styles.customer}
                color={theme.colors.black[2000]}
                fontSize={14}>
                Save Changes
              </SubTitle>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    // backgroundColor: theme.colors.appWhite[600],
  },

  Uploadimg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    // backgroundColor: theme.colors.gray[100],
    width: '100%',
    borderRadius: 10,
    marginVertical: 20,
  },

  uploadbtn: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.gray[200],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
  },
  imageList: {
    width: '100%',
    // backgroundColor: theme.colors.gray[200],

    borderRadius: 10,
  },
  root: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.appWhite[600],
    paddingBottom: 20,
    width: '100%',
    // height: '100%'
  },

  Outcont: {
    borderRadius: 5,
    borderColor: theme.colors.gray[400],
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
  headiconbox: {
    height: 140,
    width: '100%',
    backgroundColor: theme.colors.gray[100],
  },
  headericon: {
    margin: 10,
  },
  header_IconOuter_border: {
    width: 90,
    height: 90,
    position: 'absolute',
    borderColor: theme.colors.gray[700],
    borderWidth: 8,
    marginVertical: 25,
    marginHorizontal: 150,
    borderRadius: 360,
  },
  inner_border: {
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    backgroundColor: theme.colors.black[4000],
    borderRadius: 360,
    margin: 5,
  },
});

export default Add;
