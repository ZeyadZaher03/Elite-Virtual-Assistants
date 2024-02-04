import { useGetData, useInsertValue } from "@/firebase/useFetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  INPUT_TYPES,
  InputWithActionsAndOldValue,
  onInputChange,
} from "./Fields/Fields";
import { SelectFaqs } from "./SelectFaqs";

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

interface IAdminFaqSectionData {
  header: string;
  buttonText: string;
}

export const AdminFaqSection = () => {
  const faqSectionRef = "/pages/home/faq";

  const [faqSectionData, fetchFaqSectionData] =
    useGetData<IAdminFaqSectionData | null>(
      faqSectionRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    header: `${faqSectionRef}/header`,
    subtitle: `${faqSectionRef}/subtitle`,
    selectedFaqs: `${faqSectionRef}/selectedFaqs`,
    buttonText: `${faqSectionRef}/buttonText`,
  };

  const [header, setHeader] = useState("");
  const [buttonText, setButtonText] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setHeader(faqSectionData?.header || "");
    setButtonText(faqSectionData?.buttonText || "");
  }, [faqSectionData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchFaqSectionData,
    });

  return (
    <HeroSection>
      <Header>FAQ Section</Header>
      <HeroSectionContainer>
        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={header}
          onChange={(e) => onInputChange(e, setHeader)}
          label={"Header"}
          name={"header"}
          initialValue={faqSectionData?.header}
          onInsert={() =>
            onInsert({
              refPath: refs.header,
              data: header,
            })
          }
          setValue={setHeader}
        />

        {/* Button Text */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={buttonText}
          onChange={(e) => onInputChange(e, setButtonText)}
          label={"Button Text"}
          name={"buttontext"}
          initialValue={faqSectionData?.buttonText}
          onInsert={() =>
            onInsert({
              refPath: refs.buttonText,
              data: buttonText,
            })
          }
          setValue={setButtonText}
        />
        <SelectFaqs selectedFaqRef={refs.selectedFaqs} />
      </HeroSectionContainer>
    </HeroSection>
  );
};
