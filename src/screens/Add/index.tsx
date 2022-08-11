/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  View,
  Text,
  Spinner,
  Actionsheet,
  Box,
  useDisclose,
  useColorModeValue,
  Button,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
  Platform,
  ImageBackground,
  Alert,
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
import { RootNavigationType } from '../Home';
import MediaPicker, {
  IAssetType,
  PickerHandle,
} from '../../components/MediaPicker';
import images from '../../assets/images';
import { useFetchBrands } from './Queries/useFetchBrands';
import { useFetchCategories } from './Queries/useFetchCategories';
import { showSnackbar } from '../../utils/SnackBar';
import { useSubmitProduct } from './Queries/useSubmitProduct';
import useUserInfo from '../../hooks/useUserInfo';
import HeaderSimple from '../../components/HeaderSimple';
import { validateImage } from '../../utils/validator';
import { RootStackParamList } from '../../navigation';
import { useFetchProductDetails } from '../ProductDetails/Queries/useFetchProductDetails';
import { useConfirmModal } from '../../components/CofirmationModel';
import SliderBar from '../../components/SliderBar';
import {
  ColorsActionSheet,
  MaterialActionSheet,
  PriceActionSheet,
  SizeActionSheet,
  WarrantyActionSheet,
} from '../ShopDetail';
import CustomButton from '../../components/CustomButton';

export interface IMedia {
  uri: string;
  name: string;
  type: string;
}

interface MyFormValues {
  name: string;
  brand: string;
  brand_id: string;
  shop_id: string;
  category_id: string;
  price: string;
  sale_price: string;
  description: string;

  size: string;
  material: string;
  warranty: string;
  color: string;

  sizeId: number;
  materialId: number;
  warrantyId: number;
  colorId: number;

  why_choose_watchpro: string;
  shipping_returns: string;
  category: string;
  privacy_policy: string;

  images: IMedia[];
}

export type EditScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProduct'
>;

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

