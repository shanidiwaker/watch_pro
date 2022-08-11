/**
 * @format
 */

import {isNull, isUndefined, isEmpty, get} from 'lodash';

import {Dimensions} from 'react-native';

export const NAME_REGEX = /^[a-zA-Z ]{2,30}$/;
export const PHONE_REGEX = /^(?:\+971|0(0971)?)(?:[234679]|5[01256])[0-9]{7}$/;
export const PHONE_REGEX_2 =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const URL_REGEX =
  /^((https?):\/\/)?(([w|W]{3}\.)?)+[a-zA-Z0-9\-.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const formatPhoneNumber = (number: string) => {
  const cleaned = number.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return ['(', match[1], ') ', match[2], '-', match[3]].join('');
  }
  return cleaned;
};

export const getValue = (object: object, path: string, defaultVal: unknown) => {
  const val = get(object, path, defaultVal);

  if (isNull(val)) {
    return defaultVal;
  }

  if (isUndefined(val)) {
    return defaultVal;
  }

  if (typeof val === 'boolean') {
    return val;
  }

  if (typeof val !== 'number' && isEmpty(val)) {
    return defaultVal;
  }

  return val;
};
