import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Animated,
  Image,
} from 'react-native';
import {AppContext} from '../Context';
import {width, height} from '../constants';
import {AppImages} from '../Theme/AppImages';
import CommonStyle from '../Theme/CommonStyle';

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    minWidth: 100,
    ...CommonStyle.center,
  },
  dot: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  followText: {
    fontSize: 13,
    paddingRight: 10,
    paddingLeft: 2,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  touchArea: {
    width,
    height: height / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteBtn: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mute: {
    height: 20,
    width: 20,
  },
});

function ButtonComponent(props: any) {
  const {title, onPress, style, border, backColor, textColor, isProcessing} =
    props;
  const {outer} = styles;
  const {appTheme} = useContext(AppContext);
  return (
    <TouchableOpacity onPress={onPress} disabled={isProcessing}>
      <View
        style={[
          outer,
          {
            backgroundColor: backColor || appTheme.appTheme,
            borderColor: border || appTheme.border,
          },
          style,
        ]}>
        {(!isProcessing && (
          <Text style={{color: textColor || appTheme.tint}}>{title}</Text>
        )) || <ActivityIndicator color={textColor || appTheme.tint} />}
      </View>
    </TouchableOpacity>
  );
}

function FollowButton({onPress, text = 'Follow', exStyle = {}}) {
  const {appTheme} = useContext(AppContext);
  const {dot, followText} = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: '#fff',
          marginLeft: 10,
          marginBottom: 5,
          borderRadius: 15,
          justifyContent: 'center',alignItems: 'center',
          paddingHorizontal:10,
          paddingVertical:5
        }}>
        {/* <Text style={[dot, {color: appTheme.tint}]}>.</Text> */}
        <Text style={[ {color: '#000',textAlign:'center',width:'100%',}]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function VolumeButton() {
  const {isMute, setIsMute} = useContext(AppContext);
  const [viewAnim] = useState(new Animated.Value(0));

  const onVolumePress = () => {
    setIsMute();
    Animated.timing(viewAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      fadeOut();
    });
  };

  const fadeOut = () => {
    Animated.timing(viewAnim, {
      delay: 500,
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onVolumePress}
      style={styles.touchArea}>
      <Animated.View
        style={[
          styles.muteBtn,
          {
            opacity: viewAnim,
          },
        ]}>
        <Image
          source={(isMute && AppImages.mute) || AppImages.volume}
          style={styles.mute}
          resizeMode="contain"
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

export {ButtonComponent, FollowButton, VolumeButton};
