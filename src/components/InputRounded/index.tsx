/* eslint-disable no-unused-vars */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useState,
  useEffect,
  Dispatch,
  useMemo,
} from 'react';

import { TextInputProps, TextInput } from 'react-native';
import { useField } from '@unform/core';

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
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
  inputActiveColor?: 'primary' | 'secondary' | 'tertiary';
  labelPlaceholder: string;
  heightContainer?: number;
  initialValue?: string;
  rawText?: string;
  onInitialData?: Dispatch<React.SetStateAction<string>>;
}

const InputRounded: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    name,
    icon,
    styleInLine = {},
    inputActiveColor = 'primary',
    labelPlaceholder,
    heightContainer = 60,
    initialValue = '',
    rawText,
    onInitialData,
    ...rest
  },
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

  useEffect(() => {
    if (onInitialData) onInitialData(initialValue || defaultValue);
  }, [defaultValue, initialValue, onInitialData]);

  const optionsAnimate = {
    duration: 350,
    easing: Easing.out(Easing.exp),
  };
  const animateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateY.value, optionsAnimate),
      },
      {
        translateX: withTiming(translateX.value, optionsAnimate),
      },
      {
        scale: withTiming(scale.value, optionsAnimate),
      },
    ],
    color: withTiming(color.value, optionsAnimate),
  }));

  useEffect(() => {
    if (isFocus) {
      translateY.value = -heightContainer / 2;
      translateX.value = -24;
      scale.value = 0.9;
      color.value = error
        ? themeGlobal.colors.red
        : themeGlobal.colors[inputActiveColor];
    } else if (!isFocus && !isFilled) {
      translateY.value = 0;
      translateX.value = 0;
      scale.value = 1;
      color.value = themeGlobal.colors.gray3;
    } else if (!isFocus && isFilled) {
      color.value = error
        ? themeGlobal.colors.red
        : themeGlobal.colors[inputActiveColor];
    }
  }, [
    color,
    error,
    heightContainer,
    inputActiveColor,
    isFilled,
    isFocus,
    scale,
    translateX,
    translateY,
  ]);

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

  const iconColor = useMemo(() => {
    if ((isFilled && !error) || isFocus) {
      return themeGlobal.colors[inputActiveColor];
    }
    if (error || (isFilled && error)) {
      return themeGlobal.colors.red;
    }
    return themeGlobal.colors.primary;
  }, [error, inputActiveColor, isFilled, isFocus]);
  return (
    <>
      <Container
        style={styleInLine}
        isFocus={isFocus}
        isFilled={isFilled}
        isErrored={!!error}
        heightContainer={heightContainer}
        inputActiveColor={inputActiveColor}
      >
        <TextLabel style={animateStyle} isErrored={!!error}>
          {labelPlaceholder}
        </TextLabel>

        {icon && <Icon name={icon} size={20} color={iconColor} />}
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
        {!!error && <TextError>{error}</TextError>}
      </Container>
    </>
  );
};

export default forwardRef(InputRounded);
