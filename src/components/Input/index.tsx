import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';

import { TextInputProps, TextInput } from 'react-native';
import { useField } from '@unform/core';

import { Container, Icon, styleTextInput, TextError } from './styles';
import themeGlobal from '../../styles/global';

interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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
      path: 'value',
      setValue(_ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container isFocus={isFocus} isFilled={isFilled} isErrored={!!error}>
        <Icon
          name={icon}
          size={20}
          color={
            isFilled || isFocus
              ? themeGlobal.colors.tertiary
              : themeGlobal.colors.primary
          }
        />
        <TextInput
          ref={inputElementRef}
          style={styleTextInput.textInput}
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          onFocus={handleInputFocus}
          onBlur={handleInputFilled}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
      {!!error && <TextError>{error}</TextError>}
    </>
  );
};

export default forwardRef(Input);
