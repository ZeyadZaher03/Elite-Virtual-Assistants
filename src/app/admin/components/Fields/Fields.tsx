"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ResetButton, SaveButton } from "../../StyledComponent";
import { ImageOverlayAndPosition } from "./ImagePosition";

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  padding: 1rem 0.8rem 0.6rem 0.8rem;
  border: 0;
  outline: 2px solid #2b4650;
  border-radius: 3px;
  width: 100%;
  font-size: 1rem;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: all 200ms ease-in-out;

  &:focus {
    outline: 2px solid #49a9cc;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 1rem 0.8rem 0.6rem 0.8rem;
  border: 0;
  outline: 2px solid #2b4650;
  border-radius: 3px;
  font-size: 1rem;
  width: 100%;
  min-height: 7rem;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: all 200ms ease-in-out;
  resize: vertical;
  &:focus {
    outline: 2px solid #49a9cc;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }
`;

// --

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  margin-right: 1rem;
  position: relative;

  @media only screen and (max-width: 600px) {
    margin-right: 0rem;
    margin-bottom: 1rem;
    width: 100%;
  }
`;

const Label = styled.label`
  background-color: #fff;
  padding: 0 0.5rem;
  position: relative;
  bottom: -8px;
  left: 10px;
  font-weight: 600;
  color: #2b4650;
  display: inline-block;
`;

const LabelWithoutInput = styled(Label)`
  background-color: #fff;
  padding: 0.5rem 0;
  position: relative;
  bottom: 0;
  left: 0;
  font-weight: 600;
  color: #2b4650;
  display: inline-block;
`;

const ImagesWrapper = styled.div`
  display: flex;
  margin-top: 1rem;

  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
  min-height: 6rem;
  max-height: 10rem;
  margin-right: 1rem;

  @media only screen and (max-width: 600px) {
    width: 8rem;
  }
`;

const InputSpan = styled.span<{ $isChanged?: boolean }>`
  padding: 0.5rem 0.5rem 0.6rem 0.5rem;
  background-color: ${({ $isChanged }) => ($isChanged ? "#348ba1" : "#505050")};
  color: #fff;
  font-size: 0.7rem;
  position: relative;
  z-index: 0;
  bottom: -3px;
  border-radius: 5px 5px 0 0;
`;

const InputImage = styled.img`
  width: 10rem;
  min-height: 6rem;
  max-height: 10rem;
  background-color: #ddd;
  border-radius: 5px;
  z-index: 1;
  @media only screen and (max-width: 600px) {
    width: 8rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 600px) {
    justify-content: space-between;
    width: 100%;
  }
  margin-bottom: 1rem;
`;

const StyledResetButton = styled(ResetButton)`
  margin-right: 1rem;
`;

const TextOldValueContainer = styled.div`
  position: relative;
`;

const TextOldValue = styled.span<{ $isChanged?: boolean }>`
  padding: ${({ $isChanged }) =>
    $isChanged ? " 1rem 0.5rem 1rem 0.5rem;" : " 0 0.5rem 0 0.5rem;"};
  background-color: #505050;
  height: ${({ $isChanged }) => ($isChanged ? "3rem" : "0")};
  color: #fff;
  font-size: 0.7rem;
  opacity: ${({ $isChanged }) => ($isChanged ? 1 : 0)};
  z-index: 0;
  border-radius: 0 0 5px 5px;
  transition: all 200ms ease-in-out;
  max-width: 60rem;
  display: block;
`;

const ImagePositionWrapper = styled.span<{ $isChanged?: boolean }>`
  display: flex;
  justify-content: flex-start;
`;

const TextOldValueForTextArea = styled(TextOldValue)`
  height: ${({ $isChanged }) => ($isChanged ? "6rem" : "0")};
  max-width: 60rem;
  max-height: 7rem;
`;

// ENUM --
export enum INPUT_TYPES {
  TEXT = "text",
  TEXTAREA = "textarea",
}

// iNTERFACE --

interface IInputProps {
  label: string;
  value: string;
  name: string;
  className?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

interface IActionButtonsProps {
  onReset: () => void;
  onInsert: () => void;
  isChanged: boolean;
  className?: string;
}

interface IInputWithActionProps extends IInputProps {
  initialValue: string | undefined;
  onInsert: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: INPUT_TYPES;
}

interface IImageInput extends Omit<IInputWithActionProps, "type"> {
  withActions: boolean;
}

interface ISelectImagePositionProps {
  imgSrc: string;
  setValueImgPos: React.Dispatch<React.SetStateAction<string>>;
  imgPosValue: string;
  imgPosOldValue: string | undefined | null;
  setOpacity?: React.Dispatch<React.SetStateAction<number>>;
  opacityValue?: number;
  opacityOldValue?: number | undefined | null;
  setColorOne?: React.Dispatch<React.SetStateAction<string>>;
  colorOneValue?: string;
  colorOneOldValue?: string | undefined | null;
  setColorTwo?: React.Dispatch<React.SetStateAction<string>>;
  colorTwoValue?: string;
  colorTwoOldValue?: string | undefined | null;
  onInsert: () => void;
  positionOnly?: boolean;
}

// INPUTS --

export const TextArea: React.FC<IInputProps> = ({
  value,
  onChange,
  label,
  name,
  className,
}) => {
  return (
    <InputContainer className={className}>
      <Label htmlFor={name}>{label}:</Label>
      <StyledTextArea id={name} onChange={onChange} value={value} name={name} />
    </InputContainer>
  );
};

export const TextInput: React.FC<IInputProps> = ({
  label,
  value,
  name,
  className,
  onChange,
}) => {
  return (
    <InputContainer className={className}>
      <Label htmlFor={name}>{label}:</Label>
      <StyledInput
        type="text"
        id={name}
        onChange={onChange}
        value={value}
        name={name}
      />
    </InputContainer>
  );
};

export const ActionButtons: React.FC<IActionButtonsProps> = ({
  onReset,
  onInsert,
  isChanged,
  className,
}) => {
  return (
    <ButtonContainer className={className}>
      <StyledResetButton onClick={onReset}>Reset</StyledResetButton>
      <SaveButton onClick={onInsert} disabled={!isChanged}>
        Save
      </SaveButton>
    </ButtonContainer>
  );
};

export const InputWithActions: React.FC<IInputWithActionProps> = ({
  type,
  value,
  onChange,
  label,
  name,
  initialValue = "",
  onInsert,
  setValue,
  className,
}) => {
  const isChanged = value !== initialValue;
  const onReset = () => setValue(initialValue);
  const inputProps = {
    label,
    value,
    name,
    className,
    onChange,
  };
  return (
    <ActionWrapper className={className}>
      {type === INPUT_TYPES.TEXT && <TextInput {...inputProps} />}
      {type === INPUT_TYPES.TEXTAREA && <TextArea {...inputProps} />}
      <ActionButtons
        onReset={onReset}
        onInsert={onInsert}
        isChanged={isChanged}
      />
    </ActionWrapper>
  );
};

export const InputWithActionsAndOldValue: React.FC<IInputWithActionProps> = ({
  type,
  value,
  onChange,
  label,
  name,
  initialValue,
  onInsert,
  setValue,
  className,
}) => {
  const inputProps = {
    type,
    value,
    onChange,
    label,
    name,
    initialValue,
    onInsert,
    setValue,
    className,
  };
  const isChanged = value !== initialValue;

  return (
    <InputWrapper className={className}>
      <InputWithActions {...inputProps} />
      {!!initialValue === true && type === INPUT_TYPES.TEXTAREA && (
        <TextOldValueContainer>
          <TextOldValueForTextArea $isChanged={isChanged}>
            {initialValue}
          </TextOldValueForTextArea>
        </TextOldValueContainer>
      )}
      {!!initialValue === true && type === INPUT_TYPES.TEXT && (
        <TextOldValueContainer>
          <TextOldValue $isChanged={isChanged}>{initialValue}</TextOldValue>
        </TextOldValueContainer>
      )}
    </InputWrapper>
  );
};

export const ImageInput: React.FC<IImageInput> = ({
  label,
  value,
  name,
  className,
  onChange,
  initialValue,
  onInsert,
  setValue,
  withActions,
}) => {
  const isChanged = value !== initialValue;
  const inputProps = {
    label,
    value,
    name,
    className,
    onChange,
  };
  const inputPropsWithAction = {
    ...inputProps,
    type: INPUT_TYPES.TEXT,
    initialValue,
    onInsert,
    setValue,
  };

  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const imagesWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window?.innerWidth <= 600;
    if (!isMobile) return;
    const firstChildNode = inputWrapperRef?.current?.childNodes?.[0]
      ?.childNodes?.[0] as Element;

    if (firstChildNode && imagesWrapperRef?.current) {
      firstChildNode.insertAdjacentElement(
        "afterend",
        imagesWrapperRef.current
      );
    }
  }, [inputWrapperRef, imagesWrapperRef]);

  return (
    <InputWrapper ref={inputWrapperRef}>
      {withActions ? (
        <InputWithActions {...inputPropsWithAction} />
      ) : (
        <TextInput {...inputProps} />
      )}

      <ImagesWrapper ref={imagesWrapperRef}>
        {isChanged && (
          <ImageContainer>
            <InputSpan>Old Image:</InputSpan>
            <InputImage alt={label} src={initialValue} />
          </ImageContainer>
        )}

        <ImageContainer>
          <InputSpan $isChanged={isChanged}>Current Image:</InputSpan>
          <InputImage alt={label} src={value} />
        </ImageContainer>
      </ImagesWrapper>
    </InputWrapper>
  );
};

export const SelectImagePosition: React.FC<ISelectImagePositionProps> = ({
  imgSrc,
  setValueImgPos,
  imgPosValue,
  imgPosOldValue = "",
  setOpacity,
  opacityValue,
  opacityOldValue = 0,
  setColorOne,
  colorOneValue,
  colorOneOldValue = "",
  setColorTwo,
  colorTwoValue,
  colorTwoOldValue = "",
  onInsert,
  positionOnly = false,
}) => {
  const isImageValueChanged = imgPosValue !== imgPosOldValue;
  const isOpacityValueChanged = opacityValue !== opacityOldValue;
  const isColorOneValueChanged = colorOneValue !== colorOneOldValue;
  const isColorTwoValueChanged = colorTwoValue !== colorTwoOldValue;

  const isChanged =
    isImageValueChanged ||
    isOpacityValueChanged ||
    isColorOneValueChanged ||
    isColorTwoValueChanged;

  const onReset = () => {
    setValueImgPos(imgPosOldValue || "");
    if (positionOnly) return;
    setOpacity && setOpacity(opacityOldValue || 0);
    setColorOne && setColorOne(colorOneOldValue || "");
    setColorTwo && setColorTwo(colorTwoOldValue || "");
  };

  return (
    <InputWrapper>
      <LabelWithoutInput>Image Position:</LabelWithoutInput>
      <ImagePositionWrapper>
        <ImageOverlayAndPosition
          imgSrc={imgSrc}
          positionOnly={positionOnly}
          setValueImgPos={setValueImgPos}
          imgPosValue={imgPosValue}
          imgPosOldValue={imgPosOldValue || ""}
          setOpacity={setOpacity}
          opacityValue={opacityValue}
          setColorOne={setColorOne}
          colorOneValue={colorOneValue}
          setColorTwo={setColorTwo}
          colorTwoValue={colorTwoValue}
        />
      </ImagePositionWrapper>
      <ActionButtons
        onReset={onReset}
        onInsert={onInsert}
        isChanged={isChanged}
      />
    </InputWrapper>
  );
};

export const onInputChange = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
): void => {
  const value = event.target.value;

  if (typeof value === "string") {
    (setValue as React.Dispatch<React.SetStateAction<string>>)(value);
  } else if (typeof value === "number") {
    (setValue as React.Dispatch<React.SetStateAction<number>>)(value);
  }
};
