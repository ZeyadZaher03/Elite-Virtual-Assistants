import React from "react";
import "./Overlay.scss";

export const Overlay = ({
  opacity,
  colorOne,
  colorTwo,
  className: externalClassName,
}: {
  opacity: number;
  colorOne: string;
  colorTwo: string;
  className?: string;
}) => {
  const wrapperStyles = {
    opacity: opacity,
    backgroundImage: `linear-gradient(180deg, ${colorOne} 0, ${colorTwo} 100%)`,
  };
  const internalClassName = "overlay-container";

  const combinedClassName = externalClassName
    ? `${internalClassName} ${externalClassName}`
    : internalClassName;

  return <div className={combinedClassName} style={wrapperStyles} />;
};
