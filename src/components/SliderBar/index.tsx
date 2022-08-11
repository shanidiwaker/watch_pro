import * as React from 'react';
import {StyleSheet} from 'react-native';
import {useColorModeValue, View} from 'native-base';
import {Slider} from '@miblanchard/react-native-slider';
import {Caption, SubTitle} from '../Typography';
import {theme} from '../../theme';

const DEFAULT_VALUE = 0;

function SliderContainer(props: {
  caption: string;

  children: React.ReactElement;
  // eslint-disable-next-line react/require-default-props
  sliderValue?: Array<number>;
  // eslint-disable-next-line react/require-default-props
  trackMarks?: Array<number>;
  onChangeText: ((text: string) => void) | undefined;
}) {
  const {caption, sliderValue, trackMarks, onChangeText, children} = props;
  const [value, setValue] = React.useState(sliderValue || DEFAULT_VALUE);
  let renderTrackMarkComponent: React.ReactNode;

  React.useEffect(() => {
    setValue(sliderValue || DEFAULT_VALUE);
  }, [sliderValue]);

  const handleChange = (text: any) => {
    setValue(text);
    onChangeText?.(Array.isArray(text) ? text.join(' - ') : text);
  };
  // React.useEffect(() => {
  //   if (value) {
  //     onChangeText?.(value.toString());
  //   }
  // }, [value]);
  const renderChildren = () => {
    return React.Children.map(children, (child: React.ReactElement) => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: handleChange,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }

      return child;
    });
  };
  return (
    <View mt={5}>
      <View
        bg={useColorModeValue(theme.colors.gray[800], theme.colors.black[200])}
        style={styles.Container}>
        <View style={styles.containerinner}>
          <SubTitle
            style={[
              styles.text,
              {
                color: useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                ),
              },
            ]}>
            {caption}
          </SubTitle>
          {/* <Caption style={styles.sidetext}>Drag price slider</Caption> */}
        </View>

        {renderChildren()}
        <View
          bg={useColorModeValue(
            theme.colors.gray[900],
            theme.colors.black[200],
          )}
          style={styles.valueContainer}>
          <SubTitle style={styles.Acd}>
            AED{' '}
            {Array.isArray(value)
              ? Math.ceil(Number(value.join(' - ')))
              : Math.ceil(Number(value))}
          </SubTitle>
        </View>
      </View>
    </View>
  );
}

function SliderBar(props: any) {
  const {placeholder, onChangeText, value} = props;
  return (
    <View>
      <SliderContainer
        sliderValue={value}
        caption={placeholder}
        onChangeText={onChangeText}>
        <Slider value={0} minimumValue={0} maximumValue={1000} step={0} />
      </SliderContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    letterSpacing: 1,
    lineHeight: 14,
    color: theme.colors.black[2000],
    fontWeight: '500',
  },
  Container: {
    width: '100%',
    Height: 136,
    borderRadius: 4,
    padding: 10,
    paddingVertical: 15,
  },
  valueContainer: {
    justifyContent: 'space-between',
    borderRadius: 4,
    width: 240,
    hight: 40,
    alignSelf: 'center',
  },
  containerinner: {
    flexDirection: 'row',
  },
  sidetext: {
    fontSize: 10,
    position: 'absolute',
    left: 180,
  },
  Acd: {
    textAlign: 'center',
    padding: 10,
  },
});
export default SliderBar;
