import React, { useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native'

import Video from 'react-native-video';
import { AppContext } from '../Context';
import CommonStyle from '../Theme/CommonStyle';
import { width } from '../constants';
import { VolumeButton } from './AppButton';

const styles = StyleSheet.create({
  videoView: {
    width,
    opacity: 1,
  },
  videoOuter: {
    width,
    ...CommonStyle.center,
  },
});

function VideoComponent({ post, isVisible, isNext, }) {
  const { displayHeight } = useContext(AppContext);
  const { isMute } = useContext(AppContext);
  const videoRef = useRef(null);
  const { videoOuter, videoView } = styles;

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      // videoRef.current.seek(0);
    }
  }, [isVisible, isNext]);

  const videoError = error => {
    // Manage error here
  };

  return (
    <View style={[videoOuter, { height: displayHeight }]}>
      <Video
        ref={videoRef}
        fullscreenAutorotate
        source={{ uri: post }}
        autoPlay
        repeat
        onError={videoError}
        resizeMode='contain'
        volume={10}
        muted={(!isVisible && true) || isMute}
        style={[videoView, { height: Dimensions.get('window').height }]}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch='ignore'
      />
      <VolumeButton />
    </View>
  );
};

export { VideoComponent };
