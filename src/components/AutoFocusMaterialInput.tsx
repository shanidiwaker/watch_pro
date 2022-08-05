/**
 * @format
 */
import React from 'react';
import {TextInput, View} from 'react-native';
import {useField} from 'formik';

import {FloatingInputProps} from './FloatingInput';
import MaterialInput from './MaterialInput';

interface MaterialInputProps extends Omit<FloatingInputProps, 'error'> {
  name: string;
  onPosition?: (y: number) => void;
}

const AutoFocusMaterialInput = React.forwardRef<TextInput, MaterialInputProps>(
  (props: MaterialInputProps, ref) => {
    const {name, onPosition} = props;

    const [field, meta, helpers] = useField(name);
    const {onBlur} = field;
    const {value, error, touched} = meta;
    const {setValue} = helpers;

    const viewRef = React.useRef<View>(null);

    const onLayout = () => {
      if (viewRef.current && onPosition) {
        viewRef.current.measure((_x, _y, _width, _height, _px, py) => onPosition(py));
      }
    };

    return (
      <View ref={viewRef}>
        <MaterialInput
          ref={ref}
          onLayout={onLayout}
          value={value}
          onChangeText={setValue}
          error={touched ? error : ''}
          onBlur={onBlur(name)}
          {...props}
        />
      </View>
    );
  },
);

AutoFocusMaterialInput.defaultProps = {
  onPosition: undefined,
};

export default AutoFocusMaterialInput;
