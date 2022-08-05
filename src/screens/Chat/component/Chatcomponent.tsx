/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {View, Text, ChevronLeftIcon} from 'native-base';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../../theme';
import {Caption, Title} from '../../../components/Typography';
import {DrawerParamList} from '../../../navigation/DrawerMenu';
import {RootStackParamList} from '../../../navigation';
// import useUserInfo from '../../../hooks/useUserInfo';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function Chatcomp() {
  const navigation = useNavigation<RootNavigationType>();
// const user = useUserInfo();
  React.useLayoutEffect(() => {
    const headerLeft = () => (
      <TouchableOpacity activeOpacity={0.9} onPress={navigation.goBack}>
        <ChevronLeftIcon name="edit" />
      </TouchableOpacity>
    );

    navigation.setOptions({
      headerShown: true,
      title: 'Start Chat',
      headerTitleAlign: 'center',
      headerLeft,
      headerRight: () => null,
    });
  });
  return (
    <View>
      <View display="flex" flexDirection="row">
        <View pl={3} style={styles.chatleft}>
          <Text>M</Text>
          <View flexDirection="row">
            <View>
              <Image
                source={require('../../../assets/images/profiles/profile.png')}
              />
            </View>
            <View pl={2} alignSelf="center">
              <Title pr={25}>John Doe</Title>
              <Caption pr={25} color={theme.colors.black[500]}>
                Lorem Ipsum is simply dummy text of dummy text of dummy text of
              </Caption>
            </View>
          </View>
        </View>
        <View style={styles.chatRight}>
          <View flexDirection="row">
            <Caption color={theme.colors.black[100]}>yesterday</Caption>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatleft: {
    width: '80%',
  },
  chatRight: {
    width: '20%',
    textAlign: 'right',
  },
  // Topmain:{
  //   // display:"flex",
  //   // flexDirection:"row",
  //   borderRadius:5,
  // },
});

export default Chatcomp;
