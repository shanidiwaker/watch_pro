/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {View, Divider, useColorModeValue, Spinner} from 'native-base';
import {
  Image,
  ImageBackground,
  Keyboard,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View as RNView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import MasonryList from '@react-native-seoul/masonry-list';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {Caption, SubTitle, Title} from '../../components/Typography';
import {ICommon, useProfile} from './Queries/useProfile';
import {WatchItem} from '../../components/WatchItem';
import {useProductOperations} from '../Home/Queries/useProductOperations';
import {IProducts} from '../Home/Queries/useFetchProducts';
import useUserInfo from '../../hooks/useUserInfo';
import {useConfirmModal} from '../../components/CofirmationModel';
import MediaPicker, {
  IAssetType,
  PickerHandle,
} from '../../components/MediaPicker';
import {IMedia} from '../Add';
import {validateImage} from '../../utils/validator';
import {useEditProfile} from '../EditUser/Queries/useEditProfile';
import {textEllipsis} from '../../utils';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function Me() {
  const {data: profile, isLoading} = useProfile();
  const {t} = useTranslation();
  const [renderData, setRenderData] = useState<ICommon[] | null>();
  const [selected, setSelected] = useState('post');
  const [cover, setCover] = useState(null);
  const coverPicker = React.useRef<PickerHandle>(null);
  const navigation = useNavigation<RootNavigationType>();
  const inset = useSafeAreaInsets();
  const {likePeoduct, deleteProduct: productDelete} = useProductOperations();
  const {user} = useUserInfo();
  const confirm = useConfirmModal();
  const {updateProfile} = useEditProfile();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setSelected('post');
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isLoading) {
      setRenderData(profile?.Post);
    }
  }, [isLoading, profile?.Post]);

  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }
  const handleLike = async (id: number) => {
    await likePeoduct(id);
  };
  const handleUserFollower = async () => {
    navigation.navigate('UserList', {
      type: 'user_follower',
      title: 'Followers',
      id: user?.id,
    });
  };

  const handleUserFollowing = async () => {
    navigation.navigate('UserList', {
      type: 'user_following',
      title: 'Following',
      id: user?.id,
    });
  };
  const handleSetting = () => {
    navigation.navigate('Settings');
  };

  const deleteProduct = (id: number) => {
    confirm?.show?.({
      title: <Title fontSize={18}>Confirm</Title>,
      message: <SubTitle>Are you sure want to delete this product?</SubTitle>,
      onConfirm: () => {
        productDelete(id);
      },
      submitLabel: 'Yes',
      cancelLabel: 'No',
    });
  };

  const editProduct = (id: number) => {
    navigation.navigate('EditProduct', {id});
  };

  const onSelectCoverMedia = () => {
    coverPicker.current?.onPickerSelect();
    Keyboard.dismiss();
  };

  const onSelectCover = async (files: IAssetType[]) => {
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
            const initialValues = {
              image: [{uri: user?.image}],
              cover_photo: tempImages,
              username: profile?.User?.username || '',
              mobile_number: profile?.User?.mobile_number?.toString() || '',
              email: profile?.User?.email || '',
              from: 'profile',
            };

            updateProfile(initialValues);
          }
        }
        return file;
      });
    }
    setCover(tempImages);
  };

  const handleCoverUpload = () => {
    confirm?.show?.({
      title: <Title fontSize={18}>Confirm</Title>,
      message: (
        <SubTitle>Once you select your cover picture will upload?</SubTitle>
      ),
      onConfirm: () => {
        onSelectCoverMedia();
      },
      submitLabel: 'Confirm',
      cancelLabel: 'Cancel',
    });
  };

  const renderItem: ListRenderItem<IProducts> = ({item}) => {
    item.images = item?.image;
    return (
      <WatchItem
        item={item}
        reel={1}
        handleLike={handleLike}
        isOwner
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      />
    );
  };
  return (
    <View
      style={[
        styles.fullScreen,
        {
          paddingTop: inset.top,
          backgroundColor: useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[2000],
          ),
        },
      ]}>
      <ScrollView
        style={{
          backgroundColor: useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          ),
        }}
        showsVerticalScrollIndicator={false}>
        <RNView style={styles.coverWrapper}>
          <View style={styles.bgImg}>
            <FastImage
              source={{
                // uri: user?.cover_photo,
                uri:
                  user?.cover_photo ||
                  'https://www.freeiconspng.com/thumbs/camera-icon/camera-icon-21.png',
                // 'https://www.aphki.or.id//post/avatar.png',
              }}
              style={[
                styles.bgImg,
                {
                  position: 'absolute',
                },
              ]}
              resizeMode={user?.cover_photo ? 'cover' : 'contain'}
            />
            <TouchableOpacity
              style={styles.coverText}
              onPress={handleCoverUpload}>
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
            <FastImage
              source={{
                uri:
                  user?.image ||
                  'https://www.freeiconspng.com/thumbs/camera-icon/camera-icon-21.png',
              }}
              style={styles.img}
            />
          </RNView>
        </RNView>

        <View
          flexDirection="row"
          pl={4}
          pr={2}
          justifyContent="space-between"
          mt={2}
          bg={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          )}>
          <View>
            <SubTitle
              fontSize={20}
              fontWeight="500"
              color={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}>
              {profile && textEllipsis(profile?.User?.username || '', 15)}
            </SubTitle>
            <Caption
              fontSize={12}
              color={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}>
              UID : {profile && profile?.User?.uid}
            </Caption>
          </View>
          <View
            flexDirection="row"
            alignItems="flex-end"
            px={2}
            bg={useColorModeValue(
              theme.colors.appWhite[600],
              theme.colors.black[200],
            )}>
            <View justifyContent="center" alignItems="center" mr={3}>
              <Caption
                fontSize={16}
                fontWeight="400"
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {(profile && profile.Like) || 0}
              </Caption>
              <Caption
                fontSize={12}
                fontWeight="400"
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {t('profile:like')}
              </Caption>
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={handleUserFollower}>
              <View justifyContent="center" alignItems="center" mr={3}>
                <Caption
                  fontSize={16}
                  fontWeight="400"
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {(profile && profile.Followers) || 0}
                </Caption>

                <Caption
                  fontSize={12}
                  fontWeight="400"
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {t('profile:followers')}
                </Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={handleUserFollowing}>
              <View justifyContent="center" alignItems="center">
                <Caption
                  fontSize={16}
                  fontWeight="400"
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {(profile && profile.Following) || 0}
                </Caption>
                <Caption
                  fontSize={12}
                  fontWeight="400"
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {t('profile:followings')}
                </Caption>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          px={4}
          mt={5}
          mb={5}
          bg={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          )}>
          <Caption
            color={useColorModeValue(
              theme.colors.gray[400],
              theme.colors.gray[200],
            )}>
            {profile?.User?.description}
          </Caption>
        </View>
        <Divider />
        <View px={3} mt={4} flexDirection="row" justifyContent="space-between">
          <TouchableOpacity
            style={styles.followButton}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
            <View
              px={5}
              py={2}
              borderColor={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}
              borderWidth={1}
              borderRadius={2}>
              <Title
                textAlign="center"
                fontWeight="bold"
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {t('profile:editProfile')}
              </Title>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSetting}>
            <View
              px={5}
              py={2}
              borderColor={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}
              borderWidth={1}
              borderRadius={2}>
              <Feather
                name="settings"
                size={20}
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View mt={3}>
          <View
            flexDirection="row"
            flex={1}
            py={3}
            justifyContent="center"
            bg={useColorModeValue(
              theme.colors.gray[100],
              theme.colors.black[2000],
            )}
            mb={3}>
            <TouchableOpacity
              onPress={() => {
                setRenderData(profile?.Post);
                setSelected('post');
              }}>
              <View
                px={5}
                borderBottomWidth={selected === 'post' ? 1 : 0}
                borderBottomColor={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}>
                <Caption
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {t('profile:posts')}
                </Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected('collects');
                setRenderData(profile?.Collects ? profile?.Collects : []);
              }}>
              <View
                px={5}
                borderBottomWidth={selected === 'collects' ? 1 : 0}
                borderBottomColor={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}>
                <Caption
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {t('profile:collects')}
                </Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRenderData(profile?.Likes);
                setSelected('likes');
              }}>
              <View
                px={5}
                borderBottomWidth={selected === 'likes' ? 1 : 0}
                borderBottomColor={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}>
                <Caption
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  {t('profile:like')}
                </Caption>
              </View>
            </TouchableOpacity>
          </View>
          <MasonryList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<View />}
            contentContainerStyle={[
              styles.container,
              {
                backgroundColor: useColorModeValue(
                  theme.colors.appWhite[600],
                  theme.colors.black[2000],
                ),
              },
            ]}
            numColumns={2}
            data={renderData || []}
            renderItem={renderItem}
            ListEmptyComponent={
              <View justifyContent="center" alignItems="center" mt={10} pb={10}>
                <Caption
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  No products added
                </Caption>
              </View>
            }
          />
        </View>
        <MediaPicker
          options={{mediaType: 'photo', selectionLimit: 1}}
          ref={coverPicker}
          onSelectImage={onSelectCover}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    // paddingTop: 10,
  },
  container: {
    alignSelf: 'stretch',
    paddingBottom: 20,
  },
  bgImg: {
    width: '100%',
    height: 160,
    alignSelf: 'flex-end',
    // justifyContent: 'center',
  },
  img: {
    height: 96,
    width: 96,
    borderRadius: 360,
    backgroundColor: theme.colors.appWhite[600],
  },
  coverText: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    justifyContent: 'center',
  },
  followButton: {
    width: '80%',
  },
  coverWrapper: {width: '100%', height: 208},
  avatarWrapper: {marginTop: -48, paddingLeft: 10},

  // render list
});
export default Me;
