/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface IButtonProps {
  height?: number;
  width?: number;
  backGroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button = ({
  disabled = false,
  children,
  onPress,
}: IButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: disabled ? '#adadad' : '#1054DC',
        paddingVertical: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
