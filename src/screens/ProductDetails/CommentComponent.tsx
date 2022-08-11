/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-duplicates */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useRef} from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {View, useColorModeValue} from 'native-base';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {RootNavigationType} from '../../components/Header';

import ChatComponent from '../../components/ChatComponent';
import {Caption} from '../../components/Typography';

import {useProductOperations} from './Queries/useProductOperations';
import {theme} from '../../theme';
import {IComment} from './Queries/useFetchProductDetails';

interface ICommentsComponent {
  comment: IComment[];
  id: number;
}

function CommentComponent(props: ICommentsComponent) {
  const {comment, id} = props;
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const [commentId, setCommentId] = useState(0);
  const inputRef = useRef(null);

  const navigation = useNavigation<RootNavigationType>();

  const {commentProduct, likeComment, commentReply} = useProductOperations(id);

  const handleSend = async () => {
    if (commentId > 0) {
      await commentReply({
        comment_id: commentId.toString(),
        product_id: '',
        comment: text,
      });
    } else {
      await commentProduct({
        product_id: id.toString(),
        comment_id: '',
        comment: text,
      });
    }
    setText('');
    setCommentId(0);
  };

  const handleCommentLike = async (cid: number) => {
    await likeComment(cid);
  };

  const handleComment = () => {
    navigation.navigate('Comments', {
      id,
    });
  };

  const handleReply = (cid: number) => {
    inputRef?.current?.focus();
    setCommentId(cid);
  };
  return (
    <View
      px={3}
      pt={5}
      pb={5}
      bg={useColorModeValue(theme.colors.gray[100], theme.colors.black[200])}>
      <TouchableOpacity onPress={handleComment}>
        <Caption color={theme.colors.gray[400]} fontWeight="400" mb={5}>
          {comment && comment.length} {t('product:comments')}
        </Caption>
      </TouchableOpacity>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around">
        <View width="15%" alignItems="center">
          <Image
            source={{uri: 'https://www.aphki.or.id//post/avatar.png'}}
            style={styles.img}
          />
        </View>
        <View
          backgroundColor={useColorModeValue(
            theme.colors.gray[200],
            theme.colors.black[2000],
          )}
          style={styles.searchContainer}>
          <View flexDirection="row" justifyContent="center" alignItems="center">
            <IoniconsIcon
              name="chatbox-outline"
              size={18}
              color={theme.colors.gray[400]}
            />
            <TextInput
              placeholder={t('product:writeComment')}
              style={[
                styles.input,
                {
                  color: useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  ),
                },
              ]}
              ref={inputRef}
              value={text}
              placeholderTextColor={useColorModeValue(
                theme.colors.black[400],
                theme.colors.appWhite[600],
              )}
              onChangeText={setText}
            />
            <TouchableOpacity onPress={handleSend}>
              <IoniconsIcon
                name="send"
                size={15}
                color={theme.colors.gray[400]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View mt={5}>
        {comment.map((item, index) => {
          const key = item.id + index;
          return (
            <ChatComponent
              item={item}
              key={key}
              navigation={navigation}
              handleCommentLike={handleCommentLike}
              handleReply={handleReply}
            />
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    width: '85%',
    height: 32,
    pr: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 45,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 360,
    borderWidth: 0.5,
  },
  input: {
    height: '100%',
    width: '85%',
    marginLeft: 5,
  },
});
export default CommentComponent;
