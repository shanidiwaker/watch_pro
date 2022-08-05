/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import {View, useColorModeValue, Spinner} from 'native-base';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ToggleSwitch from 'toggle-switch-react-native';
import {useDispatch} from 'react-redux';
import {RootStackParamList} from '../../navigation';
import {DrawerParamList} from '../../navigation/DrawerMenu';
import {theme} from '../../theme';
import {SubTitle, Title} from '../../components/Typography';
import {useProfile} from '../Me/Queries/useProfile';
import {useEditProfile} from '../EditUser/Queries/useEditProfile';
import HeaderSimple from '../../components/HeaderSimple';
import FieldComponent from '../EditProfile/FieldComponent';
import {useConfirmModal} from '../../components/CofirmationModel';
import {useAccountOperations} from '../Settings/Queries/useAccountOperations';
import {userLogout} from '../../redux/reducers/user/UserActions';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function AccountSettings() {
  const {data: profile, isLoading} = useProfile();
  const {t} = useTranslation();
  const [isUpdating, setUpdating] = useState<string>('');
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();

  const {cancelAccount} = useAccountOperations();
  const [value, setValue] = React.useState(false);
  const LogOut = () => dispatch(userLogout());

  const navigation = useNavigation<RootNavigationType>();

  const confirm = useConfirmModal();
  const {updateProfile} = useEditProfile();

  const handleCancel = () => {
    confirm?.show?.({
      title: <Title fontSize={18}>Confirmation</Title>,
      message: <SubTitle>Do you want to cancel your account?</SubTitle>,
      cancelLabel: 'No',
      onConfirm: async () => {
        const response = await cancelAccount();
        if (response?.data?.message === 'Account Deleted Successfully!!') {
          LogOut();
        }
      },
      submitLabel: 'Yes',
    });
  };
  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  const updateField = async (field: string, which: string) => {
    setUpdating(which);
    let username = profile?.User?.username || '';
    let mobile_number = profile?.User?.mobile_number?.toString() || '';
    let email = profile?.User?.email || '';
    switch (which) {
      case 'Name':
        username = field;
        break;
      case 'Mobile':
        mobile_number = field;
        break;
      case 'Email':
        email = field;
        break;
      default:
        break;
    }

    const initialValues = {
      username,
      mobile_number,
      email,
      from: 'profile',
    };

    await updateProfile(initialValues);
    setUpdating('');
  };

  const onToggle = () => {
    setValue(!value);
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        paddingTop: inset.top,
          backgroundColor: useColorModeValue(
          theme.colors.appWhite[600],
          theme.colors.black[200],
        ),
      }}>
      <HeaderSimple title="Account Settings" />
      <ScrollView
        style={{
          backgroundColor: useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          ),
        }}
        showsVerticalScrollIndicator={false}>
        <View
          flexDirection="row"
          pl={4}
          pr={4}
          justifyContent="space-between"
          mt={2}
          bg={useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[200],
          )}>
          <View width="100%" mb={10}>
            <FieldComponent
              title="Mobile"
              value={
                (profile && profile?.User?.mobile_number?.toString()) || ''
              }
              updateField={updateField}
              isUpdating={isUpdating}
            />
            <FieldComponent
              title="Password"
              value="Set"
              isEditable={false}
              onPress={() => {
                navigation.navigate('ResetPassword', {
                  otp: '12345678',
                  username: (profile && profile?.User?.username) || '',
                });
              }}
            />
          </View>
        </View>
        <View pl={4} pr={4} mb={10}>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={3}
            mb={2}
            borderRadius={2}
            bg={useColorModeValue(
              theme.colors.gray[100],
              theme.colors.black[200],
            )}
            borderColor={theme.colors.gray[400]}
            borderWidth={0.5}>
            <View flexDirection="row" alignItems="center">
              <SubTitle
                color={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}
                fontWeight="600"
                ml={3}
                fontSize={14}>
                Save Login Info
              </SubTitle>
            </View>

            <ToggleSwitch
              isOn={value}
              onColor="green"
              offColor={theme.colors.gray[400]}
              labelStyle={styles.toggleStyle}
              size="medium"
              onToggle={onToggle}
            />
          </View>
        </View>
        <View pl={4} pr={4}>
          <TouchableOpacity onPress={handleCancel}>
            <FieldComponent
              title="Account Cancellation"
              value=""
              isEditable={false}
              onPress={handleCancel}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  toggleStyle: {color: theme.colors.black[200], fontWeight: '900'},

  // render list
});
export default AccountSettings;
