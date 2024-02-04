"use client";
import React, { useCallback, useState } from "react";
import { pushData, removeNode } from "@/firebase";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import {
  TextArea,
  TextInput,
  onInputChange,
} from "../components/Fields/Fields";
import { SaveButton } from "../StyledComponent";
import { useGetData } from "@/firebase/useFetch";

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

const FaqItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  border-top: 4px solid #eee;
  border-radius: 2px;
  padding: 1rem;
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

const HeroSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSaveButton = styled(SaveButton)`
  margin-top: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Edit = styled.a`
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 1rem;
  background-color: #1a2c55;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  margin-right: 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Delete = styled.button`
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 1rem;
  background-color: #551a1a;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  flex: 1;
`;

type FAQs = {
  body: string;
  title: string;
}[];

type FAQData = {
  body: string;
  title: string;
};

const Faqs = ({ faqs, fetchFaqs }: { faqs: FAQs; fetchFaqs: () => void }) => (
  <FaqsWrapper>
    <FaqsHeader>Faqs</FaqsHeader>
    <FaqsContainer>
      {Object.entries(faqs).map(([idx, { title }]) => {
        return (
          <FaqItem key={idx}>
            <div>
              <FaqTitle>{title}</FaqTitle>
            </div>
            <ButtonContainer>
              <Edit href={`/admin/edit-faq/${idx}`}>Edit</Edit>
              <Delete
                onClick={() => {
                  toast("Deleting...");

                  removeNode({
                    refPath: `/faqs/${idx}`,
                    onSuccess: () => {
                      toast("Faq Deleted");
                    },
                    onError: () => {
                      toast("Failed", { type: "error" });
                    },
                  });
                  fetchFaqs();
                }}
              >
                Delete
              </Delete>
            </ButtonContainer>
          </FaqItem>
        );
      })}
    </FaqsContainer>
  </FaqsWrapper>
);

const AddFAQ: React.FC = () => {
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [faqs, getFaqs] = useGetData<FAQs>(
    "/faqs",
    [],
    () => {},
    () => {}
  );

  const emptyInputs = () => {
    setBody("");
    setTitle("");
  };

  const addFAQ = useCallback(
    (data: FAQData) => {
      const { body, title } = data;
      if (body && title) {
        toast("Inserting...");
        return pushData({
          refPath: "/faqs/",
          data,
          callback: () => {
            toast.dismiss();
            toast("FAQ Saved");
            emptyInputs();
            getFaqs();
          },
          onError: () => {
            toast.dismiss();
            emptyInputs();
            toast("Failed", { type: "error" });
          },
        });
      } else {
        toast("body, name, title are not present", {
          type: "error",
        });
        console.error("Invalid data. Service not saved.");
      }
    },
    [getFaqs]
  );

  const saveFAQ = () => {
    const data = {
      body,
      title,
    };

    addFAQ(data);
  };

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Add FAQ</AdminHeader>
        <HeroSectionContainer>
          {/* Header */}
          <TextInput
            value={title}
            onChange={(e) => onInputChange(e, setTitle)}
            label={"header"}
            name={"header"}
          />
          {/* Body */}
          <TextArea
            value={body}
            onChange={(e) => onInputChange(e, setBody)}
            name={"subtitle"}
            label={"Subtitle"}
          />
          <StyledSaveButton onClick={saveFAQ}>Save</StyledSaveButton>
        </HeroSectionContainer>
        <Faqs faqs={faqs} fetchFaqs={getFaqs} />
      </AdminWrapper>
    </>
  );
};

export default AddFAQ;
