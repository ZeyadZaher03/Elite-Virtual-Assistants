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

type TestimonialData = {
  title: string;
  body: string;
  name: string;
};

interface EditTestimonialProps {
  params: {
    id: string;
  };
}

const EditTestimonials: React.FC<EditTestimonialProps> = ({ params }) => {
  const { id } = params;
  const refPath = `/testimonials/${id}`;

  const [testimonial, fetchTestimonial] = useGetData<TestimonialData | null>(
    refPath,
    null,
    () => {},
    () => {}
  );

  const refs = {
    title: `${refPath}/title`,
    body: `${refPath}/body`,
    name: `${refPath}/name`,
  };

  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setTitle(testimonial?.title || "");
    setName(testimonial?.name || "");
    setBody(testimonial?.body || "");
  }, [testimonial, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchTestimonial,
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
            initialValue={testimonial?.title}
            onInsert={() =>
              onInsert({
                refPath: refs.title,
                data: title,
              })
            }
            setValue={setTitle}
          />

          {/* Name */}
          <InputWithActionsAndOldValue
            type={INPUT_TYPES.TEXT}
            value={name}
            onChange={(e) => onInputChange(e, setName)}
            label={"Name"}
            name={"name"}
            initialValue={testimonial?.name}
            onInsert={() =>
              onInsert({
                refPath: refs.name,
                data: name,
              })
            }
            setValue={setName}
          />

          {/* Body */}
          <InputWithActionsAndOldValue
            type={INPUT_TYPES.TEXTAREA}
            value={body}
            onChange={(e) => onInputChange(e, setBody)}
            label={"Body"}
            name={"body"}
            initialValue={testimonial?.body}
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

export default EditTestimonials;
