/**
 * @format
 */
import React, {useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', event => {
      setKeyboardVisible(true);
      setKeyboardHeight((event.endCoordinates.height-event.endCoordinates.height)+0);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return {
    keyboardHeight,
    isKeyboardVisible,
  };
};

export default useKeyboard;
