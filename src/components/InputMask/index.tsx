/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useCallback, forwardRef } from 'react';
import {
  TextInputMask,
  TextInputMaskProps,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import Input from '../Input';

interface InputMask extends TextInputMaskProps {
  type: TextInputMaskTypeProp;
  name: string;
  label?: string;
  styleInput?: object;
  initialValue: string | undefined;
}

const InputMask = (
  { type, name, label, styleInput, initialValue, ...rest }: InputMask,
  inputRef: any,
) => {
  const [text, setText] = useState('');
  const [rawText, setRawText] = useState('');
  const handleChangeText = useCallback((maskedText, unmaskedText) => {
    setText(maskedText);
    setRawText(unmaskedText);
  }, []);
  return (
    <TextInputMask
      type={type}
      includeRawValueInChangeText
      value={text}
      onChangeText={handleChangeText}
      customTextInput={Input}
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
