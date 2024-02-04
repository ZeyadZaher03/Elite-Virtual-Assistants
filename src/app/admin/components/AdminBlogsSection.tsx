import { useGetData, useInsertValue } from "@/firebase/useFetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  InputWithActionsAndOldValue,
  INPUT_TYPES,
  onInputChange,
} from "./Fields/Fields";
import { SelectBlogs } from "./SelectBlogs";

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

interface IAdminBlogsSectionData {
  header: string;
  subtitle: string;
  buttonText: string;
  selectedBlogs: string[];
}

export const AdminBlogsSection = ({ rootRef }: { rootRef: string }) => {
  const blogSectionRef = rootRef;

  const [blogSectionData, fetchBlogSectionData] =
    useGetData<IAdminBlogsSectionData | null>(
      blogSectionRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    header: `${blogSectionRef}/header`,
    subtitle: `${blogSectionRef}/subtitle`,
    selectedBlogs: `${blogSectionRef}/selectedBlogs`,
    buttonText: `${blogSectionRef}/buttonText`,
  };

  const [header, setHeader] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const { insertValue } = useInsertValue();

  useEffect(() => {
    setHeader(blogSectionData?.header || "");
    setSubtitle(blogSectionData?.subtitle || "");
    setButtonText(blogSectionData?.buttonText || "");
  }, [blogSectionData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchBlogSectionData,
    });

  return (
    <HeroSection>
      <Header>Blog Section</Header>
      <HeroSectionContainer>
        {/* Header */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={header}
          onChange={(e) => onInputChange(e, setHeader)}
          label={"header"}
          name={"header"}
          initialValue={blogSectionData?.header}
          onInsert={() =>
            onInsert({
              refPath: refs.header,
              data: header,
            })
          }
          setValue={setHeader}
        />

        {/* Subtitle */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={subtitle}
          onChange={(e) => onInputChange(e, setSubtitle)}
          label={"subtitle"}
          name={"subtitle"}
          initialValue={blogSectionData?.subtitle}
          onInsert={() =>
            onInsert({
              refPath: refs.subtitle,
              data: subtitle,
            })
          }
          setValue={setSubtitle}
        />

        {/* ButtonText */}
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={buttonText}
          onChange={(e) => onInputChange(e, setButtonText)}
          label={"Button Text"}
          name={"buttonText"}
          initialValue={blogSectionData?.buttonText}
          onInsert={() =>
            onInsert({
              refPath: refs.buttonText,
              data: buttonText,
            })
          }
          setValue={setButtonText}
        />

        <SelectBlogs selectedBlogRef={refs.selectedBlogs} />
      </HeroSectionContainer>
    </HeroSection>
  );
};
