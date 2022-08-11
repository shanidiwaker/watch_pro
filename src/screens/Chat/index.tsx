/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {View, Spinner, useColorModeValue} from 'native-base';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {Caption, Title} from '../../components/Typography';
import {useFetchChats} from './Queries/useFetchChats';
import Error from '../../components/Error';
import {timeDiffCalc} from '../../utils';
import HeaderSimple from '../../components/HeaderSimple';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

export type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Chat'
>;

function Chat(props: ChatScreenProps) {
  const {route} = props;
  const navigation = useNavigation<RootNavigationType>();
  const {
    data: chats,
    isLoading,
    error,
    refetch,
  } = useFetchChats(route?.params?.type || '', route?.params?.id);
  console.log('chats', JSON.stringify(chats, null, 2));
  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  if (error) {
    return <Error retry={refetch} />;
  }

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: useColorModeValue(
          theme.colors.gray[100],
          theme.colors.black[2000],
        ),
      }}>
      <HeaderSimple title="Start Chat" />

      <View
        style={[
          styles.Main,
          {
            backgroundColor: useColorModeValue(
              theme.colors.gray[100],
              theme.colors.black[2000],
            ),
          },
        ]}>
        <ScrollView style={{paddingBottom: 150}}>
          <View style={styles.Startchat}>
            {/* <View>
              <Caption style={styles.follow}>Following</Caption>
            </View> */}

            {chats &&
              chats?.data?.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatDetails', {
                        user_id: item.user_id || item.id,
                        name: item.user_name || item.username,
                        image: item.image,
                      });
                    }}>
                    <View
                      style={[
                        styles.Topmain,
                        {
                          backgroundColor: useColorModeValue(
                            theme.colors.gray[100],
                            theme.colors.black[200],
                          ),
                        },
                      ]}>
                      <View style={styles.chatleft}>
                        <Caption
                          color={useColorModeValue(
                            theme.colors.black[2000],
                            theme.colors.appWhite[600],
                          )}>
                          {item?.User?.username?.[0] || item?.username?.[0]}
                        </Caption>
                        <View style={styles.leftIcon}>
                          <View
                            mr={2}
                            borderRadius={360}
                            borderWidth={1}
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            borderColor={useColorModeValue(
                              theme.colors.gray[100],
                              theme.colors.black[2000],
                            )}>
                            <Image
                              // eslint-disable-next-line global-require
                              source={{uri: item.image}}
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
                              {item.user_name || item.username}
                            </Title>
                            <Caption
                              color={useColorModeValue(
                                theme.colors.black[2000],
                                theme.colors.appWhite[600],
                              )}>
                              {item.message}
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
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          styles.Topcus,
          {
            backgroundColor: useColorModeValue(
              theme.colors.gray[100],
              theme.colors.black[200],
            ),
          },
        ]}>
        <View style={styles.contact}>
          <TouchableOpacity
            style={[
              styles.Outcont,
              {
                borderWidth: 1,
                borderColor: useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                ),
              },
            ]}>
            <Title
              style={[
                styles.customer,
                {
                  color: useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  ),
                },
              ]}>
              CONTACT CUSTOMER SUPPORT
            </Title>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Main: {
    position: 'relative',
    borderTopWidth: 1,
    borderColor: theme.colors.black[300],
    backgroundColor: theme.colors.appWhite[600],
    paddingBottom: 30,
    paddingTop: 17,
    // height: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  // follow: {
  //   fontWeight: 'bold',
  //   paddingLeft: 7,
  // },
  chatleft: {
    width: '80%',
    paddingLeft: 6,
  },
  chatRight: {
    width: '20%',
    textAlign: 'right',
  },
  leftIcon: {
    flexDirection: 'row',
  },
  Topmain: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 5,
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
  Topcus: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    // backgroundColor: theme.colors.white,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,

    width: '100%',
  },
  contact: {
    width: '100%',
  },
  // Outcont: {
  //   borderRadius: 5,
  //   borderColor: '#000',
  //   backgroundColor: theme.colors.white,
  // },
  Outcont: {
    borderRadius: 5,
    borderWidth: 2,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  customer: {
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  Startchat: {
    // borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 15,
  },
  img: {height: 60, width: 60, borderRadius: 360},
});

export default Chat;
