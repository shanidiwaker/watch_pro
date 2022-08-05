import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useColorModeValue} from 'native-base';
import {AppContext} from '../Context';
import {AppImages} from '../Theme/AppImages';
import CommonStyle from '../Theme/CommonStyle';
import {width} from '../constants';
import {FollowButton} from './AppButton';
import {theme} from '../theme';

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 1000,
    bottom: 0,
    left: 0,
    width,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
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
    marginLeft: 5,
    // backgroundColor: 'red',
  },
  center: {
    alignItems: 'center',
  },
  imageOuter: {
    width,
    justifyContent: 'center',
  },
  searchContainer: {
    // width: '40%',
    height: 32,
    pr: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 45,
  },
});
function RenderIcon({obj, onPress, exStyle = {}}) {
  const {appTheme} = useContext(AppContext);
  const {iconOuter, center, icon, text} = styles;
  const {type, imageIcon, size = 30, disText} = obj;
  console.log('disText', disText);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(type)}
      style={iconOuter}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
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
          resizeMode="contain"
        />
        {(disText && (
          <Text style={[text, {color: appTheme.tint}]}>{`${disText}`}</Text>
        )) ||
          null}
      </View>
    </TouchableOpacity>
  );
}

function FeedFooter({
  item,
  animation,
  handleLike,
  navigation,
  reelId,
  reel,
  handleFollow
}: {
  item: any;
  animation: any;
  navigation: any;
  handleLike: any;
  reelId: any;
  reel: any;
  handleFollow:any
}) {
  const {appTheme} = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const {row, avatar, userDetail, userName, postDetail} = styles;
  const {username: name, image,id:userId} = item;
  const {id, comment, like, liked, description,followed} = reel;
  const [showText, setShowText] = useState(false);
  const [isLike, setIsLike] = useState(liked);
  const [isFollow, setIsFollow] = useState(followed);
  const [likeCount, setLikeCount] = useState(like);

  const onUserProfile = () => {
    // Navigate to user Profile
  };
  const makeAction = async type => {
    // Here perfom feed action based on Type
    handleLike(id);
    setIsLike(type);
    // if (type) {
    //   setLikeCount(like + 1);
    // } else {
    //   setLikeCount(like - 1);
    // }
  };
  const handleComment = () => {
    navigation.navigate('Comments', {
      id: reelId,
    });
  };
  const onFollow = () => {
    handleFollow(userId)
    setIsFollow(!isFollow)
  };

  return (
    <Animated.View
      style={[
        styles.footer,
        {
          marginBottom: insets.bottom + 20,
        },
        animation,
      ]}>
      <View style={[{flexDirection: 'row', alignItems: 'center'}, userDetail]}>
        <TouchableOpacity activeOpacity={0.6} onPress={onUserProfile}>
          <View style={row}>
            <Image
              source={{uri: image}}
              style={[
                avatar,
                {
                  resizeMode: 'contain',
                  backgroundColor: appTheme.border,
                },
              ]}
            />
            <Text
              numberOfLines={1}
              style={[userName, {color: appTheme.tint, fontWeight: '600'}]}>
              {name}
            </Text>
          </View>
        </TouchableOpacity>
        <FollowButton
          text={(isFollow && 'Following') || 'Follow'}
          onPress={onFollow}
        />
      </View>
      <View>
        {description ? (
          <Text style={{color: appTheme.tint}} numberOfLines={2}>
            {!showText ? description.substring(0, 50) : description}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'flex-end',
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
          paddingBottom: 5,
        }}>
        {/* <Text  style={{color: '#fff'}}>05.10</Text> */}
        <TouchableOpacity
          onPress={() => {
            setShowText(!showText);
          }}>
          <Text style={{color: '#fff'}}>{showText ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: useColorModeValue(
                theme.colors.gray[200],
                theme.colors.black[2000],
              ),
            },
          ]}>
          <TouchableOpacity
            onPress={handleComment}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Write your comment...</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <RenderIcon
            obj={{
              imageIcon: AppImages.heart,
              disText: likeCount,
              size: 35,
              type: 'Like',
            }}
            exStyle={{
              tintColor:  (isLike && appTheme.red) || appTheme.tint,
            }}
            onPress={() => makeAction(!isLike)}
          />
          <RenderIcon
            obj={{
              imageIcon: AppImages.comment,
              disText: comment?.length?.toString(),
              type: 'Comment',
            }}
            onPress={() => {
              //
            }}
          />
          <RenderIcon
            obj={{imageIcon: AppImages.share, type: 'Share'}}
            onPress={() => {
              //
            }}
          />
          {/* <RenderIcon
          obj={{imageIcon: AppImages.more, size: 35, type: 'More'}}
          onPress={makeAction}
        /> */}
        </View>
      </View>
    </Animated.View>
  );
}

export {FeedFooter};
