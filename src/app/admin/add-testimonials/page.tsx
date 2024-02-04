"use client";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { pushData, removeNode } from "@/firebase";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextArea,
  TextInput,
  onInputChange,
} from "../components/Fields/Fields";
import { SaveButton } from "../StyledComponent";
import { useGetData } from "@/firebase/useFetch";

const StyledSaveButton = styled(SaveButton)`
  margin: 2rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const Header = styled.h2`
  margin-top: 2rem 0;
  letter-spacing: 0;
`;

const Container = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
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

const Title = styled.span`
  display: block;
  font-weight: 500;
  margin-right: 1rem;
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

type TestimonialData = {
  title: string;
  body: string;
  name: string;
};

type Testimonials = {
  title: string;
  body: string;
  name: string;
}[];

const Testimonials = ({
  testimonials,
  fetchTestimonial,
}: {
  testimonials: Testimonials;
  fetchTestimonial: () => void;
}) => (
  <Wrapper>
    <Header>Testimonials</Header>
    <Container>
      {Object.entries(testimonials).map(([idx, { body }]) => {
        return (
          <Item key={idx}>
            <div>
              <Title>{body}</Title>
            </div>
            <ButtonContainer>
              <Edit href={`/admin/edit-testimonials/${idx}`}>Edit</Edit>
              <Delete
                onClick={() => {
                  toast("Deleting...");

                  removeNode({
                    refPath: `/testimonials/${idx}`,
                    onSuccess: () => {
                      toast("Testimonial Deleted");
                    },
                    onError: () => {
                      toast("Failed", { type: "error" });
                    },
                  });
                  fetchTestimonial();
                }}
              >
                Delete
              </Delete>
            </ButtonContainer>
          </Item>
        );
      })}
    </Container>
  </Wrapper>
);

const EditTestimonial: React.FC = () => {
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [testimonials, getTestimonials] = useGetData<Testimonials>(
    "/testimonials",
    [],
    () => {},
    () => {}
  );

  const emptyInputs = () => {
    setBody("");
    setTitle("");
    setName("");
  };

  const addTestimonial = useCallback(
    (data: TestimonialData) => {
      const { body, name, title } = data;

      if (body && name && title) {
        toast("Inserting...");

        return pushData({
          refPath: "/testimonials/",
          data,
          callback: () => {
            toast.dismiss();
            toast("Testimonial Saved");
            emptyInputs();
            getTestimonials();
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
    [getTestimonials]
  );

  const saveTestimonial = () => {
    const data = {
      body,
      name,
      title,
    };

    addTestimonial(data);
  };

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Add Testimonials</AdminHeader>
        {/* Name */}
        <TextInput
          value={name}
          onChange={(e) => onInputChange(e, setName)}
          label={"Name"}
          name={"Name"}
        />
        {/* Name */}
        <TextInput
          value={title}
          onChange={(e) => onInputChange(e, setTitle)}
          label={"Title"}
          name={"title"}
        />
        {/* Name */}
        <TextArea
          value={body}
          onChange={(e) => onInputChange(e, setBody)}
          label={"Body"}
          name={"body"}
        />
        <StyledSaveButton onClick={saveTestimonial}>Save</StyledSaveButton>
        <Testimonials
          testimonials={testimonials}
          fetchTestimonial={getTestimonials}
        />
      </AdminWrapper>
    </>
  );
};

export default EditTestimonial;
