/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import {View, ChevronRightIcon, useColorModeValue, Spinner} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {Caption} from '../../components/Typography';
import HeaderSimple from '../../components/HeaderSimple';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function GeneralSettings() {
  const [value, setValue] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [isClear, setIsClear] = React.useState(false);
  const [cache, setCache] = React.useState(0);
  const {t, i18n} = useTranslation();
  const selectedLngCode = i18n.language;
  const setLng = (lngCode: string) => i18n.changeLanguage(lngCode);
  const {ClearCache: cacheDevice} = NativeModules;
  const inset = useSafeAreaInsets();

  const fetchCachedData = async () => {
    cacheDevice.getAppCacheSize((data: any) => {
      setCache(data);
    });
    const isAutoPlay = await AsyncStorage.getItem('autoPlay');
    console.log('isAutoPlay', isAutoPlay);
    if (isAutoPlay) {
      const isAuto = JSON.parse(isAutoPlay || '');
      setAutoPlay(isAuto || false);
    }
    // clear the storage
    // ClearCache.clearAppCache((data: any) => {
    //   console.log('data,', data);
    // });
  };

  useEffect(() => {
    fetchCachedData();
  }, []);
  const onToggle = () => {
    setValue(!value);
  };

  const onToggleAutoPlay = async () => {
    const isAutoPlay = await AsyncStorage.getItem('autoPlay');
    if (isAutoPlay) {
      const isAuto = JSON.parse(isAutoPlay || '');
      if (isAuto) {
        setAutoPlay(false);
        await AsyncStorage.setItem('autoPlay', '');
      } else {
        setAutoPlay(true);
        await AsyncStorage.setItem(
          'autoPlay',
          JSON.stringify({isAutoPlay: true}),
        );
      }
    } else {
      setAutoPlay(true);
      await AsyncStorage.setItem(
        'autoPlay',
        JSON.stringify({isAutoPlay: true}),
      );
    }
  };

  return (
    <View
      style={{
        marginTop:inset.top,
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[2000],
        ),
        height: '100%',
      }}>
      <HeaderSimple title={t('general:generalHeading')} />
      <ScrollView
        style={[
          styles.root,
          {
            backgroundColor: useColorModeValue(
              theme.colors.appWhite[600],
              theme.colors.black[2000],
            ),
          },
        ]}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          mb={2}
          // mt={10}
          borderRadius={2}
          bg={useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[200],
          )}
          borderColor={theme.colors.gray[400]}
          borderWidth={0.5}>
          <View flexDirection="row" alignItems="center">
            <Caption
              color={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}
              fontWeight="400"
              ml={3}
              fontSize={14}>
              {t('general:doNotAutoRefresh')}
            </Caption>
          </View>
          <ToggleSwitch
            isOn={value}
            onColor="green"
            offColor={theme.colors.gray[400]}
            labelStyle={{color: 'black', fontWeight: '900'}}
            size="medium"
            onToggle={onToggle}
          />
        </View>
        <Caption mb={10}>{t('general:onRelogin')}</Caption>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          mb={2}
          mt={10}
          borderRadius={2}
          bg={useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[200],
          )}
          borderColor={theme.colors.gray[400]}
          borderWidth={0.5}>
          <View flexDirection="row" alignItems="center">
            <Caption
              color={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}
              fontWeight="400"
              ml={3}
              fontSize={14}>
              {t('general:doNotVideo')}
            </Caption>
          </View>
          <ToggleSwitch
            isOn={autoPlay}
            onColor="green"
            offColor={theme.colors.gray[400]}
            labelStyle={styles.toggleStyle}
            size="medium"
            onToggle={onToggleAutoPlay}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          // style={styles.rowStyle}

          onPress={() => setLng(selectedLngCode === 'ch' ? 'en' : 'ch')}>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={3}
            borderRadius={2}
            bg={useColorModeValue(
              theme.colors.gray[100],
              theme.colors.black[200],
            )}
            borderColor={theme.colors.gray[400]}
            borderWidth={0.5}>
            <View flexDirection="row" alignItems="center">
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
                fontWeight="400"
                ml={3}
                fontSize={14}>
                {selectedLngCode === 'ch' ? '中国' : 'English'}
              </Caption>
            </View>
            <View flexDirection="row" alignItems="center">
              <Image
                source={{
                  uri:
                    selectedLngCode === 'ch'
                      ? 'https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg'
                      : 'https://media.istockphoto.com/photos/flag-round-icon-picture-id697849754?k=20&m=697849754&s=170667a&w=0&h=C16f3yna3j84aeF9GAtJ6EIYLkbrH1qhBMYjz6WYzWE=',
                }}
                style={styles.imgFlag}
              />
              <ChevronRightIcon color={theme.colors.gray[400]} size="8" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          // style={styles.rowStyle}

          onPress={() => {
            setIsClear(true);
            cacheDevice.clearAppCache((data: any) => {
              console.log('data,', data);
              setCache(0);
              setIsClear(false);
            });
          }}>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={3}
            mt={10}
            borderRadius={2}
            bg={useColorModeValue(
              theme.colors.gray[100],
              theme.colors.black[200],
            )}
            borderColor={theme.colors.gray[400]}
            borderWidth={0.5}>
            <View flexDirection="row" alignItems="center">
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
                fontWeight="400"
                ml={3}
                fontSize={14}>
                {t('general:clearCache')}
              </Caption>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={styles.rowStyle}>
              {isClear ? (
                <Spinner />
              ) : (
                <Caption>
                  {cache} {cache > 100 ? 'MB' : 'GB'}
                </Caption>
              )}

              <ChevronRightIcon color={theme.colors.gray[400]} size="8" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {backgroundColor: theme.colors.white, padding: 15},
  rowStyle: {flexDirection: 'row', alignItems: 'center'},
  imgFlag: {height: 26, width: 26, borderRadius: 360},
  toggleStyle: {color: theme.colors.black[2000], fontWeight: '900'},
});
export default GeneralSettings;
