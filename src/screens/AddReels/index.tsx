/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  View, useColorModeValue, Spinner,
  Actionsheet, Box, Text,
  useDisclose,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import RNFS from 'react-native-fs';
import VideoPlayer from 'react-native-video-player';
import Feather from 'react-native-vector-icons/Feather';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { theme } from '../../theme';
import { Caption, SubTitle, Title } from '../../components/Typography';
import InputBox from '../../components/InputBox';
import MediaPicker, {
  IAssetType,
  PickerHandle,
} from '../../components/MediaPicker';
import { useSubmitProduct } from '../Add/Queries/useSubmitProduct';

import HeaderSimple from '../../components/HeaderSimple';
import { validateImage } from '../../utils/validator';
import { RootStackParamList } from '../../navigation';
import { useFetchReelCategories } from '../Add/Queries/useFetchReelCategories';
import { createThumbnail } from "react-native-create-thumbnail";

export interface IMedia {
  uri: string;
  name: string;
  type: string;
}

interface MyFormValues {
  description: string;
  images: IMedia[];
  type: number;
  sizeId: number;
  name: string;
  brand: string;
  brand_id: string;
  shop_id: string;
  category_id: string;
  price: string;
  sale_price: string;
  thamblain: IMedia[];
  size: string;
  material: string;
  warranty: string;
  color: string;

  materialId: number;
  warrantyId: number;
  colorId: number;

  why_choose_watchpro: string;
  shipping_returns: string;
  category: string;
  privacy_policy: string;
}

export type EditScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProduct'
>;

const validationSchema = Yup.object({
  description: Yup.string().trim().required('Description is required!'),
});

