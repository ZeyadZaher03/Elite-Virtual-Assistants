"use client";

import React from "react";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { Button } from "../Button/Button";
import { Blogs } from "../Blogs/Blogs";
import { BlogSize } from "@/app/types/types";

import "./BlogSection.scss";

export const BlogSection = ({
  title,
  subTitle,
  selectedBlogs,
  buttonText,
  cols,
  size,
  getAllBlogs,
}: {
  size: BlogSize;
  title?: string | null;
  subTitle?: string;
  buttonText?: string | null;
  selectedBlogs: string[];
  cols?: number;
  getAllBlogs?: boolean;
}) => {
  return (
    <div className="blog-section__wrapper">
      <div className="blog-section__container">
        <SectionHeader title={title} subTitle={subTitle} />
        <Blogs
          getAllBlogs={getAllBlogs}
          selectedBlogs={selectedBlogs}
          cols={cols || 3}
          size={size}
        />
        {buttonText && (
          <Button className="blog-section__button" link={"/blogs"}>
            See All Blog
          </Button>
        )}
      </div>
    </div>
  );
};
