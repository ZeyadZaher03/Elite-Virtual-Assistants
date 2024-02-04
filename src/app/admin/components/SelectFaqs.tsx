"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import { ResetButton, SaveButton } from "../StyledComponent";

const FaqsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const FaqsHeader = styled.h2`
  margin-top: 2rem 0;
  letter-spacing: 0;
`;

const FaqsContainer = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FaqItem = styled.div<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? "#f7fdff" : "#fff")};
  border-top: 4px solid
    ${({ $isSelected }) => ($isSelected ? "#53c1e9" : "#eee")};
  display: flex;
  border-radius: 2px;
  padding: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #f7fdff;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
`;

const FaqTitle = styled.span`
  display: block;
  font-weight: 500;
  margin-right: 1rem;
`;

const StyledResetButton = styled(ResetButton)`
  margin-right: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export const SelectFaqs = ({ selectedFaqRef }: { selectedFaqRef: string }) => {
  const [savedSelectedFaqs, fetchSavedSelectedFaqs] = useGetData(
    selectedFaqRef,
    [],
    () => {},
    () => {}
  );
  const [faqs, _] = useGetData(
    "/faqs/",
    [],
    () => {},
    () => {}
  );

  const [selectedFaqs, setSelectedFaqs] = useState<string[]>([]);

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setSelectedFaqs(savedSelectedFaqs || []);
  }, [savedSelectedFaqs, setSelectedFaqs]);

  const handleFaqItemClick = (faqId: string) => {
    if (!selectedFaqs.includes(faqId)) {
      setSelectedFaqs((prevSelectedFaqs) => [...prevSelectedFaqs, faqId]);
    } else {
      setSelectedFaqs((prevSelectedFaqs) =>
        prevSelectedFaqs.filter((id) => id !== faqId)
      );
    }
  };

  const onReset = () => setSelectedFaqs(savedSelectedFaqs);
  const onSave = () => {
    insertValue({
      ref: selectedFaqRef,
      data: selectedFaqs,
      onSuccess: fetchSavedSelectedFaqs,
    });
  };

  return (
    <FaqsWrapper>
      <FaqsHeader>Select Faqs</FaqsHeader>
      <FaqsContainer>
        {Object.entries(faqs).map(([idx, { title }]) => {
          return (
            <FaqItem
              onClick={() => handleFaqItemClick(idx)}
              $isSelected={selectedFaqs.includes(idx)}
              key={idx}
            >
              <div>
                <FaqTitle>{title}</FaqTitle>
              </div>
            </FaqItem>
          );
        })}
      </FaqsContainer>
      <ButtonContainer>
        <StyledResetButton onClick={onReset}>Reset</StyledResetButton>
        <SaveButton onClick={onSave}>Submit</SaveButton>
      </ButtonContainer>
    </FaqsWrapper>
  );
};
