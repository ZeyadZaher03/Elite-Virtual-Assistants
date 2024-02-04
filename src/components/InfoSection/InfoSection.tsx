import React from "react";

import "./InfoSection.scss";

export const InfoSection = ({
  info,
}: {
  info: {
    infoOneTitle: string;
    infoOneBody: string;
    infoTwoTitle: string;
    infoTwoBody: string;
    infoThreeTitle: string;
    infoThreeBody: string;
  };
}) => {
  const {
    infoOneTitle,
    infoOneBody,
    infoTwoTitle,
    infoTwoBody,
    infoThreeTitle,
    infoThreeBody,
  } = info;
  return (
    <div className="info-section__wrapper">
      <div className="info-section__container">
        <div className="info-section__section-wrapper">
          <div className="info-section__info-item">
            <div className="info-section__header">{infoOneTitle}</div>
            <div className="info-section__body">{infoOneBody}</div>
          </div>
          <div className="info-section__info-item">
            <div className="info-section__header">{infoTwoTitle}</div>
            <div className="info-section__body">{infoTwoBody}</div>
          </div>
          <div className="info-section__info-item">
            <div className="info-section__header">{infoThreeTitle}</div>
            <div className="info-section__body">{infoThreeBody}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
