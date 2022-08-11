/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Spinner, useColorModeValue, View} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Caption, SubTitle} from '../../components/Typography';
import {theme} from '../../theme';
import InputBox from '../../components/InputBox';

interface IFieldComponent {
  title: string;
  value: string;
  isEditable?: boolean;
  isRight?: boolean;
  isUpdating?: string;
  down?: boolean;
  onPress?: () => void;
  updateField?: (value: string, which: string) => void;
}

function FieldComponent(props: IFieldComponent) {
  const {
    title,
    value,
    isRight,
    down,
    isUpdating,
    updateField,
    onPress,
    isEditable,
  } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  return isEdit && isEditable ? (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingHorizontal: 10,
          backgroundColor: useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[200],
          ),
          borderColor: theme.colors.gray[400],
          borderWidth: 0.5,
        },
      ]}>
      <View width="80%">
        <InputBox
          value={fieldValue}
          placeholder={title}
          onChangeText={text => setFieldValue(text)}
          fromProfile
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          updateField?.(fieldValue, title);
          setIsEdit(false);
        }}>
        <Caption fontWeight="600">Save</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsEdit(false);
        }}>
        <Feather
          name="x"
          size={15}
          color={useColorModeValue(
            theme.colors.black[200],
            theme.colors.appWhite[600],
          )}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={[
        styles.container,
        {
          backgroundColor: useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[200],
          ),
          borderColor: theme.colors.gray[400],
          borderWidth: down ? 0 : 0.5,
        },
      ]}>
      <>
        <SubTitle fontWeight="600">{title}</SubTitle>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            if (isEditable) {
              setIsEdit(true);
            } else {
              onPress?.();
            }
          }}>
          <View style={styles.tabContainer}>
            {isUpdating === title ? (
              <Spinner />
            ) : (
              <Caption pr={3}>{value}</Caption>
            )}

            {isRight && (
              <Feather
                size={24}
                name={down ? 'chevron-down' : 'chevron-right'}
                color={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.appWhite[600],
                )}
              />
            )}
          </View>
        </TouchableOpacity>
      </>
    </View>
  );
}
FieldComponent.defaultProps = {
  isRight: true,
  isEditable: true,
  onPress: null,
  updateField: null,
  isUpdating: '',
  down: false,
};
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default FieldComponent;