function AddReel(props: EditScreenProps) {
  const { t } = useTranslation();
  const { createProduct } = useSubmitProduct();
  const inset = useSafeAreaInsets();
  const [img, setImg] = React.useState([]);
  const [video, setVideo] = React.useState([]);
  // for category dropdown
  const {
    isOpen: isCatOpen,
    onOpen: catOpen,
    onClose: onCatClose,
  } = useDisclose();
  const { data: categories } = useFetchReelCategories();


  const initialValues = {
    images: [],
    name: 'reel',
    price: 0,
    brand: 0,
    sale_price: 0,
    description: '',
    size: 0,
    material: 0,
    thamblain: [],
    warranty: 0,
    why_choose_watchpro: '',
    shipping_returns: '',
    privacy_policy: '',
    category: '',
    shop_id: 1,
    color: '',
    colorId: 1,
    materialId: 1,
    warrantyId: 1,
    sizeId: 1,
    category_id: '',
    brand_id: 1,
    type: 1,
  };
  const mediaPicker = React.useRef<PickerHandle>(null);

  const onSubmit = async (values: any) => {
    if (values?.images?.length > 0) {
      await createProduct(values);
      console.log("addddddddd=============>", values);
      return true;
    }
    Alert.alert('Alert', 'Please select a reel');
    return false;
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

  const onSelectImage = async (files: IAssetType[]) => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const reel: IMedia[] = [];
    if (files.length > 0) {

      files.map(file => {
        const fileType: string = file.type!;
        const fileSize: number = file.fileSize!;
        const fileUri: string = file.uri!;

        if (fileType) {
          const fileName: string = file.fileName!;
          const allowedSize = 20;

          if (validateImage(fileName, fileType, fileSize, allowedSize)) {
            // return uri;
            if (fileType === 'video/mp4' && Platform.OS === 'android') {
              videoUrlCopy(fileUri, fileName, fileType);
            } else {
              reel.push({
                uri: fileUri,
                type: fileType,
                name: fileName,
              });
            }
          }
        }
        return file;
      });
    }
    setFieldValue('images', reel);
    // console.log('selected=============>', reel);
    setVideo(reel[0]?.uri);
  };
  const handleRemoveImage = (item: IMedia) => {
    const filter = values.images.filter(x => x !== item);
    setFieldValue('images', filter);
  };
  const videoUrlCopy = async (uri: any, fileName: any, fileType: any) => {
    const images: IMedia[] = [];
    const filename = new Date().getTime();
    const destPath = `file://${RNFS.TemporaryDirectoryPath}/${filename}.mp4`;
    await RNFS.copyFile(uri, destPath);
    const fileUrl = await RNFS.stat(destPath);
    images.push({
      uri: fileUrl.path,
      type: fileType,
      name: 'new vdeo',
    });

    setFieldValue('images', images);
    return destPath;
  };

  const selectAddMedia = () => {
    mediaPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };

  // for category dropdown //
  const handleCategory = (selected: string, id: string) => {
    setFieldValue('category', selected);
    setFieldValue('category_id', id);
    // console.log('id==================>', selected, id);
    onCatClose();
  };

  // create thumbnail
  createThumbnail({
    url: video,
    timeStamp: 1000,
  })
    .then(response => {
      setFieldValue('thamblain', {
        uri: response.path,
        type: 'jpeg',
        name: 'new Date().getTime()'
      });
    }
    )
    .catch(err => console.log({ err }));
  // console.log(img[0])

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
      <HeaderSimple bg="transparent" title="Add Reel" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.root,
          {
            backgroundColor: useColorModeValue(
              theme.colors.appWhite[600],
              theme.colors.black[2000],
            ),
          },
        ]}>
        {/* {values.images?.length > 0 ? (
          <View style={styles.Uploadimg}>
            <TouchableOpacity
              onPress={() => {
                setFieldValue('reel', undefined);
              }}
              style={{position: 'absolute', top: -10, right: 5, zIndex: 99999}}>
              <Feather name="x" size={25} color="#fff" />
            </TouchableOpacity>
            <VideoComponent
              post={values.images?.[0]?.uri}
              isVisible
              isNext={undefined}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={selectAddMedia}
            style={{width: '100%', paddingHorizontal: 15}}>
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
        )} */}

        <View px={25} width="100%" mt={3}>
          <InputBox
            value={values.description}
            placeholder="DESCRIPTION"
            multiLine
            numberOfLines={4}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={touched.description && errors.description}
          />
        </View>
        {/*  dropdown */}
        <View px={25} width="100%" mt={1}>
          <InputBox
            value={values.category}
            placeholder="SELECT A CATEGORY"
            editable={false}
            rightIcon="chevron-down"
            onChangeText={handleChange('category')}
            onBlur={handleBlur('category')}
            onRightPress={catOpen}
            error={touched.category && errors.category}
          />
        </View>
        {/* <View px={25} width="100%" mt={1}>
          <Image
            // key={`${item.name}`}
            source={{ uri: img }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[
              // styles.watchImg,
              { height: 150 },
            ]}
            resizeMode="contain" />
        </View> */}
        <TouchableOpacity
          onPress={selectAddMedia}
          style={{ width: '100%', paddingHorizontal: 25 }}>
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
              Upload Reel
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
        <View flexWrap="wrap" flexDirection="row" px={4}>
          {values.images.length > 0
            ? values.images.map(item => {
              return (
                <View m={1}>
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(item)}
                    style={styles.closeButton}>
                    <Feather name="x" />
                  </TouchableOpacity>
                  {item.type === 'video/mp4' ? (
                    <VideoPlayer
                      video={{ uri: item.uri }}
                      login_options_background
                      volume={0}
                      resizeMode="cover"
                      style={[styles.img, { width: 150 }]}
                      thumbnail={{
                        uri: 'https://i.picsum.photos/id/866/1600/900.jpg',
                      }}
                    />
                  ) : null}
                </View>
              );
            })
            : null}
        </View>
        <View
          bg={useColorModeValue(
            theme.colors.appWhite[700],
            theme.colors.black[2000],
          )}
          px={10}
          width="100%"
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
              if (!isSubmitting) handleSubmit();
            }}>
            {isSubmitting ? (
              <Spinner />
              // <Spinner mb={20} mt={20} />
            ) : (
              <SubTitle
                style={styles.customer}
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
                fontSize={14}>
                Submit Reel
              </SubTitle>
            )}
          </TouchableOpacity>
        </View>
        <MediaPicker
          options={{ mediaType: 'video', selectionLimit: 1 }}
          ref={mediaPicker}
          title="Use Gallery"
          onSelectImage={onSelectImage}
        />
        <Actionsheet isOpen={isCatOpen} onClose={onCatClose}>
          <Actionsheet.Content>
            <Box justifyContent="center" px={4} py="3" w="100%">
              <Text color="black.900" fontFamily="heading" fontSize="20">
                Please select Category:
              </Text>
            </Box>
            {categories?.data &&
              categories?.data.map(item => {
                return (
                  <Actionsheet.Item
                    py="3"
                    onPress={() => handleCategory(item.name, item.id)}>
                    {item.name}
                  </Actionsheet.Item>
                );
              })}
          </Actionsheet.Content>
        </Actionsheet>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Uploadimg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    // backgroundColor: theme.colors.gray[100],
    width: '100%',
    marginVertical: 20,
  },
  img: {
    height: 80,
    width: 80,
  },
  root: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    paddingBottom: 70,
    width: '100%',
    // height: '100%'
  },
  Outcont: {
    borderRadius: 5,

    borderWidth: 0.5,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  closeButton: {
    backgroundColor: theme.colors.appWhite[600],
    height: 20,
    position: 'absolute',
    right: 3,
    top: 3,
    width: 20,
    borderRadius: 360,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customer: {
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
export default AddReel;
