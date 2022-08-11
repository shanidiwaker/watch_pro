import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, useColorModeValue, View} from 'native-base';
import CustomTabBar from './Components/CustomTabBar';
import Home from '../screens/Home';
import {headerLeft, headerRight} from './Components/Header';
import Shop from '../screens/Shop';
import Messages from '../screens/Messages';
import Me from '../screens/Me';
import {TITLEWIDTH} from '../utils';
import {theme} from '../theme';

export type HomeTabParamList = {
  Home: undefined;
  Shop: undefined;
  Messages: undefined;
  Me: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const options = {
  title: (
    <View backgroundColor="#000">
      <Text>Hello</Text>
    </View>
  ),
  headerTitleAlign: 'center',
  headerLeft,
  headerRight,
  headerShown: false,
  drawerLabel: () => null,
  drawerItemStyle: {height: 0},
};

function HomeTabs() {
  // eslint-disable-next-line no-unused-expressions
  return (
    <Tab.Navigator
      screenOptions={{tabBarHideOnKeyboard: true, ...options}}
      tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Me" component={Me} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
