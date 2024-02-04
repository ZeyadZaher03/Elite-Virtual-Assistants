"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import { ResetButton, SaveButton } from "../StyledComponent";

const BlogsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const BlogsHeader = styled.h2`
  margin-top: 2rem 0;
  letter-spacing: 0;
`;

const BlogsContainer = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BlogItem = styled.div<{ $isSelected: boolean }>`
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

const BlogTitle = styled.span`
  display: block;
  font-weight: 500;
  margin-right: 1rem;
`;

const BlogLink = styled.a`
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

const BlogImage = styled.img`
  display: block;
  width: 6rem;
`;

export const SelectBlogs = ({
  selectedBlogRef,
}: {
  selectedBlogRef: string;
}) => {
  const [savedSelectedBlogs, fetchSavedSelectedBlogs] = useGetData(
    selectedBlogRef,
    [],
    () => {},
    () => {}
  );
  const [blogs, _] = useGetData(
    "/blogs/",
    [],
    () => {},
    () => {}
  );

  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setSelectedBlogs(savedSelectedBlogs || []);
  }, [savedSelectedBlogs, setSelectedBlogs]);

  const onReset = () => setSelectedBlogs(savedSelectedBlogs);
  const onSave = () => {
    insertValue({
      ref: selectedBlogRef,
      data: selectedBlogs,
      onSuccess: fetchSavedSelectedBlogs,
    });
  };

  const handleBlogItemClick = (blogId: string) => {
    if (!selectedBlogs.includes(blogId)) {
      if (selectedBlogs.length < 3) {
        setSelectedBlogs((prevSelectedBlog) => [...prevSelectedBlog, blogId]);
      } else {
        alert("You can select a maximum of 3 blogs.");
      }
    } else {
      setSelectedBlogs((prevSelectedBlog) =>
        prevSelectedBlog.filter((id) => id !== blogId)
      );
    }
  };

  return (
    <BlogsWrapper>
      <BlogsHeader>Select Blogs</BlogsHeader>
      <BlogsContainer>
        {Object.entries(blogs)?.map(([idx, { title, imgSrc }]) => {
          return (
            <BlogItem
              onClick={() => handleBlogItemClick(idx)}
              $isSelected={selectedBlogs.includes(idx)}
              key={idx}
            >
              <div>
                <BlogTitle>{title}</BlogTitle>
                <BlogLink target="__blank" href={`/blog/${idx}`}>
                  Visit
                </BlogLink>
              </div>
              <BlogImage src={imgSrc} alt={title} />
            </BlogItem>
          );
        })}
      </BlogsContainer>
      <ButtonContainer>
        <StyledResetButton onClick={onReset}>Reset</StyledResetButton>
        <SaveButton onClick={onSave}>Submit</SaveButton>
      </ButtonContainer>
    </BlogsWrapper>
  );
};
