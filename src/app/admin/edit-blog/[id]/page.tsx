"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { AdminHeader, AdminNav, AdminWrapper } from "../../components/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ImageInput, onInputChange } from "../../components/Fields/Fields";
import { SaveButton } from "../../StyledComponent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import {
  ActionButtons,
  INPUT_TYPES,
  InputWithActionsAndOldValue,
} from "../../components/Fields/Fields";

const StyledActionButtons = styled(ActionButtons)`
  margin-top: 2rem;
`;
const StyledReactQuill = styled(ReactQuill)`
  margin-top: 2rem;
`;

interface EditBlogProps {
  params: {
    id: string;
  };
}

type BlogData = {
  title: string;
  description: string;
  body: any; // Changed type for body
  imgSrc: string;
};

const EditBlog: React.FC<EditBlogProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const refPath = `/blogs/${id}`;

  const [blog, fetchBlog] = useGetData<BlogData | null>(
    refPath,
    null,
    () => {},
    () => {}
  );

  const refs = {
    title: `${refPath}/title`,
    description: `${refPath}/description`,
    body: `${refPath}/body`,
    imgSrc: `${refPath}/imgSrc`,
  };

  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setTitle(blog?.title || "");
    setImgSrc(blog?.imgSrc || "");
    setDescription(blog?.description || "");
    setBody(blog?.body || "");
  }, [blog, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchBlog,
    });

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Edit Blog</AdminHeader>

        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={title}
          onChange={(e) => onInputChange(e, setTitle)}
          label={"header"}
          name={"header"}
          initialValue={blog?.title}
          onInsert={() =>
            onInsert({
              refPath: refs.title,
              data: title,
            })
          }
          setValue={setTitle}
        />

        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXTAREA}
          value={description}
          onChange={(e) => onInputChange(e, setTitle)}
          label={"Description"}
          name={"description"}
          initialValue={blog?.description}
          onInsert={() =>
            onInsert({
              refPath: refs.description,
              data: description,
            })
          }
          setValue={setDescription}
        />

        {/* Image Link */}
        <ImageInput
          label={"Image Link"}
          value={imgSrc}
          name={"imgSrc"}
          onChange={(e: any) => onInputChange(e, setImgSrc)}
          initialValue={imgSrc}
          setValue={setImgSrc}
          withActions={true}
          onInsert={() =>
            onInsert({
              refPath: refs.imgSrc,
              data: imgSrc,
            })
          }
        />

        <StyledReactQuill theme="snow" value={body} onChange={setBody} />
        <StyledActionButtons
          onReset={() => setBody(blog?.body)}
          isChanged={body !== blog?.body}
          onInsert={() =>
            onInsert({
              refPath: refs.body,
              data: body,
            })
          }
        />
      </AdminWrapper>
    </>
  );
};

export default EditBlog;
