import React, { useEffect, useState } from "react";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import styled from "styled-components";
import {
  onInputChange,
  INPUT_TYPES,
  InputWithActionsAndOldValue,
} from "./Fields/Fields";
import { SelectServices } from "./SelectServices";

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

interface IAdminServiceSectionData {
  header: string;
  subtitle: string;
  selectedServices: string[];
  buttonText: string;
}

export const AdminHomeServiceSection = () => {
  const serviceSectionRef = "/pages/home/services";

  const [serviceSectionData, fetchServiceSectionData] =
    useGetData<IAdminServiceSectionData | null>(
      serviceSectionRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    header: `${serviceSectionRef}"/header`,
    subtitle: `${serviceSectionRef}"/subtitle`,
    selectedServices: `${serviceSectionRef}"/selectedServices`,
    buttonText: `${serviceSectionRef}"/buttonText`,
  };
  //

  const [header, setHeader] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setHeader(serviceSectionData?.header || "");
    setSubtitle(serviceSectionData?.subtitle || "");
    setButtonText(serviceSectionData?.buttonText || "");
  }, [serviceSectionData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchServiceSectionData,
    });

  return (
    <HeroSection>
      <Header>Services Section</Header>
      <HeroSectionContainer>
        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={header}
          onChange={(e) => onInputChange(e, setHeader)}
          label={"Header"}
          name={"header"}
          initialValue={serviceSectionData?.header}
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
          initialValue={serviceSectionData?.subtitle}
          onInsert={() =>
            onInsert({
              refPath: refs.subtitle,
              data: subtitle,
            })
          }
          setValue={setSubtitle}
        />

        {/* Button Text */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={buttonText}
          onChange={(e) => onInputChange(e, setButtonText)}
          label={"Button Text"}
          name={"buttontext"}
          initialValue={serviceSectionData?.buttonText}
          onInsert={() =>
            onInsert({
              refPath: refs.buttonText,
              data: buttonText,
            })
          }
          setValue={setButtonText}
        />

        <SelectServices selectedServiceRef={refs.selectedServices} />
      </HeroSectionContainer>
    </HeroSection>
  );
};
