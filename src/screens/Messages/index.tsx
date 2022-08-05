/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {View, useColorModeValue, Spinner, Divider} from 'native-base';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {Caption, Title} from '../../components/Typography';
import {useMessageCounts} from './Queries/useMessageCounts';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function Messages() {
  const navigation = useNavigation<RootNavigationType>();
  const {data: counts, isLoading} = useMessageCounts();
  const inset = useSafeAreaInsets();

  const handleSupport = () => {
    navigation.navigate('Support');
  };
  const handleUserList = async () => {
    navigation.navigate('UserList', {
      type: 'all',
      title: 'New Message',
      id: 0,
    });
  };

  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }
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
        contentContainerStyle={{
          height: '100%',
          backgroundColor: useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[2000],
          ),
        }}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          height={50}
          px={3}
          bg={useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[200],
          )}>
          <View />
          <View>
            <Title
              color={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}
              fontSize={20}>
              Messages
            </Title>
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={handleUserList}>
            <View>
              <Feather
                name="edit"
                size={24}
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Divider bg={theme.colors.gray[400]} />

        <View style={styles.Main}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', {type: 'likes'})}>
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
              <View>
                <View style={styles.leftIcon}>
                  <View
                    style={[
                      styles.outer,
                      {
                        backgroundColor: useColorModeValue(
                          theme.colors.black[2000],
                          theme.colors.appWhite[600],
                        ),
                      },
                    ]}>
                    <View
                      style={[
                        styles.heart,
                        {
                          borderColor: useColorModeValue(
                            theme.colors.appWhite[600],
                            theme.colors.black[2000],
                          ),
                        },
                      ]}>
                      <View>
                        <Feather
                          size={16}
                          color={useColorModeValue(
                            theme.colors.appWhite[600],
                            theme.colors.black[2000],
                          )}
                          name="heart"
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.likes}>
                    <Caption
                      style={styles.textBolt}
                      color={useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      )}>
                      Likes & Collects
                    </Caption>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.rightMes}>
                  <Caption
                    style={styles.rightIcon}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}>
                    {counts && counts.likes_collects}
                  </Caption>

                  <Feather
                    size={16}
                    style={styles.Fbolt}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}
                    name="chevron-right"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', {type: 'follower'})}>
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
              <View>
                <View style={styles.leftIcon}>
                  <View
                    style={[
                      styles.outer,
                      {
                        backgroundColor: useColorModeValue(
                          theme.colors.black[2000],
                          theme.colors.appWhite[600],
                        ),
                      },
                    ]}>
                    <View
                      style={[
                        styles.heart,
                        {
                          borderColor: useColorModeValue(
                            theme.colors.appWhite[600],
                            theme.colors.black[2000],
                          ),
                        },
                      ]}>
                      <View>
                        <Feather
                          size={16}
                          color={useColorModeValue(
                            theme.colors.appWhite[600],
                            theme.colors.black[2000],
                          )}
                          name="user"
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.likes}>
                    <Title
                      style={styles.textBolt}
                      color={useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      )}>
                      New Followers
                    </Title>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.rightMes}>
                  <Caption
                    style={styles.rightIcon}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}>
                    {counts && counts.new_followers}
                  </Caption>

                  <Feather
                    size={16}
                    style={styles.Fbolt}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}
                    name="chevron-right"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', {type: 'comments'})}>
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
              <View style={styles.leftIcon}>
                <View
                  style={[
                    styles.outer,
                    {
                      backgroundColor: useColorModeValue(
                        theme.colors.black[2000],
                        theme.colors.appWhite[600],
                      ),
                    },
                  ]}>
                  <View
                    style={[
                      styles.heart,
                      {
                        borderColor: useColorModeValue(
                          theme.colors.appWhite[600],
                          theme.colors.black[2000],
                        ),
                      },
                    ]}>
                    <View>
                      <Feather
                        size={16}
                        color={useColorModeValue(
                          theme.colors.appWhite[600],
                          theme.colors.black[2000],
                        )}
                        name="message-square"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.likes}>
                  <Title
                    style={styles.textBolt}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}>
                    Comments &@
                  </Title>
                </View>
              </View>
              <View>
                <View style={styles.rightMes}>
                  <Caption
                    style={styles.rightIcon}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}>
                    {counts && counts.comment}
                  </Caption>

                  <Feather
                    size={16}
                    style={styles.Fbolt}
                    color={useColorModeValue(
                      theme.colors.black[2000],
                      theme.colors.appWhite[600],
                    )}
                    name="chevron-right"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Divider bg={theme.colors.gray[400]} />
      </ScrollView>
      <View style={styles.Topcus}>
        <View style={styles.contact}>
          <TouchableOpacity
            onPress={handleSupport}
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
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    // paddingTop: 10,
  },
  Main: {
    // position: 'relative',
    // borderTopWidth: 1,

    paddingBottom: 30,
    paddingTop: 17,
    // borderBottomWidth: 1,
  },
  heart: {
    borderWidth: 1,

    flexDirection: 'row',
    // borderRadius: 50,
    // padding: 7,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 360,
  },
  outer: {
    padding: 4,
    width: 45,
    height: 45,
    borderRadius: 360,
  },
  leftIcon: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  Topmain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 5,
    borderRadius: 5,
  },
  textBolt: {
    fontWeight: 'bold',
  },
  Fbolt: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  likes: {
    alignSelf: 'center',
    paddingLeft: 5,
  },
  rightIcon: {
    marginRight: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  rightMes: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  Topcus: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    width: '100%',
  },
  contact: {
    width: '100%',
  },
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
});

export default Messages;
