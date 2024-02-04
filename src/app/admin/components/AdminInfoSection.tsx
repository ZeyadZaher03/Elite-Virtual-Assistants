import { useGetData, useInsertValue } from "@/firebase/useFetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
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

interface IAdminInfoSectionData {
  infoOneTitle: string;
  infoOneBody: string;
  infoTwoTitle: string;
  infoTwoBody: string;
  infoThreeTitle: string;
  infoThreeBody: string;
}

export const AdminInfoSection = () => {
  const infoSectionRef = "/pages/home/info";
  const [infoSectionData, fetchInfoSectionData] =
    useGetData<IAdminInfoSectionData | null>(
      infoSectionRef,
      null,
      () => {},
      () => {}
    );
  const refs = {
    infoOneTitle: `${infoSectionRef}/infoOneTitle`,
    infoOneBody: `${infoSectionRef}/infoOneBody`,
    infoTwoTitle: `${infoSectionRef}/infoTwoTitle`,
    infoTwoBody: `${infoSectionRef}/infoTwoBody`,
    infoThreeTitle: `${infoSectionRef}/infoThreeTitle`,
    infoThreeBody: `${infoSectionRef}/infoThreeBody`,
  };

  const [infoOneTitle, setInfoOneTitle] = useState("");
  const [infoOneBody, setInfoOneBody] = useState("");

  const [infoTwoTitle, setInfoTwoTitle] = useState("");
  const [infoTwoBody, setInfoTwoBody] = useState("");

  const [infoThreeTitle, setInfoThreeTitle] = useState("");
  const [infoThreeBody, setInfoThreeBody] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setInfoOneTitle(infoSectionData?.infoOneTitle || "");
    setInfoOneBody(infoSectionData?.infoOneBody || "");
    setInfoTwoTitle(infoSectionData?.infoTwoTitle || "");
    setInfoTwoBody(infoSectionData?.infoTwoBody || "");
    setInfoThreeTitle(infoSectionData?.infoThreeTitle || "");
    setInfoThreeBody(infoSectionData?.infoThreeBody || "");
  }, [infoSectionData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchInfoSectionData,
    });

  return (
    <HeroSection>
      <Header>Info Section</Header>
      <HeroSectionContainer>
        {/* Info 1 Title */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={infoOneTitle}
          onChange={(e) => onInputChange(e, setInfoOneTitle)}
          label={"Info 1 Title"}
          name={"infoOneTitle"}
          initialValue={infoSectionData?.infoOneTitle}
          onInsert={() =>
            onInsert({
              refPath: refs.infoOneTitle,
              data: infoOneTitle,
            })
          }
          setValue={setInfoOneTitle}
        />

        {/* Info 1 Body */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={infoOneBody}
          onChange={(e) => onInputChange(e, setInfoOneBody)}
          label={"Info 1 Body"}
          name={"infoOneBody"}
          initialValue={infoSectionData?.infoOneBody}
          onInsert={() =>
            onInsert({
              refPath: refs.infoOneBody,
              data: infoOneBody,
            })
          }
          setValue={setInfoOneBody}
        />

        {/* Info 2 Title */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={infoTwoTitle}
          onChange={(e) => onInputChange(e, setInfoTwoTitle)}
          label={"Info 2 Title"}
          name={"infoTwoTitle"}
          initialValue={infoSectionData?.infoTwoTitle}
          onInsert={() =>
            onInsert({
              refPath: refs.infoTwoTitle,
              data: infoTwoTitle,
            })
          }
          setValue={setInfoTwoTitle}
        />

        {/* Info 2 Body */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={infoTwoBody}
          onChange={(e) => onInputChange(e, setInfoTwoBody)}
          label={"Info 2 Body"}
          name={"infoTwoBody"}
          initialValue={infoSectionData?.infoTwoBody}
          onInsert={() =>
            onInsert({
              refPath: refs.infoTwoBody,
              data: infoTwoBody,
            })
          }
          setValue={setInfoTwoBody}
        />

        {/* Info 3 Title */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={infoThreeTitle}
          onChange={(e) => onInputChange(e, setInfoThreeTitle)}
          label={"Info 3 Title"}
          name={"infoThreeTitle"}
          initialValue={infoSectionData?.infoThreeTitle}
          onInsert={() =>
            onInsert({
              refPath: refs.infoThreeTitle,
              data: infoThreeTitle,
            })
          }
          setValue={setInfoThreeTitle}
        />

        {/* Info 3 Body */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={infoThreeBody}
          onChange={(e) => onInputChange(e, setInfoThreeBody)}
          label={"Info 3 Body"}
          name={"infoThreeBody"}
          initialValue={infoSectionData?.infoThreeBody}
          onInsert={() =>
            onInsert({
              refPath: refs.infoThreeBody,
              data: infoThreeBody,
            })
          }
          setValue={setInfoTwoBody}
        />
      </HeroSectionContainer>
    </HeroSection>
  );
};
