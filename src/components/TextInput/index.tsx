/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TextInput,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { FieldError } from 'react-hook-form';

interface IInputProps {
  label: string;
  placeholder?: string;
  borderWidth?: number;
  borderColor?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: string;
  error?: FieldError;
  errorMessage?: string;
  upperCase?: boolean;
  maxLength?: number;
}

const Input = ({
  label,
  placeholder,
  borderWidth = 2,
  borderColor = '#1054DC',
  onChangeText,
  onBlur,
  value,
  error,
  errorMessage,
  upperCase = false,
  maxLength,
}: IInputProps): JSX.Element => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 15, color: '#1054DC' }}>{label}</Text>
      <TextInput
        style={{
          borderWidth,
          borderColor: error ? 'tomato' : borderColor,
          borderRadius: 4,
        }}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        autoCapitalize={upperCase ? 'characters' : 'none'}
        maxLength={maxLength}
      />
      {error && <Text style={{ color: 'tomato' }}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;
