import React from "react";

import "./AboutUsSection.scss";

export const AboutUsSection = ({
  imgSrc,
  imgPos,
  title,
  subTitle,
}: {
  imgSrc: string;
  imgPos: string;
  title: string;
  subTitle: string;
}) => {
  const customStyles = {
    backgroundImage: `url(${imgSrc})`,
    backgroundPosition: imgPos,
  };

  return (
    <div className="home-about-us-section-container">
      <div
        className="home-about-us-section-image"
        style={customStyles}
        aria-label={title}
      />
      <div className="home-about-us-section-info-wrapper">
        <div className="home-about-us-section-info">
          <h3 className="home-about-us-section-header">{title}</h3>
          <h2 className="home-about-us-section-subtitle">{subTitle}</h2>
        </div>
      </div>
    </div>
  );
};
