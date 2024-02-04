import React from "react";

import "./ImageWithTextSection.scss";

export const ImageWithTextSection = ({
  imgSrc,
  imgPos,
  body,
  subTitle,
  title,
}: {
  imgSrc: string;
  imgPos: string;
  body: string;
  subTitle: string;
  title: string;
}) => {
  const customStyles = {
    backgroundImage: `url(${imgSrc})`,
    backgroundPosition: imgPos || "center center",
  };

  return (
    <div className="image-with-text-section__wrapper">
      <div className="image-with-text-section__container">
        <div
          className="image-with-text-section__img"
          style={customStyles}
          aria-label={title}
        />
        <div className="image-with-text-section__info-wrapper">
          <span className="image-with-text-section__sub-header">
            {subTitle}
          </span>
          <h1 className="image-with-text-section__header">{title}</h1>
          <p className="image-with-text-section__paragraph">{body}</p>
        </div>
      </div>
    </div>
  );
};
