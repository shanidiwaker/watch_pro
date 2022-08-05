/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Box,
  View,
  IconButton,
  IIconButtonProps,
  useColorModeValue,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {theme} from '../../theme';
import {Caption} from '../../components/Typography';

function TabIcon(props: IIconButtonProps) {
  return (
    <IconButton
      {...props}
      _pressed={{
        bg: 'transparent',
        _icon: {
          color: theme.colors.white,
        },
      }}
    />
  );
}

function CustomTabBar(props: BottomTabBarProps) {
  const {state, descriptors, navigation} = props;
  const {t} = useTranslation();

  const tabItems = state.routes.map((route, index) => {
    const {options} = descriptors[route.key];

    const isFocused = state.index === index;
    const ICONS: any = {
      Home: (
        <View justifyContent="center" alignItems="center">
          <AntDesign
            name="home"
            size={24}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            style={{opacity: isFocused ? 1 : 0.5}}
          />
          <Caption
            fontSize={11}
            mt={1}
            opacity={isFocused ? 1 : 0.5}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}>
            {t('menu:home')}
          </Caption>
        </View>
      ),
      Shop: (
        <View justifyContent="center" alignItems="center">
          <FeatherIcon
            name="shopping-bag"
            size={24}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            style={{opacity: isFocused ? 1 : 0.5}}
          />
          <Caption
            fontSize={11}
            mt={1}
            opacity={isFocused ? 1 : 0.5}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}>
            {t('menu:shop')}
          </Caption>
        </View>
      ),
      Messages: (
        <View justifyContent="center" alignItems="center">
          <Ionicons
            name="mail-outline"
            size={24}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            style={{opacity: isFocused ? 1 : 0.5}}
          />
          <Caption
            fontSize={11}
            mt={1}
            opacity={isFocused ? 1 : 0.5}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}>
            {t('menu:messages')}
          </Caption>
        </View>
      ),
      Me: (
        <View justifyContent="center" alignItems="center">
          <Ionicons
            name="person-outline"
            size={24}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            style={{opacity: isFocused ? 1 : 0.5}}
          />
          <Caption
            fontSize={11}
            mt={1}
            opacity={isFocused ? 1 : 0.5}
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}>
            {t('menu:me')}
          </Caption>
        </View>
      ),
    };
    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({
          name: route.name,
          merge: true,
          params: route.params,
        });
      }
    };

    const onLongPress = () => {
      navigation.emit({type: 'tabLongPress', target: route.key});
    };

    return (
      <View key={route.key} style={styles.iconContainer}>
        <TabIcon
          p={3}
          key={route.key}
          _icon={{
            color: 'red',
          }}
          icon={ICONS[route.name]}
          accessibilityRole="button"
          accessibilityState={isFocused ? {selected: true} : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          borderRadius="full"
          onLongPress={onLongPress}
        />
      </View>
    );
  });

  const addPostTab = (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Add');
      }}
      key="AddNew"
      style={[
        styles.iconContainer,
        {
          backgroundColor: useColorModeValue(
            theme.colors.black[2000],
            theme.colors.appWhite[600],
          ),
          borderRadius: 360,
          padding: 5,
        },
      ]}>
      <View
        m={1}
        borderColor={useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[2000],
        )}
        borderWidth={1}
        borderRadius={360}
        style={{padding: 4, paddingVertical: 4}}>
        <MaterialCommunityIcons
          name="plus"
          color={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[2000],
          )}
          size={20}
        />
      </View>
      {/* <TabIcon
        shadow={5}
        variant="solid"
        colorScheme="danger"
        _icon={{color: theme.colors.white}}
        icon={<MaterialCommunityIcons name="plus" size={20} />}
        accessibilityRole="button"
        borderRadius="full"
      /> */}
    </TouchableOpacity>
  );

  tabItems.splice(2, 0, addPostTab);

  return (
    <Box safeAreaBottom shadow={5} style={styles.boxStyle}>
      <View style={styles.container}>{tabItems}</View>
    </Box>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  boxStyle: {justifyContent: 'space-around'},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default CustomTabBar;
