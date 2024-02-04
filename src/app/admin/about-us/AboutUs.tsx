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

interface IAboutUsSectionData {
  imgSrc: string;
  header: string;
  subtitle: string;
  body: string;
  sectionHeader: string;
  overlay: {
    imgPos: string;
  };
}

export const AboutUsSection = () => {
  const aboutUsSectionRef = "/pages/about-us/about-us";
  const [aboutUsPageData, fetchAboutUsPageData] =
    useGetData<IAboutUsSectionData | null>(
      aboutUsSectionRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    header: aboutUsSectionRef + "/header",
    subtitle: aboutUsSectionRef + "/subtitle",
    imgSrc: aboutUsSectionRef + "/imgSrc",
    body: aboutUsSectionRef + "/body",
    imgPos: aboutUsSectionRef + "/overlay/imgPos",
  };

  const [header, setHeader] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgPos, setImgPos] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setImgSrc(aboutUsPageData?.imgSrc || "");
    setHeader(aboutUsPageData?.header || "");
    setSubtitle(aboutUsPageData?.subtitle || "");
    setBody(aboutUsPageData?.body || "");
    setImgPos(aboutUsPageData?.overlay?.imgPos || "");
  }, [aboutUsPageData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchAboutUsPageData,
    });

  return (
    <HeroSection>
      <Header>About Us Section</Header>
      <HeroSectionContainer>
        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={header}
          onChange={(e) => onInputChange(e, setHeader)}
          label={"header"}
          name={"header"}
          initialValue={aboutUsPageData?.header}
          onInsert={() =>
            onInsert({
              refPath: refs.header,
              data: header,
            })
          }
          setValue={setHeader}
        />

        {/* Subtitle */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={subtitle}
          onChange={(e) => onInputChange(e, setSubtitle)}
          name={"subtitle"}
          label={"Subtitle"}
          initialValue={aboutUsPageData?.subtitle}
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
          name={"subtitle"}
          label={"Subtitle"}
          initialValue={aboutUsPageData?.body}
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
          initialValue={aboutUsPageData?.imgSrc}
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
              onSuccess: fetchAboutUsPageData,
            })
          }
          imgSrc={imgSrc}
          setValueImgPos={setImgPos}
          imgPosValue={imgPos}
          imgPosOldValue={aboutUsPageData?.overlay?.imgPos}
        />
      </HeroSectionContainer>
    </HeroSection>
  );
};
