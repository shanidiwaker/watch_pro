/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ChevronLeftIcon,
  Spinner,
  useColorModeValue,
  Divider,
} from 'native-base';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {debounce} from 'lodash';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useQueryClient} from 'react-query';

import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {Caption, Title} from '../../components/Typography';
import Error from '../../components/Error';
import {textEllipsis, timeDiffCalc} from '../../utils';
import {useFetchChats} from '../Chat/Queries/useFetchChats';
import {useProductOperations} from '../ProductDetails/Queries/useProductOperations';
import {useProfileOperations} from '../UserProfile/Queries/useProfileOperations';
import {QueryKeys} from '../../utils/QueryKeys';
import HeaderSimple from '../../components/HeaderSimple';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

export type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UserList'
>;

function UserList(props: ChatScreenProps) {
  const {route} = props;
  const queryClient = useQueryClient();
  const [userLst, setUserList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [query, setQuery] = useState('');
  const navigation = useNavigation<RootNavigationType>();
  const {
    data: chats,
    isLoading,
    error,
    refetch,
  } = useFetchChats(route?.params?.type || '', route?.params?.id);

  const {followUser} = useProfileOperations();
  const handleFollow = async (item: any) => {
    if (route?.params?.title === 'New Message') {
      navigation.navigate('ChatDetails', {
        user_id: item.user_id || item?.User?.id,
        name: item.user_name || item?.User?.username,
        image: item?.User?.image,
      });
      return true;
    }
    await followUser(item.user_id || item.id);
    const cacheKey = [QueryKeys.chats, route?.params?.type];
    queryClient.invalidateQueries(cacheKey);
    return true;
  };

  useEffect(() => {
    if (chats?.data) {
      setUserList(chats?.data);
      setTempList(chats?.data);
    }
  }, [chats?.data]);

  const onChangeSearch = (text: string) => {
    setQuery(text);
    if (!text) {
      console.log('text', text);

      setUserList(tempList);
      return false;
    }
    const tempList1 = JSON.parse(JSON.stringify(tempList));
    const filter = tempList1.filter((x: any) => {
      console.log('x', x);
      // return true;
      return (
        x?.User?.username?.toLowerCase().includes(text.toLowerCase()) ||
        x?.User?.description?.toLowerCase().includes(text.toLowerCase())
      );
    });
    setUserList(filter || null);
    return true;
  };
  if (error) {
    return <Error retry={refetch} />;
  }

  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[2000],
        ),
      }}>
      <HeaderSimple title={route?.params?.title} />
      <View
        style={[
          styles.Main,
          {
            backgroundColor: useColorModeValue(
              theme.colors.appWhite[600],
              theme.colors.black[2000],
            ),
          },
        ]}>
        <View
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          bg={theme.colors.gray[200]}
          ml={2}
          mr={2}
          borderRadius={45}
          p={3}>
          <TextInput
            placeholder="search user"
            style={[
              styles.input,
              {
                color: useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                ),
              },
            ]}
            value={query}
         
            onChangeText={onChangeSearch}
          />
          <TouchableOpacity>
            <IoniconsIcon
              name="send"
              size={15}
              color={theme.colors.gray[400]}
            />
          </TouchableOpacity>
        </View>
        <Divider marginTop={2} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 120}}>
          <View style={styles.Startchat}>
            {userLst.length > 0 &&
              userLst?.map((item: any) => {
                return (
                  <View style={styles.Topmain}>
                    <View style={styles.chatleft}>
                      <View style={styles.leftIcon}>
                        <View
                          mr={2}
                          borderRadius={360}
                          borderWidth={1}
                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          borderColor={useColorModeValue(
                            theme.colors.black[2000],
                            theme.colors.appWhite[600],
                          )}>
                          <Image
                            // eslint-disable-next-line global-require
                            source={{uri: item?.User?.image}}
                            style={styles.img}
                          />
                        </View>
                        <View style={styles.likes}>
                          <Title
                            style={styles.textBolt}
                            color={useColorModeValue(
                              theme.colors.black[2000],
                              theme.colors.appWhite[600],
                            )}>
                            {textEllipsis(item?.User?.username || '', 15)}
                          </Title>
                          <Caption
                            color={useColorModeValue(
                              theme.colors.black[2000],
                              theme.colors.appWhite[600],
                            )}>
                            {item?.User?.description}
                          </Caption>
                        </View>
                      </View>
                    </View>
                    <View style={styles.chatRight}>
                      <View style={styles.rightMes}>
                        <Caption
                          color={useColorModeValue(
                            theme.colors.black[2000],
                            theme.colors.appWhite[600],
                          )}>
                          {item.created_at &&
                            !route?.params?.id &&
                            timeDiffCalc(item.created_at)}
                        </Caption>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleFollow(item);
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
                        {route?.params?.title === 'New Message' ? (
                          <Feather
                            name="send"
                            size={20}
                            color={useColorModeValue(
                              theme.colors.black[2000],
                              theme.colors.appWhite[600],
                            )}
                          />
                        ) : (
                          <Title
                            color={useColorModeValue(
                              theme.colors.black[2000],
                              theme.colors.appWhite[600],
                            )}>
                            {item.is_follow ? 'FOLLOWING' : 'FOLLOW'}
                          </Title>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Main: {
    position: 'relative',
    borderTopWidth: 1,
    // borderColor: theme.colors.black[300],
    // backgroundColor: theme.colors.appWhite[600],
    paddingBottom: 30,
    paddingTop: 17,
    // height: '100%',
    // borderBottomWidth: 1,
    paddingHorizontal: 5,
  },
  input: {
    height: '100%',
    width: '85%',
    marginLeft: 5,
  },
  // follow: {
  //   fontWeight: 'bold',
  //   paddingLeft: 7,
  // },
  chatleft: {
    // width: '80%',
    paddingLeft: 6,
  },
  chatRight: {
    // width: '20%',
    // textAlign: 'right',
  },
  leftIcon: {
    flexDirection: 'row',
  },
  Topmain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
  },
  textBolt: {
    paddingRight: 25,
    fontWeight: 'bold',
  },

  likes: {
    alignSelf: 'center',
    paddingLeft: 5,
  },

  rightMes: {
    flexDirection: 'row',
  },
  // Outcont: {
  //   borderRadius: 5,
  //   borderColor: '#000',
  //   backgroundColor: theme.colors.white,
  // },

  Startchat: {
    // borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 15,
  },
  img: {height: 60, width: 60, borderRadius: 360},
});

export default UserList;
