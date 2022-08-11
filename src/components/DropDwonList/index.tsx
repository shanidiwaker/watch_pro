import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useColorModeValue, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {theme} from '../../theme';
import {SubTitle} from '../../components/Typography';

interface IProps {
  heading: string;
  type: string;
  value: string;
  setValue: (text: string) => void;
  data: any[];
}
export default function DropDwonList(prop: IProps) {
  const {data, heading, value, setValue} = prop;
  const [isFocus, setIsFocus] = useState(false);
  const [t, i18] = useTranslation();

  const palaceHoder = value || heading;
  return (
    <View
    bg={useColorModeValue(theme.colors.gray[100], theme.colors.black[2000])}      p={2}
      borderColor={useColorModeValue(
        theme.colors.black['3000'],
        theme.colors.gray[100],
      )}>
      {/* <SubTitle style={styles.LocationHeading}>{heading}</SubTitle> */}
      <Dropdown
        placeholderStyle={[
          styles.placeholderStyle,
          {
            color: useColorModeValue(
              theme.colors.black[200],
              theme.colors.appWhite[600],
           
            ),
          },
        ]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        search
        placeholder={!isFocus ? palaceHoder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          console.log('item', item);
          setValue(item?.label);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 17,
    color: theme.colors.black[600],
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontWeight: '500',
  },
});
