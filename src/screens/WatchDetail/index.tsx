/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {View, Text, ChevronLeftIcon} from 'native-base';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function WatchDetail() {
  const navigation = useNavigation<RootNavigationType>();
  React.useLayoutEffect(() => {
    const headerLeft = () => (
      <TouchableOpacity activeOpacity={0.9} onPress={navigation.goBack}>
        <ChevronLeftIcon size="8" />
      </TouchableOpacity>
    );

    navigation.setOptions({
      headerShown: true,
      title: 'Watch Name',
      headerTitleAlign: 'center',
      headerLeft,
      headerRight: () => null,
    });
  });
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>WatchDetail</Text>
    </View>
  );
}

export default WatchDetail;
