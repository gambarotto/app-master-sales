/* eslint-disable no-unused-vars */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useState,
  useEffect,
  Dispatch,
} from 'react';

import { TextInputProps, TextInput } from 'react-native';
import { useField } from '@unform/core';

import {
  Container,
  ContainerInput,
  Icon,
  LabelInput,
  styleTextInput,
  Warning,
} from './styles';
import themeGlobal from '../../styles/global';

interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}
interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  label?: string;
  style?: object;
  flex?: 'true' | 'false';
  initialValue?: string;
  rawText?: string;
  onInitialData?: Dispatch<React.SetStateAction<string>>;
  selectedColor?: 'primary' | 'secondary' | 'tertiary';
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    name,
    icon,
    label = null,
    style = {},
    initialValue = '',
    rawText,
    onInitialData,
    selectedColor = 'secondary',
    ...rest
  },
  ref,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueReference>({
    value: initialValue || defaultValue,
  });

  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (onInitialData) onInitialData(initialValue || defaultValue);
  }, [defaultValue, initialValue, onInitialData]);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleInputFilled = useCallback(() => {
    setIsFocus(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      setValue(_ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      getValue(_ref: any) {
        if (rawText) return rawText;
        if (inputValueRef.current)
          return inputValueRef.current.value || initialValue;

        return '';
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, initialValue, rawText, registerField]);
  return (
    <>
      <Container
        style={style}
        isFocus={isFocus}
        isFilled={isFilled}
        isErrored={!!error}
        selectedColor={selectedColor}
      >
        {label && <LabelInput>{label}</LabelInput>}
        <ContainerInput>
          {icon && (
            <Icon
              name={icon}
              size={20}
              color={
                isFilled || isFocus
                  ? themeGlobal.colors.tertiary
                  : themeGlobal.colors.primary
              }
            />
          )}
          <TextInput
            ref={inputElementRef}
            style={styleTextInput.textInput}
            keyboardAppearance="dark"
            placeholderTextColor={themeGlobal.colors.gray3}
            onFocus={handleInputFocus}
            onBlur={handleInputFilled}
            onChangeText={(value) => {
              inputValueRef.current.value = value;
            }}
            {...rest}
          />
        </ContainerInput>
        {!!error && (
          <Warning name="error" size={16} color={themeGlobal.colors.red} />
        )}
      </Container>
    </>
  );
};

export default forwardRef(Input);
