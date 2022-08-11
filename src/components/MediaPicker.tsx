/**
 * @format
 */

import React, {forwardRef, useImperativeHandle} from 'react';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

import {
  View,
  Actionsheet,
  useDisclose,
  Box,
  Text,
  useColorModeValue,
} from 'native-base';
import {theme} from '../theme';

const photoOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  maxWidth: 1600,
  maxHeight: 1600,
  includeBase64: false,
};

const ImageSource = {gallery: 0, camera: 1, none: 2};

type ImageSource = 'gallery' | 'camera';
export type IAssetType = Asset;
interface IPickerProps {
  onSelectImage: (image: IAssetType[]) => void;
  options?: ImageLibraryOptions;
  title?: string;
}

type IPressHandler = {
  onPickerSelect: (type?: ImageSource) => void;
};

const MediaPicker = forwardRef<IPressHandler, IPickerProps>(
  (props: IPickerProps, ref) => {
    useImperativeHandle(ref, () => ({onPickerSelect: onOpen}));

    const {isOpen, onOpen, onClose} = useDisclose();

    const {onSelectImage, options,title} = props;

    const handleResponse = async (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorCode) {
        return;
      }
      const image = response?.assets;
      if (image && onSelectImage) {
        onSelectImage(image);
      }
    };

    const showGallery = () => {
      onClose();
      if (options) {
        launchImageLibrary(options, handleResponse);
      }
    };

    const showCamera = () => {
      onClose();
      if (options) {
        launchCamera(options, handleResponse);
      }
    };
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Truventorm Camera Permission',
            message:
              // eslint-disable-next-line no-useless-concat
              'Truventorm needs access to your camera ' +
              'to set profile picture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          showCamera();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    return (
      <View height={0} ref={ref} width={0}>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box justifyContent="center" px={4} py="3" w="100%">
              <Text
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}
                fontFamily="heading"
                fontSize="20">
                Please select source:
              </Text>
            </Box>
            <Actionsheet.Item py="3" onPress={showGallery}>
              {title}
            </Actionsheet.Item>
            <Actionsheet.Item py="3" onPress={showCamera}>
              Use Camera
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    );
  },
);

MediaPicker.defaultProps = {
  options: photoOptions,
  title: 'Photo Library',
};

export type PickerHandle = React.ElementRef<typeof MediaPicker>;
export default MediaPicker;
