import {Divider, useColorModeValue, View} from 'native-base';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import {Caption} from '../Typography';
import images from '../../assets/images';
import {IComment} from '../../screens/ProductDetails/Queries/useFetchProductDetails';
import {timeDiffCalc} from '../../utils';
// import useUserInfo from '../../hooks/useUserInfo';

interface IChatCompoent {
  item: IComment;
  key: string;
  isInner?: boolean;
  handleCommentLike: (cid: number) => void;
  handleReply: (cid: number) => void;
  navigation: any;
}

function ChatComponent(props: IChatCompoent) {
  const {item, key, isInner, navigation, handleCommentLike, handleReply} =
    props;
  const [selectHeart, setSelectedHeart] = React.useState(false);
  const {
    username: name,
    comment,
    count_comment_like,
    ago,
    comment_reply,
    created_at,
    user_logo,
  } = item;

  return (
    <View key={key} flexDirection="row" justifyContent="space-around" mt={3}>
      <View width="15%" alignItems="center">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('UserProfile', {
              user_id: Number(item?.user_id),
            });
          }}>
          <Image source={{uri: user_logo}} style={styles.img} />
        </TouchableOpacity>
      </View>

      <View width="85%">
        <Caption
          color={useColorModeValue(
            theme.colors.gray[400],
            theme.colors.appWhite[600],
          )}>
          {name}
        </Caption>
        <Caption
          fontWeight="400"
          mt={2}
          mb={3}
          color={useColorModeValue(
            theme.colors.black[2000],
            theme.colors.appWhite[600],
          )}>
          {comment}
        </Caption>
        <View alignItems="flex-start">
          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="space-evenly"
            pr={10}
            mb={2}>
            <View alignItems="center" flexDirection="row">
              <View>
                <Image source={images.LIKE} style={styles.imgLike} />
              </View>
              <Caption color={theme.colors.gray[400]} ml={1}>
                {count_comment_like}
              </Caption>
            </View>
            <View
              borderColor={theme.colors.gray[200]}
              borderWidth={1}
              mx={2}
              height="50%"
            />
            <View alignItems="center" flexDirection="row">
              <Caption color={theme.colors.gray[400]}>
                {timeDiffCalc(created_at)}
              </Caption>
            </View>
            {!isInner ? (
              <>
                <View
                  borderColor={theme.colors.gray[200]}
                  borderWidth={1}
                  mx={2}
                  height="50%"
                />
                <TouchableOpacity
                  onPress={() => {
                    handleReply(Number(item.id));
                  }}>
                  <View alignItems="center" flexDirection="row">
                    <Caption color={theme.colors.gray[400]}>Reply</Caption>
                  </View>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
        <Divider bg={theme.colors.gray[400]} />
        {comment_reply?.map((inner, indexInner) => {
          const keyInner = inner.name + indexInner;
          return (
            <ChatComponent
              item={inner}
              isInner
              navigation={navigation}
              handleReply={handleReply}
              key={keyInner}
              handleCommentLike={handleCommentLike}
            />
          );
        })}
      </View>

      <View position="absolute" top={0} right={0}>
        <TouchableOpacity
          onPress={() => {
            handleCommentLike(Number(item.id));
            setSelectedHeart(!selectHeart);
          }}>
          <IoniconsIcon
            name={item.liked === 1 ? 'heart' : 'heart-outline'}
            size={24}
            color={
              item.liked === 1
                ? theme.colors.black[2000]
                : theme.colors.gray[400]
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

ChatComponent.defaultProps = {isInner: false};
const styles = StyleSheet.create({
  img: {height: 40, width: 40, borderRadius: 360},
  imgLike: {width: 16, height: 16, resizeMode: 'contain'},
});
export default ChatComponent;
