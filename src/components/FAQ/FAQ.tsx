"use client";

import React, { useEffect, useRef, useState } from "react";

import "./FAQ.scss";

export const FAQ = ({ title, body }: { title: string; body: string }) => {
  const [expanded, setExpanded] = useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const [height, setHeight] = useState(5.125);

  useEffect(() => {
    const titleHeightInRem = (titleRef?.current?.clientHeight || 1) / 16;
    const bodyHeightInRem = (bodyRef?.current?.clientHeight || 1) / 16;
    setHeight(
      expanded
        ? (titleHeightInRem || 0) + (bodyHeightInRem || 0)
        : titleHeightInRem || 0
    );
  }, [expanded]);

  const customStyles = {
    height: `${height}rem`,
  };

  return (
    <div
      className="faq-item__container"
      style={customStyles}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <span className="faq-item__title" ref={titleRef}>
        {title}
      </span>
      <span className="faq-item__body" ref={bodyRef}>
        {body}
      </span>
    </div>
  );
};
