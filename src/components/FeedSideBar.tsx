import React, {useContext} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppContext} from '../Context';
import {AppImages} from '../Theme/AppImages';
import {width} from '../constants';

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  sideBar: {
    width: 80,
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    alignItems: 'center',
  },
  iconOuter: {
    marginVertical: 8,
  },
  center: {
    alignItems: 'center',
  },
  imageOuter: {
    width,
    justifyContent: 'center',
  },
});

function RenderIcon({obj, onPress, exStyle = {}}) {
  const {appTheme} = useContext(AppContext);
  const {iconOuter, center, icon, text} = styles;
  const {type, imageIcon, size = 30, disText} = obj;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(type)}
      style={iconOuter}>
      <View styles={center}>
        <Image
          source={imageIcon}
          style={[
            icon,
            {
              height: size,
              width: size,
              tintColor: appTheme.tint,
            },
            exStyle,
          ]}
          resizeMode='contain'
        />
        {(disText && (
          <Text style={[text, {color: appTheme.tint}]}>{`${disText}`}</Text>
        )) ||
          null}
      </View>
    </TouchableOpacity>
  );
}

function FeedSideBar({item, animation, handleLike,navigation}) {
  const {appTheme} = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const {sideBar} = styles;
  const {like, liked,comment, id} = item;
  const makeAction = async type => {
    // Here perfom feed action based on Type
    handleLike(id);
  };
  const handleComment = () => {
    navigation.navigate('Comments', {
      id,
    });
  };
  console.log("comment",comment?.length)
    <Animated.View
      style={[
        sideBar,
        {
          bottom: insets.bottom + 10,
        },
        animation,
      ]}>
      <RenderIcon
        obj={{
          imageIcon: AppImages.heart,
          disText: like,
          size: 35,
          type: 'Like',
        }}
        exStyle={{tintColor: (liked && appTheme.red) || appTheme.tint}}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{imageIcon: AppImages.comment, disText: comment?.length?.toString(), type: 'Comment'}}
        onPress={handleComment}
      />
      <RenderIcon
        obj={{imageIcon: AppImages.share, type: 'Share'}}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{imageIcon: AppImages.more, size: 35, type: 'More'}}
        onPress={makeAction}
      />
    </Animated.View>
  );
}

export {FeedSideBar};
