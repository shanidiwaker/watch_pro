import {IInputProps, Text} from 'native-base';
import React from 'react';

export function Title(props: IInputProps) {
  const {children, ...rest} = props;

  return (
    <Text fontFamily="ProximaNova-Bold" fontWeight={500} {...rest}>
      {children}
    </Text>
  );
}

export function SubTitle(props: IInputProps) {
  const {children, ...rest} = props;
  return (
    <Text fontFamily="ProximaNova-Semibold" fontWeight={400} {...rest}>
      {children}
    </Text>
  );
}

export function Caption(props: IInputProps) {
  const {children, ...rest} = props;
  return (
    <Text fontFamily="ProximaNova-Regular" fontWeight={400} {...rest}>
      {children}
    </Text>
  );
}
