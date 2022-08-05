/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-bind */
import {Spinner, Text, useColorModeValue} from 'native-base';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {GiftedChat, Send, InputToolbar, Bubble} from 'react-native-gifted-chat';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Error from '../../components/Error';
import AppContainer from '../../components/AppContainer';
import {IMessageReponse, useFetchMessages} from './Queries/useFetchMessages';
import {useMessageOperations} from './Queries/useMessageOperations';
import {RootStackParamList} from '../../navigation';
import useUserInfo from '../../hooks/useUserInfo';
import {theme} from '../../theme';
import {Caption} from '../../components/Typography';
import HeaderSimple from '../../components/HeaderSimple';
import {textEllipsis, timeDiffCalc} from '../../utils';

interface IUserChat {
  _id: string;
  name: string;
  avatar: string;
}
export interface IMessageChat {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: IUserChat;
}

export type MessageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChatDetails'
>;

function ChatDetails(props1: MessageScreenProps) {
  const {route} = props1;
  const [chat, setChat] = React.useState<IMessageChat[]>([]);
  const {user} = useUserInfo();
  console.log("user",user)
  const {
    data: messagesList,
    isLoading,
    error,
    refetch,
  } = useFetchMessages(Number(route?.params.user_id), user?.id);
  const {sendMessage} = useMessageOperations();
  const [msg, setMsg] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSend = async (messages: any) => {
    const data = {
      receiver_id: route?.params.user_id,
      message: msg,
    };

    await sendMessage(data);
    setMsg('');
  };

  React.useEffect(() => {
    const interval = setInterval(() => refetch(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [refetch]);
  React.useEffect(() => {
    if (messagesList) {
      const tempList: IMessageChat[] = [];
      messagesList?.data?.map((message: IMessageReponse) => {
        tempList.push({
          _id: message.id,
          text: message.text,
          createdAt: message.created_at,
          user: {
            _id: message.user.id,
            name: message.user.name,
            avatar: message.user.avtar,
          },
        });
        return message;
      });
      setChat(tempList);
    }
  }, [messagesList]);

  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  if (error) {
    return <Error retry={refetch} />;
  }

  const bgColor = useColorModeValue(
    theme.colors.gray[100],
    theme.colors.black[200],
  );

  function renderInput(props: any) {
    return (
      <View style={{padding: 40}}>
        <InputToolbar
          containerStyle={{
            backgroundColor: bgColor,
            color: textColor,
            borderRadius: 10,
          }}
          textInputStyle={[styles.textInput, {color: textColor}]}
          {...props}
        />
      </View>
    );
  }
  function renderSend(props: any) {
    return (
      <Send
        style={{
          marginRight: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...props}>
        <Caption
          style={{
            color: '#fff',
            fontSize: 15,
            marginRight: 10,
            backgroundColor: '#005f7b',
            borderRadius: 22,
            paddingHorizontal: 22,
            paddingVertical: 5,
            right: 5,
            bottom: 10,
          }}>
          Send
        </Caption>
      </Send>
    );
  }
  function renderBubble(props: any) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            borderRadius: 5,
            marginTop: 5,
            width: '70%',
          },
          left: {
            borderRadius: 5,
            marginTop: 5,
            fontSize: 12,
            width: '70%',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',

            fontSize: 10,
          },
          left: {
            color: '#000',
            fontSize: 10,
          },
        }}
      />
    );
  }
  const textColor = useColorModeValue(
    theme.colors.black[2000],
    theme.colors.appWhite[600],
  );
  const textnameColor = useColorModeValue(
    theme.colors.gray[400],
    theme.colors.appWhite[600],
  );
  return (
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[200],
        ),
      }}>
      <HeaderSimple title={route?.params?.name} />
      {/* <AppContainer
        isBack
        isProfile
        isMenu={false}
        shopName={`${route?.params?.name}'s chat`}
        shopImage={route?.params?.image}> */}
      <View style={styles.innerContainer}>
        <FlatList
          data={chat}
          inverted
          showsVerticalScrollIndicator={false}
          // style={{width: 'auto'}}
          renderItem={({item, index}) => {
            console.log(`item`, JSON.stringify(item, null, 2));

            return (
              <View
                style={[
                  styles.container,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    flexDirection:
                      route?.params.user_id !== item?.user?._id
                        ? 'row'
                        : 'row-reverse',
                    alignSelf:
                      route?.params.user_id === item?.user?._id
                        ? 'flex-end'
                        : 'flex-start',
                  },
                ]}>
                <Image
                  source={{uri: item?.user?.avatar}}
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: '#ccc',
                    borderRadius: 360,
                    marginRight:
                      route?.params.user_id !== item?.user?._id ? 10 : 0,
                    marginLeft:
                      route?.params.user_id === item?.user?._id ? 10 : 0,
                  }}
                />

                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign:
                        route?.params.user_id === item?.user?._id
                          ? 'right'
                          : 'left',
                      color: textnameColor,
                    }}>
                    {textEllipsis(item?.user?.name, 15)}
                  </Text>
                  <Text
                    style={{
                      paddingBottom: 10,
                      fontSize: 14,
                      fontWeight: '400',
                      color: textColor,
                      textAlign:
                        route?.params.user_id === item?.user?._id
                          ? 'right'
                          : 'left',
                    }}>
                    {item.text}
                  </Text>
                  <Text style={{fontSize: 13, color: textnameColor}}>
                    {timeDiffCalc(item?.createdAt)}
                  </Text>
                </View>
              </View>
            );
          }}

          // ListHeaderComponent={() => {
          //     return (
          //       )
          // }}
        />
        <View
          style={{
            width: '100%',
            marginTop: 30,
            height: 45,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <View style={{width: '85%'}}>
            <TextInput
              style={{
                backgroundColor: theme.colors.gray[200],
                width: '100%',
                borderRadius: 45,
                height: '100%',
                paddingLeft: 20,
              }}
              value={msg}
              onChangeText={text => {
                setMsg(text);
                // onSend(text);
              }}
              placeholder="Type your message..."
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              ),
              height: 45,
              width: 45,
              borderRadius: 360,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              onSend(msg);
            }}>
            <Feather
              name="send"
              size={20}
              color={useColorModeValue(
                theme.colors.appWhite[600],
                theme.colors.black[2000],
              )}
            />
          </TouchableOpacity>
        </View>
        {/* <GiftedChat
          messages={chat}
          keyboardShouldPersistTaps="never"
          onSend={data => {
            onSend(data);
          }}
          user={{
            _id: 1,
            name: user?.username,
          }}
          alwaysShowSend
          inverted
          scrollToBottom
          showAvatarForEveryMessage
          renderSend={renderSend}
          renderBubble={renderBubble}
          renderInputToolbar={renderInput}
          textInputStyle={[
            styles.textInputStyle,
            {color: textColor, borderColor: bgColor, borderWidth: 1},
          ]}
        /> */}
      </View>
      {/* </AppContainer> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {height: '100%', paddingHorizontal: 0, paddingBottom: 65},
  // fullScreen: {
  //   width: '100%',
  //   height: '100%',
  //   paddingBottom: 25,
  // },
  textInput: {
    // borderRadius: 10,
  },
  // textInputStyle: {
  //   borderWidth: 1,
  //   borderRadius: 45,
  //   paddingLeft: 10,
  //   fontSize: 12,
  //   marginTop: 10,
  // },
  container: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    paddingBottom: 3,
  },
  imagContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  // eslint-disable-next-line react-native/no-color-literals
});

export default ChatDetails;
