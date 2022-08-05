/* eslint-disable react-hooks/rules-of-hooks */
import {Spinner, useColorModeValue} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {theme} from '../../theme';
import {Caption} from '../Typography';

interface IProps {
  onPressHandler: () => void;
  title: string;
  isDisable?: boolean;
  isLoading?: boolean;
  isTransparent?: boolean;
  offdarckmod?:boolean;
}

function CustomButton(props: IProps) {
  const {title, onPressHandler, isTransparent, isLoading, isDisable,offdarckmod} = props;
  const borderColor = isDisable
    ? theme.colors.appWhite[900]
    : theme.colors.appWhite[800];
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={[
        styles.btn_wrapper,
        {
          borderColor,
          backgroundColor: isTransparent
            ? 'transparent'
            : useColorModeValue(
                theme.colors.black[200],
                theme.colors.gray[200],
              ),
        },
      ]}
      disabled={isDisable}>
      {isLoading ? (
        <Spinner mb={5} mt={5} />
      ) : (
        <Caption
        color={offdarckmod === true ? useColorModeValue(
            theme.colors.appWhite[600],
          ): useColorModeValue(
            theme.colors.appWhite[600],
            theme.colors.black[2000],
          )}
          style={styles.btn_title}>
          {title}
        </Caption>
      )}
    </TouchableOpacity>
  );
}

CustomButton.defaultProps = {
  isDisable: false,
  isLoading: false,
  isTransparent: false,
};

export default CustomButton;

const styles = StyleSheet.create({
  btn_wrapper: {
    width: '100%',
    height: 50,
    borderRadius: 2,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_title: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
