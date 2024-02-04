"use client";
import React, { useEffect, useState } from "react";
import { AdminHeader, AdminNav, AdminWrapper } from "../../components/AdminNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import {
  INPUT_TYPES,
  InputWithActionsAndOldValue,
  onInputChange,
} from "../../components/Fields/Fields";
import { useGetData, useInsertValue } from "@/firebase/useFetch";

const HeroSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type FAQData = {
  title: string;
  body: string;
};

interface EditFAQProps {
  params: {
    id: string;
  };
}

const EditFAQ: React.FC<EditFAQProps> = ({ params }) => {
  const { id } = params;
  const refPath = `/faqs/${id}`;

  const [faq, fetFaq] = useGetData<FAQData | null>(
    refPath,
    null,
    () => {},
    () => {}
  );

  const refs = {
    title: `${refPath}/title`,
    body: `${refPath}/body`,
  };

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setTitle(faq?.title || "");
    setBody(faq?.body || "");
  }, [faq, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetFaq,
    });

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Edit FAQ</AdminHeader>
        <HeroSectionContainer>
          {/* Header */}
          <InputWithActionsAndOldValue
            type={INPUT_TYPES.TEXT}
            value={title}
            onChange={(e) => onInputChange(e, setTitle)}
            label={"header"}
            name={"header"}
            initialValue={faq?.title}
            onInsert={() =>
              onInsert({
                refPath: refs.title,
                data: title,
              })
            }
            setValue={setTitle}
          />

          {/* Body */}
          <InputWithActionsAndOldValue
            type={INPUT_TYPES.TEXTAREA}
            value={body}
            onChange={(e) => onInputChange(e, setBody)}
            label={"Body"}
            name={"body"}
            initialValue={faq?.body}
            onInsert={() =>
              onInsert({
                refPath: refs.body,
                data: body,
              })
            }
            setValue={setBody}
          />
        </HeroSectionContainer>
      </AdminWrapper>
    </>
  );
};

export default EditFAQ;
