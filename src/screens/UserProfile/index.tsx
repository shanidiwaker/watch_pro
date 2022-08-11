/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import {View, Divider, Spinner, useColorModeValue} from 'native-base';
import {
  Image,
  ImageBackground,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import MasonryList from '@react-native-seoul/masonry-list';
import {useQueryClient} from 'react-query';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import Header from '../../components/Header';
import {theme} from '../../theme';
import {Caption, SubTitle, Title} from '../../components/Typography';
import {ICommon, useFetchProfile} from './Queries/useFetchProfile';
import {WatchItem} from '../../components/WatchItem';
import {IProducts} from '../Home/Queries/useFetchProducts';
import {useProductOperations} from '../Home/Queries/useProductOperations';
import {QueryKeys} from '../../utils/QueryKeys';
import {useProfileOperations} from './Queries/useProfileOperations';
import {textEllipsis} from '../../utils';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UserProfile'
>;

function Shop(props: ProfileScreenProps) {
  const {route} = props;
  const navigation = useNavigation<RootNavigationType>();
  const {data: profile, isLoading} = useFetchProfile(route?.params?.user_id);
  const [renderData, setRenderData] = useState<ICommon[] | null>();
  const inset = useSafeAreaInsets();
  const {likePeoduct} = useProductOperations();
  const {followUser} = useProfileOperations();
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!isLoading) {
      setRenderData(profile?.Post);
    }
  }, [isLoading, profile?.Post]);

  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  const handleLike = async (id: number) => {
    await likePeoduct(id);
    const uid = route?.params?.user_id;
    queryClient.invalidateQueries([QueryKeys.userProfile, uid]);
  };

  const handleFollow = async () => {
    await followUser(route?.params?.user_id);
  };
  const handleUserFollower = async () => {
    navigation.navigate('UserList', {
      type: 'user_follower',
      title: 'Followers',
      id: Number(profile?.User?.id) || 0,
    });
  };

  const handleUserFollowing = async () => {
    navigation.navigate('UserList', {
      type: 'user_following',
      title: 'Following',
      id: Number(profile?.User?.id) || 0,
    });
  };
  const renderItem: ListRenderItem<IProducts> = ({item}) => (
    <WatchItem item={item} handleLike={handleLike} />
  );
  return (
    <ScrollView
      style={{
        paddingTop: inset.top,
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[200],
        ),
      }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.bgImg}>
        <FastImage
          style={[styles.bgImg, {position: 'absolute'}]}
          source={{
            uri:
              profile?.User?.cover_photo ||
              profile?.User?.image ||
              'https://i.pinimg.com/originals/db/8b/bc/db8bbc9fc0a03cdc1a218b1455e1f2af.jpg',
          }}
        />
        <Header isBack fromUserProfile isShare />
      </View>
      {/* <ImageBackground
        source={{uri: profile?.User?.cover_photo || profile?.User?.image}}
        style={styles.bgImg}>
      </ImageBackground> */}
      <View mt={-45} px={3}>
        <Image
          source={{
            uri:
              profile?.User?.image ||
              'https://i.pinimg.com/originals/db/8b/bc/db8bbc9fc0a03cdc1a218b1455e1f2af.jpg',
          }}
          style={styles.img}
        />
      </View>
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
              {profile && profile?.Like}
            </Caption>
            <Caption
              fontSize={12}
              fontWeight="400"
              color={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}>
              Likes
            </Caption>
          </View>
          <TouchableOpacity onPress={handleUserFollower}>
            <View justifyContent="center" alignItems="center" mr={3}>
              <Caption
                fontSize={16}
                fontWeight="400"
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {profile && profile.Followers}
              </Caption>
              <Caption
                fontSize={12}
                fontWeight="400"
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                Followers
              </Caption>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUserFollowing}>
            <View justifyContent="center" alignItems="center">
              <Caption
                fontSize={16}
                fontWeight="400"
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {profile && profile.Following}
              </Caption>
              <Caption
                fontSize={12}
                fontWeight="400"
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                Following
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
        <Caption color={theme.colors.gray[400]}>
          {profile?.User?.description ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget blandit euismod netus ornare.'}
        </Caption>
      </View>
      <Divider />
      <View px={4} mt={4} flexDirection="row" justifyContent="space-between">
        <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
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
              fontWeight="600"
              color={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}>
              {profile?.is_follow ? 'FOLLOWING' : 'FOLLOW'}
            </Title>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatDetails', {
              user_id: profile?.User?.id || '',
              name: profile?.User?.username || '',
              image: profile?.User?.image || '',
            });
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
            <FeatherIcon
              name="send"
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
          <TouchableOpacity onPress={() => setRenderData(profile?.Post)}>
            <View px={5}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                Posts
              </Caption>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRenderData([])}>
            <View px={5}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                Videos
              </Caption>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRenderData(profile?.Likes)}>
            <View px={5}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                Likes
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
            <View justifyContent="center" alignItems="center" mt={10}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                Product not found
              </Caption>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  bgImg: {width: '100%', height: 160, paddingTop: 20},
  img: {height: 96, width: 96, borderRadius: 360, borderWidth: 0.5},
  followButton: {
    width: '80%',
  },
  container: {
    alignSelf: 'stretch',
  },
});
export default Shop;
