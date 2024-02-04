"use client";

import { Overlay } from "@/components/Overlay/Overlay";
import React, { FC } from "react";
import styled from "styled-components";

import "./ImagePosition.scss";

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const PositionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-right: 2rem;

  @media only screen and (max-width: 600px) {
    margin-right: 0rem;
    margin-bottom: 1rem;
  }
`;

const ImagePositionTest = styled.div<{
  $imgSrc?: string;
  $imgPos: string;
}>`
  position: relative;
  background-position: ${({ $imgPos }) => $imgPos};
  background-size: cover;
  background-image: url(${({ $imgSrc }) => $imgSrc});
  width: 40rem;
  height: 20rem;

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 15rem;
    margin-bottom: 1rem;
  }
`;

const OverLayAdjustmentWrapper = styled.div`
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
`;

const StyledPositionItem = styled.div<{
  $selected: boolean;
  $oldValue: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0.5rem 1rem 0.5rem 0;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  width: 8rem;
  padding: 2rem;
  height: 6rem;
  font-size: 0.8rem;
  flex: 1;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #fdfdfd;
  border: 1px solid #ddd;

  ${({ $oldValue }) => $oldValue && "background-color: #525252"};
  ${({ $oldValue }) => $oldValue && "border: 2px solid #3f3f3f"};
  ${({ $oldValue }) => $oldValue && "color: #fff"};

  ${({ $selected }) => $selected && "background-color: #c7e1eb"};
  ${({ $selected }) => $selected && "border: 1px solid #2293c0"};
  ${({ $selected }) => $selected && "color: #000"};
  ${({ $selected }) =>
    $selected &&
    "box-shadow: rgba(0, 0, 0, 0.08) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"};

  @media only screen and (max-width: 600px) {
    width: 6rem;
    height: 6rem;
    margin: 0.2rem 0.5rem 0.2rem 0;
    padding: 1rem;
  }
`;

const Label = styled.label`
  margin-bottom: 0.2rem;
`;

const StyledInput = styled.input`
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  margin-bottom: 0.5rem;
  width: 15rem;
  display: flex;
  flex-direction: column;
`;

interface PositionItemProps {
  onClick: () => void;
  value: string;
  selected: boolean;
  oldValue: boolean;
}

export const PositionItem: FC<PositionItemProps> = ({
  onClick,
  value,
  selected,
  oldValue,
}) => {
  return (
    <StyledPositionItem
      onClick={onClick}
      data-value={value}
      $selected={selected}
      $oldValue={oldValue}
      data-selected={selected}
    >
      {value}
    </StyledPositionItem>
  );
};

interface ImageOverlayAndPositionProps {
  imgSrc: string;
  setValueImgPos: (value: string) => void;
  imgPosOldValue: string;
  imgPosValue: string;
  setOpacity?: (value: number) => void;
  opacityValue?: number;
  setColorOne?: (value: string) => void;
  colorOneValue?: string;
  setColorTwo?: (value: string) => void;
  colorTwoValue?: string;
  positionOnly: boolean;
}

export const ImageOverlayAndPosition: FC<ImageOverlayAndPositionProps> = ({
  imgSrc,
  setValueImgPos,
  imgPosOldValue,
  imgPosValue,
  setOpacity,
  opacityValue,
  setColorOne,
  colorOneValue,
  setColorTwo,
  colorTwoValue,
  positionOnly,
}) => {
  const imagePositionOptions = [
    "top left",
    "top center",
    "top right",
    "center left",
    "center center",
    "center right",
    "bottom left",
    "bottom center",
    "bottom right",
  ];

  return (
    <Wrapper>
      <Container>
        <PositionsWrapper>
          {imagePositionOptions.map((imgPos) => (
            <PositionItem
              key={imgPos}
              value={imgPos}
              selected={imgPos === imgPosValue}
              oldValue={imgPos === imgPosOldValue}
              onClick={() => setValueImgPos(imgPos)}
            />
          ))}
        </PositionsWrapper>

        {!positionOnly && (
          <OverLayAdjustmentWrapper>
            <InputContainer>
              <Label>Color One: {colorOneValue}</Label>
              <StyledInput
                type="color"
                value={colorOneValue}
                onChange={({ target }) =>
                  setColorOne && setColorOne(target.value)
                }
              />
            </InputContainer>
            <InputContainer>
              <Label>Color Two: {colorTwoValue}</Label>
              <StyledInput
                type="color"
                value={colorTwoValue}
                onChange={({ target }) =>
                  setColorTwo && setColorTwo(target.value)
                }
              />
            </InputContainer>
            <InputContainer>
              <Label>Opacity: {opacityValue}</Label>
              <StyledInput
                type="range"
                min="0"
                max="100"
                onChange={({ target }) =>
                  setOpacity && setOpacity(parseFloat(target.value) / 100)
                }
                value={(opacityValue || 0) * 100}
              />
            </InputContainer>
          </OverLayAdjustmentWrapper>
        )}

        <ImagePositionTest $imgPos={imgPosValue} $imgSrc={imgSrc}>
          {!positionOnly && (
            <Overlay
              className="img-pos-input-overlay"
              opacity={opacityValue || 0}
              colorOne={colorOneValue || "#000"}
              colorTwo={colorTwoValue || "#000"}
            />
          )}
        </ImagePositionTest>
      </Container>
    </Wrapper>
  );
};
