import { useGetData, useInsertValue } from "@/firebase/useFetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  SelectImagePosition,
  ImageInput,
  InputWithActionsAndOldValue,
  INPUT_TYPES,
  onInputChange,
} from "./../components/Fields/Fields";
import { OverlayProps } from "@/components/Header/Header";

const HeroSection = styled.div`
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  margin: 1rem 0;
  padding-bottom: 3rem;
`;

const Header = styled.h2`
  font-size: 2.5rem;
  letter-spacing: 0;
  padding-bottom: 1rem;

  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
  }
`;

const HeroSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IAdminHeroSection {
  imgSrc: string;
  info: {
    header: string;
  };
  overlay: OverlayProps;
}

export const AdminHeroSection = () => {
  const heroSectionRef = "/pages/about-us/hero";
  const [heroSectionData, fetchHeroSectionData] =
    useGetData<IAdminHeroSection | null>(
      heroSectionRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    heroImg: heroSectionRef + "/imgSrc",
    heroImagePos: heroSectionRef + "/imgPos",
    header: heroSectionRef + "/info/header",
    subtitle: heroSectionRef + "/info/subtitle",
    body: heroSectionRef + "/info/body",
    overlay: heroSectionRef + "/overlay",
  };

  const [imgSrc, setImgSrc] = useState("");
  const [imagePos, setImagePos] = useState("");

  const [opacity, setOpacity] = useState(0);
  const [colorOne, setColorOne] = useState("");
  const [colorTwo, setColorTwo] = useState("");

  const [header, setHeader] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setImgSrc(heroSectionData?.imgSrc || "");
    setHeader(heroSectionData?.info?.header || "");

    setImagePos(heroSectionData?.overlay?.imgPos || "");
    setColorOne(heroSectionData?.overlay?.colorTwo || "");
    setColorTwo(heroSectionData?.overlay?.colorOne || "");
    setOpacity(heroSectionData?.overlay?.opacity || 0.61);
  }, [heroSectionData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchHeroSectionData,
    });

  return (
    <HeroSection>
      <Header>Hero Section</Header>
      <HeroSectionContainer>
        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={header}
          onChange={(e) => onInputChange(e, setHeader)}
          label={"header"}
          name={"header"}
          initialValue={heroSectionData?.info?.header}
          onInsert={() =>
            onInsert({
              refPath: refs.header,
              data: header,
            })
          }
          setValue={setHeader}
        />

        {/* Image Link */}
        <ImageInput
          label={"Image Link"}
          value={imgSrc}
          name={"imgSrc"}
          onChange={(e) => onInputChange(e, setImgSrc)}
          initialValue={heroSectionData?.imgSrc}
          onInsert={() =>
            onInsert({
              refPath: refs.heroImg,
              data: imgSrc,
            })
          }
          setValue={setImgSrc}
          withActions={true}
        />

        {/* Image Position */}
        <SelectImagePosition
          onInsert={() =>
            insertValue({
              ref: refs.overlay,
              data: {
                imgPos: imagePos,
                imagePos: imagePos,
                opacity: opacity,
                colorOne: colorOne,
                colorTwo: colorTwo,
              },
              onSuccess: fetchHeroSectionData,
            })
          }
          imgSrc={imgSrc}
          setValueImgPos={setImagePos}
          imgPosValue={imagePos}
          imgPosOldValue={heroSectionData?.overlay?.imgPos}
          setOpacity={setOpacity}
          opacityValue={opacity}
          opacityOldValue={heroSectionData?.overlay?.opacity}
          setColorOne={setColorOne}
          colorOneValue={colorOne}
          colorOneOldValue={heroSectionData?.overlay?.colorOne}
          setColorTwo={setColorTwo}
          colorTwoValue={colorTwo}
          colorTwoOldValue={heroSectionData?.overlay?.colorTwo}
        />
      </HeroSectionContainer>
    </HeroSection>
  );
};