function Add(props: EditScreenProps) {
  const { route } = props;
  const navigation = useNavigation<RootNavigationType>();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isShop, setIsShop] = React.useState(false);
  const {
    isOpen: isCatOpen,
    onOpen: catOpen,
    onClose: onCatClose,
  } = useDisclose();
  const user = useUserInfo();
  const { t } = useTranslation();
  const confirm = useConfirmModal();
  const { data: brands } = useFetchBrands();
  const { data: categories } = useFetchCategories();
  const { createProduct, updateProduct, deleteImages } = useSubmitProduct();
  const { data: product, isLoading } = useFetchProductDetails(route?.params?.id);
  const inset = useSafeAreaInsets();
  const onFocus = useIsFocused();
  React.useLayoutEffect(() => {
    if (onFocus) {
      if (user) {
        if (user?.shop) {
          setIsShop(true);
        } else {
          // navigation.navigate('createShop');
        }
      }
    }
  }, [navigation, setIsShop, user, onFocus]);
  const initialValues = {
    images: [],
    name: product?.name || '',
    price: product?.price.toString() || '',
    brand: product?.brand || '',
    sale_price: product?.sale_price || '',
    description: product?.description || '',
    size: product?.size || '',
    material: product?.material || '',
    warranty: product?.warranty || '',
    why_choose_watchpro: product?.why_choose_watchpro || '',
    shipping_returns: product?.shipping_returns || '',
    privacy_policy: product?.privacy_policy || '',
    category: product?.category_id || '',
    shop_id: user?.shop?.id || '',
    color: product?.color || '',
    colorId: product?.colorId || 0,
    materialId: product?.materialId || 0,
    warrantyId: product?.warrantyId || 0,
    sizeId: product?.sizeId || 0,
    brand_id: product?.brand_id,
    type: 0,
  };

  const onSubmit = async (values: any) => {
    if (route?.params?.id > 0) {
      await updateProduct(values, route?.params?.id);
    } else if (values.images.length > 0) {
      values.shop_id = user?.shop?.id;
      await createProduct(values);
    } else {
      Alert.alert('Alert', 'Please enter at least one image.');
    }
  };
  const {
    isOpen: isSizeOpen,
    onOpen: onSizeOpen,
    onClose: onCloseSize,
  } = useDisclose();
  const {
    isOpen: isColorsOpen,
    onOpen: onColorsOpen,
    onClose: onCloseColors,
  } = useDisclose();
  const {
    isOpen: isMaterialOpen,
    onOpen: onMaterialOpen,
    onClose: onCloseMaterial,
  } = useDisclose();
  const {
    isOpen: isWarrantyOpen,
    onOpen: onWarrantyOpn,
    onClose: onCloseWarranty,
  } = useDisclose();

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
  // React.useEffect(() => {
  //   if (product && route?.params?.id) {
  //     //
  //     setFieldValue('name', product?.name);
  //     setFieldValue('price', Math.ceil(product?.price).toString());
  //     setFieldValue('sale_price', Math.ceil(product?.sale_price).toString());
  //     setFieldValue('description', product?.description);
  //     setFieldValue('size', product?.size);
  //     setFieldValue('material', product?.material);
  //     setFieldValue('warranty', product?.warranty);
  //     setFieldValue('why_choose_watchpro', product?.why_choose_watchpro);
  //     setFieldValue('shipping_returns', product?.shipping_returns);
  //     setFieldValue('privacy_policy', product?.privacy_policy);
  //     setFieldValue('shop_id', product?.shop_id);
  //     setFieldValue('color', product?.color);
  //     setFieldValue('brand', product?.brand);
  //     // setFieldValue('brand_id', product?.brand_id);
  //   }
  // }, [product, route?.params?.id, setFieldValue]);
  React.useEffect(() => {
    if (product) {
      //
      const cate = categories?.data?.filter(x => x.id === product?.category_id);
      setFieldValue('category', cate?.[0]?.name);
    }
  }, [product, categories, setFieldValue]);

  React.useEffect(() => {
    if (product) {
      //
      const brand = brands?.data?.filter(x => x.id === product?.brand?.id);
      setFieldValue('brand', brand?.[0]?.name);
    }
  }, [product, brands, setFieldValue]);

  const mediaPicker = React.useRef<PickerHandle>(null);

  const handleBrand = (selectedBrand: string, id = '') => {
    setFieldValue('brand', selectedBrand);
    setFieldValue('brand_id', id);
    onClose();
  };
  const handleCategory = (selected: string) => {
    setFieldValue('category', selected);
    onCatClose();
  };

  const handleSize = (data: string, id: string) => {
    setFieldValue('size', data);
    setFieldValue('sizeId', id);
    onCloseSize();
  };
  const handleColors = (data: string, id: string) => {
    setFieldValue('color', data);
    setFieldValue('colorId', id);
    onCloseColors();
  };
  const handleMaterial = (data: string, id: string) => {
    setFieldValue('material', data);
    setFieldValue('materialId', id);
    onCloseMaterial();
  };
  const handleWarranty = (data: string, id: string) => {
    setFieldValue('warranty', data);
    setFieldValue('warrantyId', id);
    onCloseWarranty();
  };
  const onSelectImage = async (files: IAssetType[]) => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const images: IMedia[] = [];
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
              images.push({
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
    setFieldValue('images', images);
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

  const handleRemoveImage = (item: IMedia) => {
    const filter = values.images.filter(x => x !== item);
    setFieldValue('images', filter);
  };
  const imageDelete = (id: number) => {
    confirm?.show?.({
      title: <Title fontSize={18}>Confirm</Title>,
      message: <SubTitle>Are you sure want to delete this image?</SubTitle>,
      onConfirm: () => {
        deleteImages(id, route?.params?.id);
      },
      submitLabel: 'Yes',
      cancelLabel: 'No',
    });
  };
  const selectAddMedia = () => {
    mediaPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };
  if (isLoading && route?.params?.id) {
    return <Spinner mb={20} mt={20} />;
  }
  if (!isShop) {
    return (
      <ImageBackground
        source={images.LOGIN_OPTIONS_BACKGROUND}
        style={styles.alignCenter}>
        <SafeAreaView style={styles.fullScreen}>
          <HeaderSimple
            bg="transparent"
            color={theme.colors.appWhite[600]}
            title={
              route?.params?.id > 0
                ? t('addproduct:screenTitleEdit')
                : t('addproduct:screenTitleAdd')
            }
          />
          <View
            mt={10}
            mb={10}
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center">
            <Title fontSize={20} mb={5} color={theme.colors.appWhite[600]}>
              Please Create Shop First
            </Title>
            <View width="80%">
              <CustomButton
                title="Create Shop"
                offdarckmod
                isTransparent
                isLoading={isSubmitting}
                onPressHandler={() => {
                  navigation.navigate('createShop');
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

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
        bg="transparent"
        title={
          route?.params?.id > 0
            ? t('addproduct:screenTitleEdit')
            : t('addproduct:screenTitleAdd')
        }
      />
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
        {route?.params?.id > 0 ? (
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
              {t('addproduct:screenTitleEdit')} "{product?.name}"
            </Title>
          </View>
        ) : (
          <View style={styles.headiconbox}>
            <View style={styles.header_IconOuter_border}>
              <View style={styles.inner_border}>
                <Feather
                  name="watch"
                  size={40}
                  style={styles.headericon}
                  color="white"
                />
              </View>
            </View>
          </View>
        )}

        <View px={25} width="100%" mt={3}>
          <InputBox
            value={values.brand}
            placeholder="SELECT A BRAND"
            editable={false}
            rightIcon="chevron-down"
            onChangeText={handleChange('brand')}
            onBlur={handleBlur('brand')}
            onRightPress={onOpen}
            error={touched.brand && errors.brand}
          />
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
          <InputBox
            value={values.name}
            placeholder="PRODUCT NAME"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            error={touched.name && errors.name}
          />

          <InputBox
            value={values.description}
            placeholder="DESCRIPTION"
            multiLine
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={touched.description && errors.description}
          />

          <SliderBar
            placeholder="ENTER PRICE"
            value={values.price}
            onChangeText={(text: string) => {
              setFieldValue('price', text);
            }}
          />
          {touched.price && errors?.price && (
            <Caption style={styles.err_title} numberOfLines={1}>
              {errors?.price}
            </Caption>
          )}
          <SliderBar
            placeholder="SALE PRICE"
            value={values.sale_price}
            onChangeText={(text: string) => {
              setFieldValue('sale_price', text);
            }}
          />
          <InputBox
            value={values.material?.toString()}
            placeholder="MATERIAL"
            // onChangeText={handleChange('material')}
            // error={touched.material && errors.material}

            editable={false}
            rightIcon="chevron-down"
            onChangeText={handleChange('material')}
            onBlur={handleBlur('material')}
            onRightPress={onMaterialOpen}
            error={touched.material && errors.material}
          />
          <InputBox
            value={values.warranty?.toString()}
            placeholder="WARRANTY"
            onChangeText={handleChange('warranty')}
            keyboardType="decimal-pad"
            onRightPress={onWarrantyOpn}
            editable={false}
            rightIcon="chevron-down"
            error={touched.warranty && errors.warranty}
          />
          <InputBox
            value={values.size?.toString()}
            placeholder="SIZE"
            onChangeText={handleChange('size')}
            keyboardType="decimal-pad"
            onRightPress={onSizeOpen}
            editable={false}
            rightIcon="chevron-down"
            error={touched.size && errors.size}
          />
          <InputBox
            value={values.color?.toString()}
            placeholder="COLOR"
            onChangeText={handleChange('color')}
            keyboardType="decimal-pad"
            onRightPress={onColorsOpen}
            editable={false}
            rightIcon="chevron-down"
            error={touched.color && errors.color}
          />
          <InputBox
            value={values.why_choose_watchpro}
            placeholder="WHY CHOOSE WATCHPRO"
            onChangeText={handleChange('why_choose_watchpro')}
            error={touched.why_choose_watchpro && errors.why_choose_watchpro}
          />
          <InputBox
            value={values.shipping_returns}
            placeholder="SHIPPING RETURNS"
            onChangeText={handleChange('shipping_returns')}
            error={touched.shipping_returns && errors.shipping_returns}
          />
          <InputBox
            value={values.privacy_policy}
            placeholder="PRIVACY POLICY"
            onChangeText={handleChange('privacy_policy')}
            error={touched.privacy_policy && errors.privacy_policy}
          />
        </View>

        <MediaPicker
          options={{ mediaType: 'mixed', selectionLimit: 5 }}
          ref={mediaPicker}
          onSelectImage={onSelectImage}
        />
        <TouchableOpacity onPress={selectAddMedia}>
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

        {/* <TouchableOpacity onPress={selectAddMedia}>
          <View style={styles.Uploadmoreimg}>
            <Caption style={{marginHorizontal: 10}}>Add More Photo</Caption>
            <AntDesign name="plus" size={30} />
          </View>
        </TouchableOpacity> */}

        <View flexWrap="wrap" flexDirection="row" px={4}>
          {product && product?.images?.length > 0
            ? product?.images.map((item: any) => {
              return (
                <View m={1}>
                  <TouchableOpacity
                    onPress={() => imageDelete(item.id)}
                    style={styles.closeButton}>
                    <Feather name="x" />
                  </TouchableOpacity>
                  {item.image?.split('.').reverse()[0] === 'mp4' ? (
                    <VideoPlayer
                      video={item.image}
                      login_options_background
                      volume={0}
                      resizeMode="cover"
                      style={[styles.img, { width: 150 }]}
                      thumbnail={{
                        uri: 'https://i.picsum.photos/id/866/1600/900.jpg',
                      }}
                    />
                  ) : (
                    <Image source={{ uri: item.image }} style={styles.img} />
                  )}
                </View>
              );
            })
            : null}
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
                  ) : (
                    <Image source={{ uri: item.uri }} style={styles.img} />
                  )}
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
            ) : (
              <SubTitle
                style={styles.customer}
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
                fontSize={14}>
                Submit Product
              </SubTitle>
            )}
          </TouchableOpacity>
        </View>
        <BrandActionSheet
          handleBrand={handleBrand}
          isOpen={isOpen}
          onClose={onClose}
        />
        {/* <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box justifyContent="center" px={4} py="3" w="100%">
              <Text color="black.900" fontFamily="heading" fontSize="20">
                Please select brand:
              </Text>
            </Box>
            {brands?.data &&
              brands?.data.map(item => {
                return (
                  <Actionsheet.Item
                    py="3"
                    onPress={() => handleBrand(item.name)}>
                    {item.name}
                  </Actionsheet.Item>
                );
              })}
          </Actionsheet.Content>
        </Actionsheet> */}
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
                    onPress={() => handleCategory(item.name)}>
                    {item.name}
                  </Actionsheet.Item>
                );
              })}
          </Actionsheet.Content>
        </Actionsheet>
      </KeyboardAwareScrollView>
      <SizeActionSheet
        handleSelect={handleSize}
        isOpen={isSizeOpen}
        onClose={onCloseSize}
      />
      <ColorsActionSheet
        handleSelect={handleColors}
        isOpen={isColorsOpen}
        onClose={onCloseColors}
      />
      <MaterialActionSheet
        handleSelect={handleMaterial}
        isOpen={isMaterialOpen}
        onClose={onCloseMaterial}
      />
      <WarrantyActionSheet
        handleSelect={handleWarranty}
        isOpen={isWarrantyOpen}
        onClose={onCloseWarranty}
      />
      <ColorsActionSheet
        handleSelect={handleColors}
        isOpen={isColorsOpen}
        onClose={onCloseColors}
      />
    </View>
  );
}

