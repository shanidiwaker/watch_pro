import React from 'react';
import {View} from 'react-native';
import {FeedFooter} from './FeedFooter';
import {FeedSideBar} from './FeedSideBar';
import {VideoComponent} from './VideoComponent';

function FeedRow({
  item,
  isNext,
  isVisible,
  navigation,
  index,
  handleLike,
  transitionAnimation,
  handleFollow
}) {
  const {images} = item;
  return (
    <View>
      <VideoComponent post={images} isNext={isNext} isVisible={isVisible} />
      {/* <FeedSideBar item={item} animation={transitionAnimation(index)} handleLike={handleLike} navigation={navigation} /> */}
      <FeedFooter
        item={item?.user}
        reelId={item?.id}
        reel={item}
        animation={transitionAnimation(index)}
        handleLike={handleLike}
        navigation={navigation}
        handleFollow={handleFollow}
      />
    </View>
  );
}

export {FeedRow};
