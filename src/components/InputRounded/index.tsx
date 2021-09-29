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

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Container,
  Icon,
  styleTextInput,
  TextError,
  TextLabel,
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
  styleInLine?: object;
  labelPlaceholder: string;
}

const InputRounded: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, labelPlaceholder, ...rest },
  ref,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const color = useSharedValue(themeGlobal.colors.gray3);

  const animateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateY.value),
      },
      {
        translateX: withTiming(translateX.value),
      },
      {
        scale: withTiming(scale.value),
      },
    ],
    color: withTiming(color.value),
  }));

  useEffect(() => {
    if (isFocus) {
      translateY.value = -30;
      translateX.value = -18;
      scale.value = 0.9;
      color.value = themeGlobal.colors.primary;
    } else if (!isFocus && !isFilled) {
      translateY.value = 0;
      translateX.value = 0;
      scale.value = 1;
      color.value = themeGlobal.colors.gray3;
    }
  }, [color, isFilled, isFocus, scale, translateX, translateY]);

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
        <TextLabel style={animateStyle}>{labelPlaceholder}</TextLabel>

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

export default forwardRef(InputRounded);
