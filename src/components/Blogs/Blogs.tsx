"use client";

import React from "react";
import { BlogItem } from "../BlogItem";
import { useGetData, useGetDataByIds } from "@/firebase/useFetch";
import { BlogSize } from "@/app/types/types";

import "./Blogs.scss";

export const Blogs = ({
  selectedBlogs = [],
  cols = 3,
  size,
  getAllBlogs,
  withAction = false,
  onDelete,
}: {
  size: BlogSize;
  selectedBlogs?: string[];
  cols?: number;
  getAllBlogs?: boolean;
  withAction?: boolean;
  onDelete?: () => void;
}) => {
  const [fetchedSelectedBlogs, _] = useGetDataByIds({
    refPath: "/blogs/",
    ids: selectedBlogs,
  });

  const [fetchedBlogs, getBlogs] = useGetData(
    "/blogs/",
    [],
    () => {},
    () => {}
  );

  const blogs = getAllBlogs ? fetchedBlogs : fetchedSelectedBlogs;

  const customStyle = {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };

  return (
    <div className="blogs-component-container" style={customStyle}>
      {Object.entries(blogs).map(([idx, { title, imgSrc }]) => (
        <BlogItem
          key={idx}
          id={idx}
          size={size}
          imgSrc={imgSrc}
          title={title}
          withAction={withAction}
          onDelete={() => {
            getBlogs();
          }}
        />
      ))}
    </div>
  );
};
