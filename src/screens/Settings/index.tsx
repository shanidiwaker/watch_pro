/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import {
  View,
  ChevronRightIcon,
  useColorModeValue,
  useColorMode,
} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Rate, {AndroidMarket} from 'react-native-rate';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {
  shopCreateSucess,
  userLogout,
} from '../../redux/reducers/user/UserActions';
import {Caption, SubTitle, Title} from '../../components/Typography';
import useUserInfo from '../../hooks/useUserInfo';
import HeaderSimple from '../../components/HeaderSimple';
import {useConfirmModal} from '../../components/CofirmationModel';
import {useAccountOperations} from './Queries/useAccountOperations';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function Settings() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation<RootNavigationType>();
  const [value, setValue] = React.useState(false);
  const LogOut = () => dispatch(userLogout());
  const user = useUserInfo();
  const {toggleColorMode} = useColorMode();
  const inset = useSafeAreaInsets();
  const {deleteShop} = useAccountOperations();

  const confirm = useConfirmModal();
  const onToggle = () => {
    toggleColorMode();
    setValue(!value);
  };
  const handleAccountSetting = () => {
    navigation.navigate('AccountSettings');
  };

  const henadleGeneralSettings = () => {
    navigation.navigate('GeneralSettings');
  };
  const handleCart = () => {
    navigation.navigate('Cart');
  };
  const handleAbout = () => {
    navigation.navigate('About');
  };
  const handleShop = () => {
    navigation.navigate('createShop');
    return 0;
  };

  const handleSupport = () => {
    navigation.navigate('Support');
  };
  const handleMyOrders = () => {
    navigation.navigate('MyOrders');
  };

  const handleRate = () => {
    const options = {
      AppleAppID: '2193813192',
      GooglePackageName: 'com.kizbin',
      AmazonPackageName: 'com.kizbin',
      OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: Platform.OS === 'ios',
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html',
    };

    Rate.rate(options, (success, errorMessage) => {
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        // this.setState({rated:true})
      }
      if (errorMessage) {
        // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
      }
    });
    // const isAvailable = InAppReview.isAvailable();
    // console.log('isAvailable',isAvailable);

    // if (isAvailable) {
    //   InAppReview.RequestInAppReview();
    // }
  };

  const handleDelete = () => {
    confirm?.show?.({
      title: <Title fontSize={18}>Confirmation</Title>,
      message: <SubTitle>Do you want to cancel your account?</SubTitle>,
      cancelLabel: 'No',
      onConfirm: async () => {
        const response = await deleteShop(user?.shop?.id || 0);
        if (response?.data?.message === 'Shop Deleted Successfully!!') {
          dispatch(shopCreateSucess(null));
        }
      },
      submitLabel: 'Yes',
    });
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        paddingTop: inset.top,
        backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[2000],
        ),
      }}>
      <StatusBar
        barStyle={useColorModeValue('dark-content', 'light-content')}
      />
      <View height="100%">
        <HeaderSimple title={t('settings:title')} />

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
          <TouchableOpacity activeOpacity={0.9} onPress={handleMyOrders}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  {t('settings:myOrders')}
                </Caption>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={handleCart}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  {t('settings:cart')}
                </Caption>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} onPress={handleShop}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  {user?.shop
                    ? t('settings:updateShop')
                    : t('settings:createShop')}
                </Caption>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate('Add')}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  Add Product
                </Caption>
              </View>
            </View>
          </TouchableOpacity>
          {user?.shop ? (
            <TouchableOpacity activeOpacity={0.9} onPress={handleDelete}>
              <View
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
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
                      theme.colors.black[200],
                      theme.colors.appWhite[600],
                    )}
                    fontWeight="400"
                    ml={3}
                    fontSize={14}>
                    Delete Shop
                  </Caption>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity activeOpacity={0.9} onPress={handleAccountSetting}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  {t('settings:accountSettings')}
                </Caption>
              </View>
              <ChevronRightIcon color={theme.colors.gray[400]} size="4" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={henadleGeneralSettings}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  {t('settings:generalSettings')}
                </Caption>
              </View>
              <ChevronRightIcon color={theme.colors.gray[400]} size="4" />
            </View>
          </TouchableOpacity>

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
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}
                fontWeight="400"
                ml={3}
                fontSize={14}>
                {t('settings:darkMode')}
              </Caption>
            </View>

            <ToggleSwitch
              isOn={useColorModeValue('Light', 'Dark') === 'Dark'}
              onColor="green"
              offColor={theme.colors.gray[400]}
              labelStyle={styles.toggleStyle}
              size="medium"
              onToggle={onToggle}
            />
          </View>

          <TouchableOpacity activeOpacity={0.9} onPress={handleSupport}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  {t('settings:support')}
                </Caption>
              </View>
              <TouchableOpacity activeOpacity={0.9}>
                <ChevronRightIcon color={theme.colors.gray[400]} size="4" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} onPress={handleRate}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  {t('settings:rate')}
                </Caption>
              </View>
              <TouchableOpacity activeOpacity={0.9} onPress={handleRate}>
                <ChevronRightIcon color={theme.colors.gray[400]} size="4" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={handleAbout}>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
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
                    theme.colors.black[200],
                    theme.colors.appWhite[600],
                  )}
                  fontWeight="400"
                  ml={3}
                  fontSize={14}>
                  {t('settings:about')}
                </Caption>
              </View>
              <TouchableOpacity activeOpacity={0.9}>
                <ChevronRightIcon color={theme.colors.gray[400]} size="4" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={LogOut}>
            <View
              bg={useColorModeValue(
                theme.colors.black[200],
                theme.colors.gray[100],
              )}
              height={50}
              // mb={50}
              // mx={10}
              justifyContent="center"
              alignItems="center"
              borderRadius={2}
              flexDirection="row">
              <FeatherIcon
                name="lock"
                color={useColorModeValue(
                  theme.colors.appWhite[600],
                  theme.colors.black[200],
                )}
                size={18}
              />
              <Caption
                color={useColorModeValue(
                  theme.colors.appWhite[600],

                  theme.colors.black[200],
                )}
                fontWeight="bold"
                fontSize={14}
                ml={3}>
                {t('settings:logout')}
              </Caption>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {padding: 15},
  toggleStyle: {color: theme.colors.black[200], fontWeight: '900'},
});

export default Settings;
