"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";

import styled from "styled-components";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import {
  SelectImagePosition,
  ImageInput,
  INPUT_TYPES,
  InputWithActionsAndOldValue,
  onInputChange,
} from "../components/Fields/Fields";
import { OverlayProps } from "@/components/Header/Header";
import { Blogs } from "@/components/Blogs/Blogs";
import { BlogSize } from "@/app/types/types";

const BlogsContainer = styled.div`
  margin-top: 2rem;
`;

interface IBlogPageData {
  title: string;
  imgSrc: string;
  sectionHeader: string;
  overlay: OverlayProps;
}

export default function BlogsAdminPage() {
  const blogsPageRef = "/pages/blogs";
  const [blogPageData, fetchBlogPageData] = useGetData<IBlogPageData | null>(
    blogsPageRef,
    null,
    () => {},
    () => {}
  );

  const refs = {
    title: blogsPageRef + "/title",
    imgSrc: blogsPageRef + "/imgSrc",
    overlay: blogsPageRef + "/overlay",
    selectedBlogs: blogsPageRef + "/selectedBlogs",
    sectionHeader: blogsPageRef + "/sectionHeader",
  };

  const [imgSrc, setImgSrc] = useState("");
  const [imagePos, setImagePos] = useState("");

  const [opacity, setOpacity] = useState(0.7);
  const [colorOne, setColorOne] = useState("");
  const [colorTwo, setColorTwo] = useState("");

  const [header, setHeader] = useState("");

  const [sectionHeader, setSectionHeader] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    if (blogPageData) {
      const { title, sectionHeader, imgSrc, overlay } = blogPageData;
      setHeader(title);
      setImgSrc(imgSrc);
      setSectionHeader(sectionHeader);

      setImagePos(overlay?.imgPos || "");
      setColorOne(overlay?.colorTwo);
      setColorTwo(overlay?.colorOne);
      setOpacity(overlay?.opacity);
    }
  }, [blogPageData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchBlogPageData,
    });

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Blog Page</AdminHeader>
        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={header}
          onChange={(e) => onInputChange(e, setHeader)}
          label={"header"}
          name={"header"}
          initialValue={blogPageData?.title}
          onInsert={() =>
            onInsert({
              refPath: refs.title,
              data: header,
            })
          }
          setValue={setHeader}
        />

        {/* Section Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={sectionHeader}
          onChange={(e) => onInputChange(e, setSectionHeader)}
          label={"Section Header"}
          name={"sectionHeader"}
          initialValue={blogPageData?.sectionHeader}
          onInsert={() =>
            onInsert({
              refPath: refs.sectionHeader,
              data: sectionHeader,
            })
          }
          setValue={setSectionHeader}
        />

        {/* Image Link */}
        <ImageInput
          label={"Image Link"}
          value={imgSrc}
          name={"imgSrc"}
          onChange={(e) => onInputChange(e, setImgSrc)}
          initialValue={blogPageData?.imgSrc}
          onInsert={() =>
            onInsert({
              refPath: refs.imgSrc,
              data: imgSrc,
            })
          }
          setValue={setImgSrc}
          withActions={true}
        />

        {/* Image Position */}
        <SelectImagePosition
          onInsert={() =>
            onInsert({
              refPath: refs.overlay,
              data: {
                imgPos: imagePos,
                opacity: opacity,
                colorOne: colorOne,
                colorTwo: colorTwo,
              },
            })
          }
          imgSrc={imgSrc}
          setValueImgPos={setImagePos}
          imgPosValue={imagePos}
          imgPosOldValue={blogPageData?.overlay?.imgPos}
          setOpacity={setOpacity}
          opacityValue={opacity}
          opacityOldValue={blogPageData?.overlay?.opacity}
          setColorOne={setColorOne}
          colorOneValue={colorOne}
          colorOneOldValue={blogPageData?.overlay?.colorOne}
          setColorTwo={setColorTwo}
          colorTwoValue={colorTwo}
          colorTwoOldValue={blogPageData?.overlay?.colorTwo}
        />

        <BlogsContainer>
          <Blogs
            cols={5}
            size={BlogSize.XS}
            getAllBlogs={true}
            withAction={true}
          />
        </BlogsContainer>
      </AdminWrapper>
    </>
  );
}
