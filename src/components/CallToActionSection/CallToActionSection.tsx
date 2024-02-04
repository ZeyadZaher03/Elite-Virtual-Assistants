import React from "react";
import { Button } from "../Button/Button";
import { Overlay } from "../Overlay/Overlay";

import "./CallToActionSection.scss";

export const CallToActionSection = ({
  video,
  imgSrc,
  imgPos,
  title,
  subTitle,
  buttonText,
  href,
  children,
}: {
  video?: string;
  imgSrc?: string;
  imgPos?: string;
  title: string;
  subTitle?: string;
  buttonText?: string;
  href?: string;
  children?: string | JSX.Element | JSX.Element[];
}) => {
  const hasChildren = React.Children.count(children) > 0;

  const wrapperStyles = {
    backgroundImage: imgSrc ? `url(${imgSrc})` : "none",
    backgroundPosition: imgPos ? imgPos : "initial",
  };
  const videoStyles = {
    display: video ? "block" : "none",
  };

  return (
    <div className="call-to-action__wrapper" style={wrapperStyles}>
      <video
        className="call-to-action__video"
        autoPlay={true}
        loop={true}
        muted={true}
        preload="none"
        style={videoStyles}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Overlay colorOne="#1d1d1d" colorTwo="#887044" opacity={0.85} />

      {title && <h2 className="call-to-action__header">{title}</h2>}
      {subTitle && (
        <span className="call-to-action__sub-header">{subTitle}</span>
      )}
      {hasChildren && <div className="call-to-action__body">{children}</div>}
      {buttonText && <Button link="/sales-meeting">{buttonText}</Button>}
    </div>
  );
};
