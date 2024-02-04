"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ResetButton, SaveButton } from "../StyledComponent";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import "react-toastify/dist/ReactToastify.css";

const ServicesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const ServicesHeader = styled.h2`
  margin-top: 2rem 0;
  letter-spacing: 0;
`;

const ServicesContainer = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceItem = styled.div<{ $isSelected: boolean }>`
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

const ServiceTitle = styled.span`
  display: block;
  font-weight: 500;
  margin-right: 1rem;
`;

const ServiceLink = styled.a`
  display: block;
  font-size: 12px;
  margin-top: 1rem;
`;

const StyledResetButton = styled(ResetButton)`
  margin-right: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export const SelectServices = ({
  selectedServiceRef,
}: {
  selectedServiceRef: string;
}) => {
  const [savedSelectedServices, fetchSavedSelectedServices] = useGetData(
    selectedServiceRef,
    [],
    () => {},
    () => {}
  );
  const [services, _] = useGetData(
    "/services/",
    [],
    () => {},
    () => {}
  );

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setSelectedServices(savedSelectedServices || []);
  }, [savedSelectedServices, insertValue]);

  const handleServiceItemClick = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      if (selectedServices.length < 3) {
        setSelectedServices((prevSelectedServices) => [
          ...prevSelectedServices,
          serviceId,
        ]);
      } else {
        alert("You can select a maximum of 3 Services.");
      }
    } else {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter((id) => id !== serviceId)
      );
    }
  };

  const onReset = () => setSelectedServices(savedSelectedServices);
  const onSave = () => {
    insertValue({
      ref: selectedServiceRef,
      data: selectedServices,
      onSuccess: fetchSavedSelectedServices,
    });
  };

  return (
    <ServicesWrapper>
      <ServicesHeader>Select Services</ServicesHeader>
      <ServicesContainer>
        {Object.entries(services).map(([idx, { title }]) => {
          return (
            <ServiceItem
              onClick={() => handleServiceItemClick(idx)}
              $isSelected={selectedServices.includes(idx)}
              key={idx}
            >
              <div>
                <ServiceTitle>{title}</ServiceTitle>
                <ServiceLink target="__blank" href={`/service/${idx}`}>
                  Visit
                </ServiceLink>
              </div>
            </ServiceItem>
          );
        })}
      </ServicesContainer>
      <ButtonContainer>
        <StyledResetButton onClick={onReset}>Reset</StyledResetButton>
        <SaveButton onClick={onSave}>Submit</SaveButton>
      </ButtonContainer>
    </ServicesWrapper>
  );
};
