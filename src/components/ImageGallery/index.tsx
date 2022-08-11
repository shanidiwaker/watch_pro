/**
 * @format
 */
import React from 'react';
import ImageView from 'react-native-image-viewing';
import {useSelector} from 'react-redux';

import {RootState} from '../../redux/store';
import {useImageGallery} from './useImageGallery';

function ImageGallery() {
  const {hideGallery} = useImageGallery();
  const {visible, imageData} = useSelector((state: RootState) => state.gallery);

  if (visible) {
    return (
      <ImageView images={imageData} imageIndex={0} visible={visible} swipeToCloseEnabled={false} onRequestClose={hideGallery} />
    );
  }
  return null;
}

export default ImageGallery;
