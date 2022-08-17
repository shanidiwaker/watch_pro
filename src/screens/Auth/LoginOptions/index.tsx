/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Text,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import jwt_decode from "jwt-decode";

import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import images from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import SeparatorLine from '../../../components/SeparatorLine';
import { Caption, SubTitle, Title } from '../../../components/Typography/index';
import { RootStackParamList } from '../../../navigation';
import { theme } from '../../../theme';
import { useConfirmModal } from '../../../components/CofirmationModel';
import { userAppleLogin } from '../../../redux/reducers/user/UserServices';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk';
import { LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

function LoginOptions() {
  const [isChecked, setChecked] = useState<boolean>(false);
  const navigation = useNavigation<RootNavigationType>();
  const inset = useSafeAreaInsets();
  const confirm = useConfirmModal();
  const dispatch = useDispatch();
  const [state, setState] = useState()

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  // Google login//
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setState({ userInfo });
      console.log(userInfo);

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  // Facebook login//
  const fbLogIn = (resCallBack) => {
    LoginManager.logOut()
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('FB result====>>>', result)
        if (result.declinedPermissions && result.declinedPermissions.includes('email')) {
          resCallBack({ message: 'email is required' })
        }
        if (result.isCancelled) {
          console.log("error")
        }
        else {
          const infoRequest = new GraphRequest(
            '/me?fileds=email,name,picture,friend',
            null,
            resCallBack
          );
          new GraphRequestManager().addRequest(infoRequest).start()
        }
      },

      function (error) {
        console.log("login fail with erroe:" + error)
      }
    )
  };
  const onFBLogIn = async () => {
    try {
      await fbLogIn(_responenceInfoCallBack)
    } catch (error) {
      console.log('error raised', error)
    }
  }
  const _responenceInfoCallBack = async (error, result) => {
    if (error) {
      console.log('error top', error)
      return
    } else {
      const userData = result
      console.log("fb data+++", userData)
    }
  }
  // Facebook login end//

  const handleTerm = () => {
    confirm?.show?.({
      title: <Title fontSize={18}>Alert</Title>,
      message: <SubTitle>Please accept terms and conditions.</SubTitle>,

      submitLabel: 'OK',
    });
  };

  const handleCheck = () => {
    setChecked(!isChecked);
  };
  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      console.log(
        'credentialState',
        credentialState,
        appleAuth.State.AUTHORIZED,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        console.log("appleAuthRequestResponse", appleAuthRequestResponse)
        const { email } = await jwt_decode(
          appleAuthRequestResponse.identityToken,
        );
        let name = '';
        if (appleAuthRequestResponse?.fullName?.givenName !== null) {
          name = appleAuthRequestResponse.fullName || null;
        } else {
          const text = email;
          const myArray = text?.split('@');
          // eslint-disable-next-line prefer-destructuring
          name = myArray[0];
          // setNameVisible(true)
        }
        await dispatch(
          userAppleLogin({
            name: name || 'Apple Name',
            social_id: appleAuthRequestResponse.user,
            device_id: new Date().getTime()?.toString(),
            platform: Platform.OS,
            email,
          }),
        );
        // user is authenticated
        // alert(JSON.stringify(appleAuthRequestResponse))
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ImageBackground
      source={images.LOGIN_OPTIONS_BACKGROUND}
      style={[style.fullScreen, style.alignCenter]}>
      <StatusBar translucent barStyle="light-content" />
      <View style={[style.wrapper, { paddingTop: inset.top }, style.justify]}>
        <Caption style={style.headerTitle} numberOfLines={3} lineHeight={40}>
          Choose a <Caption style={style.headerTitleWatch}>watch</Caption> that
          suits you
        </Caption>

        <View style={style.main}>
          <CustomButton
            title="continue"
            isTransparent
            offdarckmod
            onPressHandler={() => {
              if (isChecked) {
                navigation.navigate('Login');
              } else {
                handleTerm();
              }
            }}
          />

          <View style={style.main__checkbox_wrapper}>
            <TouchableOpacity style={style.checkBox} onPress={handleCheck}>
              {isChecked ? (
                <Feather
                  color={
                    isChecked
                      ? theme.colors.white[900]
                      : theme.colors.black[900]
                  }
                  name="check"
                  size={20}
                />
              ) : null}
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                setChecked(!isChecked);
              }}
              style={[style.check, isChecked && style.white]}
            /> */}
            <View>
              <Caption numberOfLines={2} style={style.caption}>
                I have read and agreed to Watch Pro’s
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      'http://watchpro.yourang.io/terms_codition',
                    );
                  }}>
                  <Caption style={style.captiontwo}>
                    Terms and Conditions.
                  </Caption>
                </TouchableOpacity>
              </Caption>
            </View>
          </View>

          <SeparatorLine />
          <GoogleSigninButton
            style={{ width: 192, height: 48, marginTop: 40 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onFBLogIn}
          // disabled={state.isSigninInProgress}
          />
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={onAppleButtonPress}
              style={style.create__wrapper}>
              <Image source={images.APPLE_LOGO} style={style.img} />
              <Caption style={style.create__title}>
                {' '}
                Login Using Apple ID
              </Caption>
              <Image
                source={images.RIGHT_ARROW}
                style={[style.img, style.opacity]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  wrapper: { width: '75%', height: '100%', alignItems: 'center' },
  headerTitle: {
    color: theme.colors.appWhite['700'],
    fontSize: 40,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headerTitleWatch: {
    color: theme.colors.black['100'],
    fontSize: 40,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  checkBox: {
    borderWidth: 1,
    marginTop: 5,
    borderColor: theme.colors.black[900],
    backgroundColor: theme.colors.appWhite[600],
    width: 22,
    height: 22,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: { alignItems: 'center' },
  main: { width: '100%', alignItems: 'center' },
  main__checkbox_wrapper: {
    marginVertical: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  white: { backgroundColor: theme.colors.appWhite['700'] },
  caption: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 15,
    color: theme.colors.appWhite['700'],
    width: '70%',
    flexWrap: 'wrap',
  },
  captiontwo: {
    fontSize: 16,
    // marginLeft: 100,
    // marginTop: 15,
    color: theme.colors.appWhite['700'],
    // width: '70%',
    flexWrap: 'wrap',
  },
  create__wrapper: { flexDirection: 'row', marginTop: 40, alignItems: 'center' },
  create__title: {
    color: theme.colors.appWhite['700'],
    fontSize: 16,
    letterSpacing: 1,
    marginLeft: 8,
  },
  img: { width: 24, height: 24, resizeMode: 'contain' },
  opacity: { opacity: 0.6 },
  justify: { justifyContent: 'space-around' },
});
export default LoginOptions;

