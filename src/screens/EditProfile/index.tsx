/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { View, useColorModeValue, Spinner } from 'native-base';
import {
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View as RNView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../navigation';
import { DrawerParamList } from '../../navigation/DrawerMenu';
import { theme } from '../../theme';
import { Caption } from '../../components/Typography';
import { useProfile } from '../Me/Queries/useProfile';
import useUserInfo from '../../hooks/useUserInfo';
import MediaPicker, {
  IAssetType,
  PickerHandle,
} from '../../components/MediaPicker';
import { IMedia } from '../Add';
import { validateImage } from '../../utils/validator';
import { useEditProfile } from '../EditUser/Queries/useEditProfile';
import HeaderSimple from '../../components/HeaderSimple';
import FieldComponent from './FieldComponent';
import images from '../../assets/images';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function EditProfile() {
  const { data: profile, isLoading } = useProfile();
  const { t } = useTranslation();
  const [cover, setCover] = useState<IMedia[] | null>(null);
  const [isUpdating, setUpdating] = useState<string>('');
  const coverPicker = React.useRef<PickerHandle>(null);
  const profilePicker = React.useRef<PickerHandle>(null);
  const navigation = useNavigation<RootNavigationType>();
  const [uploadingProfile, setUploadingProfile] = useState<boolean>(false);
  const [uploadingCover, setUploadingCover] = useState<boolean>(false);
  const { user } = useUserInfo();
  const { updateProfile } = useEditProfile();
  const inset = useSafeAreaInsets();
  const nameRef = useRef();
  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  const onSelectCoverMedia = () => {
    coverPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };
  const onSelectProfileMedia = () => {
    profilePicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };

  const onSelectCover = async (files: IAssetType[]) => {
    setUploadingCover(true);
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const tempImages: IMedia[] = [];
    if (files.length > 0) {
      const file = files[0];
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

      const initialValues = {
        // image: [{uri: user?.image}],
        cover_photo: tempImages,
        username: profile?.User?.username || '',
        mobile_number: profile?.User?.mobile_number?.toString() || '',
        email: profile?.User?.email || '',
        from: 'profile',
      };
      await updateProfile(initialValues);
    }
    setCover(tempImages);
    setUploadingCover(false);
  };

  const onSelectPic = async (files: IAssetType[]) => {
    setUploadingProfile(true);
    const tempImages: IMedia[] = [];
    if (files.length > 0) {
      const file = files[0];
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

      const initialValues = {
        image: tempImages,
        // cover_photo: tempImages,
        username: profile?.User?.username || '',
        mobile_number: profile?.User?.mobile_number?.toString() || '',
        email: profile?.User?.email || '',
        from: 'profile',
      };
      await updateProfile(initialValues);
    }
    setUploadingProfile(false);
  };

  const updateField = async (field: string, which: string) => {
    setUpdating(which);
    let username = profile?.User?.username || '';
    let mobile_number = profile?.User?.mobile_number?.toString() || '';
    let email = profile?.User?.email || '';
    switch (which) {
      case 'Name':
        username = field;
        break;
      case 'Mobile':
        mobile_number = field;
        break;
      case 'Email':
        email = field;
        break;
      default:
        break;
    }

    const initialValues = {
      username,
      mobile_number,
      email,
      from: 'profile',
    };

    await updateProfile(initialValues);
    setUpdating('');
  };

  const handleOnShop = () => {
    navigation.navigate('createShop');
  };

  console.log('nameRef', nameRef);

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
      <HeaderSimple title="Edit Profile" bg="transparent" />
      <KeyboardAwareScrollView
        style={{
          backgroundColor: useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          ),
        }}
        showsVerticalScrollIndicator={false}>
        <RNView style={styles.coverWrapper}>
          <View style={styles.bgImg}>
            {user?.cover_photo ? <FastImage
              source={{
                uri: user?.cover_photo
              }}
              style={[
                styles.bgImg,
                {
                  position: 'absolute',
                },
              ]}
            /> :
              <FastImage
                source={
                  // images.IMAGE_Gallry
                  { uri: 'https://www.freeiconspng.com/uploads/photo-album-icon-png-14.png', }
                }
                resizeMode='contain'
                style={[
                  styles.bgImg1,
                  {
                    position: 'absolute',
                  },
                ]}
              />}
            {uploadingCover && (
              <View
                width="100%"
                height="100%"
                position="absolute"
                top={0}
                left={0}
                justifyContent="center"
                alignItems="center"
                bg="rgba(0,0,0,0.5)">
                <Spinner />
              </View>
            )}
            <TouchableOpacity
              style={styles.coverText}
              onPress={() => {
                onSelectCoverMedia();
                // navigation.navigate('EditProfile');
              }}>
              <Caption
                color={theme.colors.white}
                mr={5}
                py={2}
                textAlign="right">
                {t('profile:cover')}
              </Caption>
            </TouchableOpacity>
          </View>

          <RNView style={styles.avatarWrapper}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 9999,
                padding: 5,
                backgroundColor: '#000',
                borderRadius: 360,
              }}
              onPress={onSelectProfileMedia}>
              <Feather name="edit-2" color="#fff" />
            </TouchableOpacity>
            {uploadingProfile && (
              <View
                style={styles.img}
                position="absolute"
                top={0}
                left={0}
                justifyContent="center"
                alignItems="center"
                zIndex={9999}
                bg="rgba(0,0,0,0.5)">
                <Spinner />
              </View>
            )}
            {/* <Image
              source={{
                uri: user?.image,
                // 'https://www.aphki.or.id//post/avatar.png',
              }}
              style={styles.img}
            /> */}
            {user?.image ? <FastImage
              source={{
                uri: user?.image
                // ||
                //   'https://www.freeiconspng.com/uploads/user-login-icon-14.png',
              }}
              style={styles.img}
            /> :
              <View style={styles.img}>
                <Feather name="user" size={52} />
              </View>}
          </RNView>
        </RNView>

        <View
          flexDirection="row"
          pl={4}
          pr={4}
          justifyContent="space-between"
          mt={2}
          bg={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          )}>
          <View width="100%" mb={10}>
            <FieldComponent
              title="Name"
              ref={nameRef}
              value={(profile && profile?.User?.username) || ''}
              updateField={updateField}
              isUpdating={isUpdating}
            />

            <FieldComponent
              title="UID"
              isEditable={false}
              value={(profile && profile?.User?.uid) || ''}
              isRight={false}
            />
            <FieldComponent
              title="Email"
              value={(profile && profile?.User?.email) || ''}
              updateField={updateField}
              isUpdating={isUpdating}
            />
            <FieldComponent
              title="Mobile"
              value={
                (profile && profile?.User?.mobile_number?.toString()) || ''
              }
              updateField={updateField}
              isUpdating={isUpdating}
            />
          </View>
        </View>
        <View pl={4} pr={4} mb={10}>
          <FieldComponent
            title="Background Photo"
            value="Set"
            isEditable={false}
            onPress={onSelectCoverMedia}
          />
        </View>
        <View pl={4} pr={4}>
          <FieldComponent
            title="My Shop"
            value="Set"
            isEditable={false}
            onPress={handleOnShop}
          />
        </View>
        <MediaPicker
          options={{ mediaType: 'photo', selectionLimit: 1 }}
          ref={coverPicker}
          onSelectImage={onSelectCover}
        />
        <MediaPicker
          options={{ mediaType: 'photo', selectionLimit: 1 }}
          ref={profilePicker}
          onSelectImage={onSelectPic}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  bgImg: {
    width: '100%',
    height: 200,
    alignSelf: 'flex-end',
    borderWidth: 0.2
    // justifyContent: 'center',
  },
  bgImg1: {
    width: '100%',
    height: 150,
    alignSelf: 'flex-end',
    // borderWidth: 0.2
    // justifyContent: 'center',
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2
  },
  coverText: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    justifyContent: 'center',
  },
  coverWrapper: { width: '100%', height: 250 },
  avatarWrapper: { marginTop: -48, alignSelf: 'center' },

  // render list
});
export default EditProfile;
