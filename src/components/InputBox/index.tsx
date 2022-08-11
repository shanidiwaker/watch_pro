/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import {useColorModeValue, View} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../theme';
import {Caption} from '../Typography';

export interface InputBox extends TextInputProps {
  placeholder: string;
  icon?: string;
  multiLine?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  error?: string | undefined | boolean;
  fromProfile?: boolean;
}

function inputbox(props: InputBox) {
  const {
    icon,
    fromProfile,
    value,
    placeholder,
    onRightPress,
    rightIcon,
    multiLine,
    error,
  } = props;
  return (
    <View mt={fromProfile ? 0 : 4}>
      {/* {value ? (
        <Caption
          color={useColorModeValue(
            theme.colors.gray[100],
            theme.colors.appWhite[600],
          )}>
          {placeholder}
        </Caption>
      ) : null} */}
      <View
        // bg={useColorModeValue(theme.colors.gray[100], theme.colors.black[2000])}
        bg={useColorModeValue(theme.colors.gray[100], theme.colors.black[200])}
        borderColor={useColorModeValue(
          theme.colors.black['3000'],
          theme.colors.gray[100],
        )}
        px={2}
        borderWidth={0}
        style={styles.searchContainer}
        height={multiLine ? 20 : 12}
        maxHeight={20}>
        <View style={styles.inputView} height={12} maxHeight={20}>
          {icon && (
            <Feather
              name={icon}
              size={18}
              color={useColorModeValue(
                theme.colors.gray[400],
                theme.colors.appWhite[600],
              )}
            />
          )}
          <TextInput
            style={[
              styles.input,
              {
                color: useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                ),
              },
            ]}
            placeholderTextColor={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            multiline={multiLine}
            {...props}
          />
          {rightIcon ? (
            <TouchableOpacity style={styles.rightStyle} onPress={onRightPress}>
              <Feather
                name={rightIcon}
                size={18}
                color={useColorModeValue(
                  theme.colors.gray[400],
                  theme.colors.appWhite[600],
                )}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {error && (
        <Caption style={styles.err_title} numberOfLines={1}>
          {error}
        </Caption>
      )}
    </View>
  );
}
inputbox.defaultProps = {
  keyboardType: 'default',
  onBlur: null,
  isEditable: true,
  rightIcon: '',
  onRightPress: null,
  fromProfile: false,
};
export default inputbox;
const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    width: '100%',
  },
  rightStyle: {position: 'absolute', right: 10},
  err_title: {
    color: theme.colors.red[900],
    opacity: 0.6,
    letterSpacing: 1,
    fontSize: 12,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  input: {
    height: '100%',
    width: '100%',
    fontWeight: '500',
    letterSpacing: 1,
    fontSize: 14,
    lineHeight: 18,
    overflow: 'hidden',
  },
});
