import { useGetData, useInsertValue } from "@/firebase/useFetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  SelectImagePosition,
  ImageInput,
  InputWithActionsAndOldValue,
  INPUT_TYPES,
  onInputChange,
} from "./Fields/Fields";

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

interface IAdminAboutUsSectionData {
  title: string;
  subtitle: string;
  imgSrc: string;
  overlay: {
    imgPos: string;
  };
}

export const AdminAboutUsSection = () => {
  const aboutUsSectionRef = "/pages/home/aboutUs";

  const [aboutSectionData, fetchAboutSectionData] =
    useGetData<IAdminAboutUsSectionData | null>(
      aboutUsSectionRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    title: `${aboutUsSectionRef}/title`,
    subtitle: `${aboutUsSectionRef}/subtitle`,
    imgSrc: `${aboutUsSectionRef}/imgSrc`,
    imgPos: `${aboutUsSectionRef}/imgPos`,
  };

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgPos, setImgPos] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setTitle(aboutSectionData?.title || "");
    setSubtitle(aboutSectionData?.subtitle || "");
    setImgSrc(aboutSectionData?.imgSrc || "");
    setImgPos(aboutSectionData?.overlay?.imgPos || "");
  }, [aboutSectionData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchAboutSectionData,
    });

  return (
    <HeroSection>
      <Header>About Us Section</Header>
      <HeroSectionContainer>
        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={title}
          onChange={(e) => onInputChange(e, setTitle)}
          label={"Header"}
          name={"header"}
          initialValue={aboutSectionData?.title}
          onInsert={() =>
            onInsert({
              refPath: refs.title,
              data: title,
            })
          }
          setValue={setTitle}
        />

        {/* Sub Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={subtitle}
          onChange={(e) => onInputChange(e, setSubtitle)}
          label={"Subtitle"}
          name={"subtitle"}
          initialValue={aboutSectionData?.subtitle}
          onInsert={() =>
            onInsert({
              refPath: refs.subtitle,
              data: subtitle,
            })
          }
          setValue={setSubtitle}
        />

        {/* Image Link */}
        <ImageInput
          label={"Image Link"}
          value={imgSrc}
          name={"imgSrc"}
          onChange={(e) => onInputChange(e, setImgSrc)}
          initialValue={aboutSectionData?.imgSrc}
          onInsert={() =>
            onInsert({
              refPath: refs.imgSrc,
              data: imgSrc,
            })
          }
          setValue={setImgSrc}
          withActions={true}
        />

        {/* img Pos */}
        <SelectImagePosition
          positionOnly={true}
          onInsert={() =>
            insertValue({
              ref: refs.imgPos,
              data: {
                imgPos: imgPos,
              },
              onSuccess: fetchAboutSectionData,
            })
          }
          imgSrc={imgSrc}
          setValueImgPos={setImgPos}
          imgPosValue={imgPos}
          imgPosOldValue={aboutSectionData?.overlay?.imgPos}
        />
      </HeroSectionContainer>
    </HeroSection>
  );
};
