import React from "react";

import "./SectionHeader.scss";

export const SectionHeader = ({
  title,
  subTitle,
  titleColor,
}: {
  title?: string | null;
  subTitle?: string | null;
  titleColor?: string;
}) => {
  const wrapperStyles = {
    color: titleColor ? titleColor : "var(--black)",
  };

  return (
    <div className="section-header-wrapper">
      {subTitle && <h2 className="section-sub-title">{subTitle}</h2>}
      {title && (
        <h2 className="section-title" style={wrapperStyles}>
          {title}
        </h2>
      )}
    </div>
  );
};
