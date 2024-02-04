"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { pushData } from "@/firebase";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {
  ImageInput,
  onInputChange,
  TextInput,
  TextArea,
} from "../components/Fields/Fields";
import { SaveButton } from "../StyledComponent";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const StyledSaveButton = styled(SaveButton)`
  margin-top: 2rem;
`;
const StyledReactQuill = styled(ReactQuill)`
  margin-top: 2rem;
`;

const AddBlog: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<any>(null); // Added state for body

  const [imgSrc, setImgSrc] = useState<string>("");

  type BlogData = {
    title: string;
    description: string;
    body: any; // Changed type for body
    imgSrc: string;
  };

  const emptyInputs = () => {
    setBody("");
    setTitle("");
    setImgSrc("");
    setDescription("");
  };

  const pushBlog = useCallback(
    (data: BlogData) => {
      const { title, body, description, imgSrc } = data;

      if (title && description && imgSrc && body) {
        toast("Inserting...");
        return pushData({
          refPath: "/blogs/",
          data,
          callback: () => {
            router.push("/admin/blogs");
            toast.dismiss();
            emptyInputs();
            toast("Blog Saved");
          },
          onError: () => {
            toast.dismiss();
            emptyInputs();
            toast("Failed", { type: "error" });
          },
        });
      } else {
        toast("title, description, imgSrc, body are not present", {
          type: "error",
        });
        console.error("Invalid data. Blog not saved.");
      }
    },
    [router]
  );

  const saveBlog = () => {
    const data = {
      title,
      body: JSON.stringify(body), // Changed to include body
      description,
      imgSrc,
    };

    pushBlog(data);
  };

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Add Blog</AdminHeader>

        {/* Header */}
        <TextInput
          value={title}
          onChange={(e) => onInputChange(e, setTitle)}
          label={"Header"}
          name={"Header"}
        />

        {/* Header */}
        <TextArea
          value={description}
          onChange={(e) => onInputChange(e, setDescription)}
          label={"Description"}
          name={"description"}
        />

        {/* Image Link */}
        <ImageInput
          label={"Image Link"}
          value={imgSrc}
          name={"imgSrc"}
          onChange={(e) => onInputChange(e, setImgSrc)}
          initialValue={imgSrc}
          setValue={setImgSrc}
          withActions={false}
          onInsert={() => {}}
        />

        <StyledReactQuill theme="snow" value={body} onChange={setBody} />
        <StyledSaveButton onClick={saveBlog}>Save</StyledSaveButton>
      </AdminWrapper>
    </>
  );
};

export default AddBlog;
