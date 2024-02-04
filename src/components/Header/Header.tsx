import React from "react";
import { Overlay } from "../Overlay/Overlay";

import "./Header.scss";

export interface OverlayProps {
  colorOne: string;
  colorTwo: string;
  opacity: number;
  imagePos?: string;
  imgPos?: string;
}

export interface HeaderProps {
  imgSrc?: string;
  title: string;
  overlay: OverlayProps;
}

export const Header: React.FC<HeaderProps> = ({
  imgSrc = "",
  title,
  overlay,
}) => {
  const customStyles = {
    backgroundImage: `url(${imgSrc})`,
    backgroundPosition: overlay.imagePos || overlay.imgPos || "",
  };

  return (
    <div className="header-section" style={customStyles}>
      <Overlay
        colorOne={overlay.colorOne}
        colorTwo={overlay.colorTwo}
        opacity={overlay.opacity}
      />
      <h1 className="header-section__title">{title}</h1>
    </div>
  );
};
