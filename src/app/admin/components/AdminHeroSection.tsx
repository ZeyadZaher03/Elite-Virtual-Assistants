import React, { useEffect, useState } from "react";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import styled from "styled-components";
import {
  SelectImagePosition,
  ImageInput,
  onInputChange,
  INPUT_TYPES,
  InputWithActionsAndOldValue,
} from "./Fields/Fields";
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

interface IAdminHeroSectionData {
  info: {
    header: string;
    subtitle: string;
    body: string;
  };
  heroImg: string;
  imgSrc: string;
  overlay: OverlayProps;
}

export const AdminHeroSection = () => {
  const heroSectionRef = "/pages/home/hero";

  const [heroSectionData, fetchHeroSectionData] =
    useGetData<IAdminHeroSectionData | null>(
      heroSectionRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    header: `${heroSectionRef}/info/header`,
    subtitle: `${heroSectionRef}/info/subtitle`,
    body: `${heroSectionRef}/info/body`,
    imgSrc: `${heroSectionRef}/imgSrc`,
    overlay: `${heroSectionRef}/overlay`,
  };

  const [imgSrc, setImgSrc] = useState("");
  const [imgPos, setImgPos] = useState("");

  const [opacity, setOpacity] = useState(0.71);
  const [colorOne, setColorOne] = useState("");
  const [colorTwo, setColorTwo] = useState("");

  const [header, setHeader] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setImgSrc(heroSectionData?.imgSrc || "");
    setHeader(heroSectionData?.info?.header || "");
    setSubtitle(heroSectionData?.info?.subtitle || "");
    setBody(heroSectionData?.info?.body || "");

    setImgPos(heroSectionData?.overlay?.imgPos || "");
    setColorOne(heroSectionData?.overlay?.colorOne || "");
    setColorTwo(heroSectionData?.overlay?.colorTwo || "");
    setOpacity(heroSectionData?.overlay?.opacity || 0.71);
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
          label={"Header"}
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

        {/* Sub Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={subtitle}
          onChange={(e) => onInputChange(e, setSubtitle)}
          label={"Subtitle"}
          name={"subtitle"}
          initialValue={heroSectionData?.info?.subtitle}
          onInsert={() =>
            onInsert({
              refPath: refs.subtitle,
              data: subtitle,
            })
          }
          setValue={setSubtitle}
        />

        {/* Body */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXTAREA}
          value={body}
          onChange={(e) => onInputChange(e, setBody)}
          label={"Body"}
          name={"Body"}
          initialValue={heroSectionData?.info?.body}
          onInsert={() =>
            onInsert({
              refPath: refs.body,
              data: body,
            })
          }
          setValue={setBody}
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
              refPath: refs.imgSrc,
              data: imgSrc,
            })
          }
          setValue={setImgSrc}
          withActions={true}
        />

        {/* Image Position */}
        <SelectImagePosition
          onInsert={() =>
            onInsert({
              refPath: refs.overlay,
              data: {
                imgPos: imgPos,
                imagePos: imgPos,
                opacity: opacity,
                colorOne: colorOne,
                colorTwo: colorTwo,
              },
            })
          }
          imgSrc={imgSrc}
          setValueImgPos={setImgPos}
          imgPosValue={imgPos}
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
