/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-duplicates */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {ScrollView, View as VIEW} from 'react-native';

import {useColorModeValue, Spinner} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {theme} from '../../theme';
import Error from '../../components/Error';
import {
  IProduct,
  useFetchProductDetails,
} from '../ProductDetails/Queries/useFetchProductDetails';
import HeaderSimple from '../../components/HeaderSimple';
import CommentComponent from '../ProductDetails/CommentComponent';

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Comments'
>;

function Comments(props: ProfileScreenProps) {
  const {route} = props;
  const inset = useSafeAreaInsets();
console.log("route.params.id",route.params.id)
  const {
    data: details,
    error,
    isLoading,
    refetch,
  } = useFetchProductDetails(route.params.id);
  const product = details as IProduct;

  if (error) {
    return <Error retry={refetch} />;
  }

  if (isLoading) {
    return <Spinner mb={20} mt={20} />;
  }

  const {comment: comments} = product;
  return (
    <VIEW
      style={{
        paddingTop: inset.top,
          height: '100%',
        backgroundColor: useColorModeValue(
          theme.colors.gray[100],
          theme.colors.black[200],
        ),
      }}>
      <HeaderSimple title="Comments" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          backgroundColor: useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[200],
          ),
        }}
        contentContainerStyle={{paddingBottom: inset.top + 10}}
        showsVerticalScrollIndicator={false}>
        <CommentComponent comment={comments} id={route.params.id} />
      </ScrollView>
    </VIEW>
  );
}
export default Comments;