export function BrandActionSheet(props: any) {
  const { isOpen, onOpen, from, onClose, handleBrand } = props;
  const { data: brands } = useFetchBrands();
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box justifyContent="center" px={4} py="3" w="100%">
          <Text
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            fontFamily="heading"
            fontSize="20">
            Please select brand:
          </Text>
        </Box>
        {from === 'filter' && (
          <Actionsheet.Item py="3" onPress={() => handleBrand('')}>
            Show All
          </Actionsheet.Item>
        )}

        {brands?.data &&
          brands?.data.map((item: any) => {
            return (
              <Actionsheet.Item
                py="3"
                onPress={() => handleBrand(item.name, item.id)}>
                {item.name}
              </Actionsheet.Item>
            );
          })}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

const styles = StyleSheet.create({
  headiconbox: {
    height: 140,
    width: '100%',
    backgroundColor: theme.colors.gray[100],
  },
  headericon: {
    margin: 10,
  },
  Uploadimg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    // backgroundColor: theme.colors.gray[100],
    width: 280,
    marginVertical: 20,
  },
  err_title: {
    color: theme.colors.red[900],
    opacity: 0.6,
    letterSpacing: 1,
    fontSize: 12,
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
  root: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    paddingBottom: 70,
    width: '100%',
    // height: '100%'
  },
  alignCenter: { alignItems: 'center' },
  fullScreen: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    backgroundColor: theme.colors.gray[150],
  },
  img: {
    height: 80,
    width: 80,
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
export default Add;
