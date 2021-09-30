/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useCallback, forwardRef } from 'react';
import {
  TextInputMask,
  TextInputMaskProps,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import Input from '../Input';
import InputRounded from '../InputRounded';

interface InputMask extends TextInputMaskProps {
  type: TextInputMaskTypeProp;
  name: string;
  label?: string;
  labelPlaceholder?: string;
  typeInput?: 'line' | 'rounded';
  styleInput?: object;
  initialValue: string | undefined;
}

const InputMask = (
  {
    type,
    name,
    label,
    labelPlaceholder,
    typeInput = 'line',
    styleInput,
    initialValue,
    ...rest
  }: InputMask,
  inputRef: any,
) => {
  const [text, setText] = useState('');
  const [rawText, setRawText] = useState('');
  const handleChangeText = useCallback((maskedText, unmaskedText) => {
    setText(maskedText);
    setRawText(unmaskedText);
  }, []);
  const inputs = {
    line: Input,
    rounded: InputRounded,
  };
  return (
    <TextInputMask
      type={type}
      includeRawValueInChangeText
      value={text}
      onChangeText={handleChangeText}
      customTextInput={inputs[typeInput]}
      customTextInputProps={{
        ref: inputRef,
        rawText,
        styleInput,
        onInitialData: setText,
        name,
        label,
        initialValue,
      }}
      {...rest}
    />
  );
};
export default forwardRef(InputMask);
