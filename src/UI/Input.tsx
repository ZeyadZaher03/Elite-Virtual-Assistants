import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { DefaultInputComponentProps } from "react-phone-number-input";
import ReactPhoneInput from "react-phone-number-input/input";
import styled from "styled-components";
import { E164Number } from "libphonenumber-js/core";

export enum InputTypes {
  TEXT = "input",
  TEXTAREA = "textarea",
  PHONE_NUMBER = "phone_number",
  PASSWORD = "password",
}

interface CommonLabelProps {
  $fontSize?: number;
  $fontColor?: string;
  $required?: boolean;
  $isFocused?: boolean;
}

interface CommonInputWrapperStylesProps {
  $borderColor?: string;
}

export type Value = E164Number;

interface InputProps {
  label: string;
  name: string;
  borderColor?: string;
  fontSize?: number;
  value: string | Value;
  fontColor?: string;
  required?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
  type?: string;
  onChange: any;
}

interface inputWrapperProps extends Omit<InputProps, "onChange"> {
  type: InputTypes;
  onChange: any;
}

// Common styles for InputWrapper
const InputWrapper = styled.div<CommonInputWrapperStylesProps>`
  border-bottom: 1px solid
    ${({ $borderColor }) => ($borderColor ? $borderColor : "#FFF")};
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const Label = styled.label<CommonLabelProps>`
  position: absolute;
  top: ${({ $isFocused }) => ($isFocused ? "10%" : "50%")};
  color: ${({ $fontColor }) => ($fontColor ? $fontColor : "#fff")};
  z-index: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  transition: all 1000ms cubic-bezier(0.075, 0.82, 0.165, 1);
  font-size: ${({ $fontSize = 1, $isFocused }) =>
    $isFocused ? `${$fontSize * 0.9}rem` : `${$fontSize}`};

  ${({ $required }) =>
    $required &&
    `
      &::after {
        margin-left: 4px;
        font-size: 12px;
        content: "*";
        height: 100%;
        display: block;
        justify-content: center;
        align-items: center;
        color: red;
      }
    `}
`;

const StyledTextInput = styled.input`
  padding: 1rem 0 0.7rem 0;
  width: 100%;
  z-index: 2;
  position: relative;
  font-size: 1rem;
  background-color: transparent;
  border: 0;
  color: #fff;
  outline: none;
`;

const StyledTextArea = styled.textarea`
  padding: 1.2rem 0 0.7rem 0;
  width: 100%;
  z-index: 2;
  position: relative;
  font-size: 1rem;
  background-color: transparent;
  border: 0;
  color: #fff;
  outline: none;
`;

const StyledPhoneInput = styled(ReactPhoneInput)`
  padding: 1.2rem 0 0.7rem 0;
  width: 100%;
  z-index: 2;
  position: relative;
  font-size: 1rem;
  background-color: transparent;
  border: 0;
  color: #fff;
  outline: none;
`;

const TextInput = ({
  borderColor,
  name,
  fontSize,
  fontColor,
  required,
  value,
  label,
  onFocus,
  onBlur,
  onChange,
  isFocused,
  type,
  ...rest
}: InputProps) => {
  return (
    <InputWrapper $borderColor={borderColor}>
      <Label
        htmlFor={name}
        $fontSize={fontSize}
        $fontColor={fontColor}
        $required={required}
        $isFocused={!!isFocused || !!value.length}
      >
        {label}
      </Label>
      <StyledTextInput
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        id={name}
        required={required}
        value={typeof value === "string" ? value : ""}
        type={type}
        {...rest}
      />
    </InputWrapper>
  );
};

const TextArea = ({
  borderColor,
  name,
  fontSize,
  fontColor,
  required,
  value,
  label,
  onFocus,
  onBlur,
  onChange,
  isFocused,
}: InputProps) => (
  <InputWrapper $borderColor={borderColor}>
    <Label
      htmlFor={name}
      $fontSize={fontSize}
      $fontColor={fontColor}
      $required={required}
      $isFocused={isFocused || !!value.length}
    >
      {label}
    </Label>
    <StyledTextArea
      onChange={onChange as (event: ChangeEvent<HTMLTextAreaElement>) => void} // Fix type here
      onFocus={onFocus}
      onBlur={onBlur}
      name={name}
      id={name}
      required={required}
    />
  </InputWrapper>
);

const PhoneInput = ({
  borderColor,
  name,
  fontSize,
  fontColor,
  required,
  value,
  label,
  onFocus,
  onBlur,
  onChange,
  isFocused,
}: DefaultInputComponentProps) => (
  <InputWrapper $borderColor={borderColor}>
    <Label
      htmlFor={name}
      $fontSize={fontSize}
      $fontColor={fontColor}
      $required={required}
      $isFocused={isFocused || !!value.length}
    >
      {label}
    </Label>
    <StyledPhoneInput
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange as (value?: Value) => void}
    />
  </InputWrapper>
);

export const Input = ({
  type,
  label,
  name,
  borderColor,
  fontSize,
  value,
  fontColor,
  required,
  onFocus,
  onBlur,
  onChange,
}: inputWrapperProps) => {
  const [isFocused, setFocused] = useState(false);
  const onInputFocus = () => {
    onFocus && onFocus();
    setFocused(true);
  };
  const onInputBlur = () => {
    onBlur && onBlur();
    setFocused(false);
  };

  switch (type) {
    case InputTypes.TEXT:
      return (
        <TextInput
          borderColor={borderColor}
          name={name}
          fontSize={fontSize}
          fontColor={fontColor}
          required={required}
          value={value}
          isFocused={isFocused}
          label={label}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onChange}
        />
      );
    case InputTypes.PASSWORD:
      return (
        <TextInput
          borderColor={borderColor}
          name={name}
          type="password"
          fontSize={fontSize}
          fontColor={fontColor}
          required={required}
          value={value}
          isFocused={isFocused}
          label={label}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onChange}
        />
      );
    case InputTypes.TEXTAREA:
      return (
        <TextArea
          borderColor={borderColor}
          name={name}
          fontSize={fontSize}
          fontColor={fontColor}
          required={required}
          value={value}
          isFocused={isFocused}
          label={label}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onChange}
        />
      );
    case InputTypes.PHONE_NUMBER:
      return (
        <PhoneInput
          borderColor={borderColor}
          name={name}
          fontSize={fontSize}
          fontColor={fontColor}
          required={required}
          value={value}
          isFocused={isFocused}
          label={label}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onChange}
        />
      );
    default:
      <TextInput
        borderColor={borderColor}
        name={name}
        fontSize={fontSize}
        fontColor={fontColor}
        required={required}
        value={value}
        isFocused={isFocused}
        label={label}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onChange}
      />;
  }
};
