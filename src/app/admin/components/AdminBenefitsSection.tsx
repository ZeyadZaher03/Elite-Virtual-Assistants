import { useGetData, useInsertValue } from "@/firebase/useFetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  INPUT_TYPES,
  InputWithActionsAndOldValue,
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

interface IAdminPartnerSectionData {
  title: string;
  benefitsOne: string;
  benefitsTwo: string;
  benefitsThree: string;
}

export const AdminBenefitsSection = () => {
  const partnerUpSectionRef = "/pages/home/partnerUp";

  const [partnerUpSectionData, fetchPartnerUpSectionData] =
    useGetData<IAdminPartnerSectionData | null>(
      partnerUpSectionRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    title: `${partnerUpSectionRef}/title`,
    benefitsOne: `${partnerUpSectionRef}/benefitsOne`,
    benefitsTwo: `${partnerUpSectionRef}/benefitsTwo`,
    benefitsThree: `${partnerUpSectionRef}/benefitsThree`,
  };

  const [title, setTitle] = useState("");
  const [benefitsOne, setBenefitsOne] = useState("");
  const [benefitsTwo, setBenefitsTwo] = useState("");
  const [benefitsThree, setBenefitsThree] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setTitle(partnerUpSectionData?.title || "");
    setBenefitsOne(partnerUpSectionData?.benefitsOne || "");
    setBenefitsTwo(partnerUpSectionData?.benefitsTwo || "");
    setBenefitsThree(partnerUpSectionData?.benefitsThree || "");
  }, [partnerUpSectionData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchPartnerUpSectionData,
    });

  return (
    <HeroSection>
      <Header>Benefits Section</Header>
      <HeroSectionContainer>
        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={title}
          onChange={(e) => onInputChange(e, setTitle)}
          label={"Header"}
          name={"header"}
          initialValue={partnerUpSectionData?.title}
          onInsert={() =>
            onInsert({
              refPath: refs.title,
              data: title,
            })
          }
          setValue={setTitle}
        />

        {/* benefitsOne */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={benefitsOne}
          onChange={(e) => onInputChange(e, setBenefitsOne)}
          label={"Benefits One"}
          name={"benefitsOne"}
          initialValue={partnerUpSectionData?.benefitsOne}
          onInsert={() =>
            onInsert({
              refPath: refs.benefitsOne,
              data: benefitsOne,
            })
          }
          setValue={setTitle}
        />

        {/* benefitsTwo */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={benefitsTwo}
          onChange={(e) => onInputChange(e, setBenefitsTwo)}
          label={"Benefits Two"}
          name={"benefitsTwo"}
          initialValue={partnerUpSectionData?.benefitsTwo}
          onInsert={() =>
            onInsert({
              refPath: refs.benefitsTwo,
              data: benefitsTwo,
            })
          }
          setValue={setTitle}
        />

        {/* benefitsThree */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={benefitsThree}
          onChange={(e) => onInputChange(e, setBenefitsThree)}
          label={"Benefits Three"}
          name={"benefitsThree"}
          initialValue={partnerUpSectionData?.benefitsThree}
          onInsert={() =>
            onInsert({
              refPath: refs.benefitsThree,
              data: benefitsThree,
            })
          }
          setValue={setTitle}
        />
      </HeroSectionContainer>
    </HeroSection>
  );
};
