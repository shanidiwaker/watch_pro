import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SubTitle } from '../../../../components/Typography';
import { theme } from '../../../../theme';
import { useDispatch } from 'react-redux';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { userSocialLogin } from '../../../../redux/reducers/user/UserServices';

function SocialMediaLogin() {

    const [state, setState] = useState()
    const dispatch = useDispatch();

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
            await dispatch(
                userSocialLogin({
                    name: userInfo?.user?.name || 'Apple Name',
                    social_id: userInfo?.user?.id,
                    device_id: new Date().getTime()?.toString(),
                    platform: Platform.OS,
                    email: userInfo?.user?.email
                }),
            );

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
            await dispatch(
                userSocialLogin({
                    name: userData?.name || 'Apple Name',
                    social_id: userData?.id,
                    device_id: new Date().getTime()?.toString(),
                    platform: Platform.OS,
                    email: userData?.email
                }),
            );
        }
    }
    // Facebook login end//

    return (
        <View style={style.mainbody}>
            <TouchableOpacity style={style.maincontainet} onPress={signIn}>
                <FontAwesome name="google" color={theme.colors.appWhite[800]} size={30} style={style.vectoticons} />
                <SubTitle style={style.innertext} >Continue With Google</SubTitle>
            </TouchableOpacity>


            <TouchableOpacity style={style.maincontainet} onPress={onFBLogIn}>
                <FontAwesome name="facebook-f" color={theme.colors.appWhite[800]} size={30} style={style.vectoticons} />
                <SubTitle style={style.innertext} >Continue With Facebook</SubTitle>
            </TouchableOpacity>
        </View>


    )
}

export default SocialMediaLogin;
const style = StyleSheet.create({
    maincontainet: {
        borderWidth: 0.6,
        borderColor: theme.colors.appWhite[800],
        width: "80%",
        height: 50,
        borderRadius: 50,
        paddingStart: 15,
        flexDirection: "row",
        margin: 10,
        backgroundColor: theme.colors.gray[50],
        alignItems: "center",
    },
    innertext: {
        color: theme.colors.appWhite[800],
        fontSize: 17,
        textAlign: "center",
    },
    mainbody: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10

    },
    vectoticons: {
        paddingEnd: 20
    }

})