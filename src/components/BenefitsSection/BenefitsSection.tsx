import React from "react";

import "./BenefitsSection.scss";

export const BenefitsSection = ({
  title,
  benefitsOne,
  benefitsTwo,
  benefitsThree,
}: {
  title: string;
  benefitsOne: string;
  benefitsTwo: string;
  benefitsThree: string;
}) => {
  return (
    <div className="benefits-section__wrapper">
      <div className="benefits-section__container">
        <h2 className="benefits-section__header">{title}</h2>
        <div className="benefits-section__benefits-wrapper">
          <div className="benefits-section__benefit-item">
            <div className="benefits-section__body">{benefitsOne}</div>
          </div>
          <div className="benefits-section__benefit-item">
            <div className="benefits-section__body">{benefitsTwo}</div>
          </div>
          <div className="benefits-section__benefit-item">
            <div className="benefits-section__body">{benefitsThree}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
