/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import images from '../../../assets/images';
import {RootStackParamList} from '../../../navigation';
import {theme} from '../../../theme';
import {Caption} from '../../../components/Typography';
import useUserInfo from '../../../hooks/useUserInfo';

export type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  any
>;

function UnSplash() {
  const [progress, setProgress] = useState<number>(0);
  const animate = new Animated.Value(0);
  const navigation = useNavigation<RootNavigationType>();
  // const {isLoggedIn} = useUserInfo();

  useEffect(() => {
    // if (isLoggedIn) {
    // PasscodeAuth.authenticate('to demo this react-native component')
    //   .then((success: any) => {
    //     console.log('success');
    //   })
    //   .catch((error: any) => {
    //     console.log('error',error);
    //   });
    // PasscodeAuth.authenticate('to demo this react-native component')
    //   .then((succ: any) => {
    //     // Success code
    //   })
    //   .catch((err: any) => {
    //     // Failure code
    //   });
    // TouchID.authenticate('', optionalConfigObject)
    //   .then((success: string) => {
    //     navigation.navigate('DrawerMenu');
    //   })
    //   .catch((error: any) => {
    //     // PasscodeAuth.authenticate('to demo this react-native component')
    //     //   .then((succ: any) => {
    //     //     // Success code
    //     //   })
    //     //   .catch((err: any) => {
    //     //     // Failure code
    //     //   });
    //   });
    // navigation.navigate('DrawerMenu');
    // } else {
    onAnimate();
    // }
  }, []);

  useEffect(() => {
    if (progress === 100) {
      navigation.navigate('LoginOptions');
    }
  }, [navigation, progress]);

  const onAnimate = () => {
    animate.addListener(({value}) => {
      setProgress(value);
    });
    Animated.timing(animate, {
      duration: 3000,
      toValue: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ImageBackground
      source={images.UNSPLASH_BACKGROUND}
      style={[style.fullScreen, style.flex]}>
      <StatusBar translucent barStyle="light-content" />

      <View style={style.imgWrapper}>
        <Image source={images.LOGO} style={style.img} />

        <View style={style.loader__wrapper}>
          <View style={style.progressWrapper}>
            <Animated.View style={[{width: `${progress}%`}, style.loader]} />
          </View>
          <Caption
            style={{
              fontWeight: '400',
              fontSize: 12,
              color: theme.colors.appWhite[600],
            }}>
            Loading ..
          </Caption>
        </View>
      </View>
    </ImageBackground>
  );
}

export default UnSplash;

const style = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  flex: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader__wrapper: {marginTop: 85, width: '100%', alignItems: 'center'},
  progressWrapper: {
    width: 165,
    height: 5,
    backgroundColor: theme.colors.appWhite['700'],
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  loader: {
    height: '100%',
    backgroundColor: theme.colors.black['5000'],
  },
  imgWrapper: {width: '70%', alignItems: 'center'},
  img: {width: 285, height: 253, resizeMode: 'contain'},
});
