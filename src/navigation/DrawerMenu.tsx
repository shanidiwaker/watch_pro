import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Text, ScrollView, View, Divider} from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeTabs from './HomeTabs';
import {theme} from '../theme';

export type DrawerParamList = {
  HomeTabs: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerWithLogoutButton(props: DrawerContentComponentProps) {
  const {navigation} = props;

  const openUserProfile = () => {
    //
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeAreaView}>
      <TouchableOpacity onPress={() => openUserProfile()}>
        <View style={styles.listView}>
          <View style={styles.profileHeader}>
            <Text noOfLines={1} style={styles.displayName}>
              Riyaz
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider my={1} />
      <View style={styles.mainContainer}>
        <ScrollView {...props} showsVerticalScrollIndicator={false}>
          <DrawerItemList {...props} />
        </ScrollView>
      </View>
      <TouchableOpacity>
        <View style={styles.item}>
          <SimpleLineIcons
            name="logout"
            size={19}
            color={theme.colors.black[900]}
          />
          <Text style={styles.label}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function DrawerScreens() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.appWhite[600],
          width: '75%',
        },
        drawerType: 'front',
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <DrawerWithLogoutButton {...props} />}>
      <Drawer.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 15,
    marginHorizontal: 20,
    color: theme.colors.black[900],
  },

  displayName: {
    fontSize: 17,
    fontFamily: 'DMSans-Medium',
  },

  mainContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  listView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  profileHeader: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 15,
  },
  safeAreaView: {flexGrow: 1},
});
