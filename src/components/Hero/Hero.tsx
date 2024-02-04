import React from "react";
import { Overlay } from "../Overlay/Overlay";
import { QualityIcon } from "@/Icon/QualityIcon";
import { ExpertIcon } from "@/Icon/ExpertIcon";
import { PerformanceIcon } from "@/Icon/PerformanceIcon";
import { OverlayProps } from "../Header/Header";

import "./Hero.scss";
import { HeroInfo } from "../HeroInfo/HeroInfo";
import { ScheduleBox } from "../ScheduleBox/ScheduleBox";

export const HeroSection = ({
  imgSrc,
  imgPos,
  overlay,
  header,
  subHeader,
  body,
}: {
  imgSrc: string;
  imgPos: string;
  header: string;
  subHeader: string;
  body: string;
  overlay: OverlayProps;
}) => {
  const ScheduleBoxTitle = "Free Consultation";
  const guarantees = [
    {
      name: "Quality Leads",
      icon: <QualityIcon />,
    },
    {
      name: "Expert Agents",
      icon: <ExpertIcon />,
    },
    {
      name: "Performance Satisfaction",
      icon: <PerformanceIcon />,
    },
  ];

  const wrapperStyles = {
    backgroundImage: imgSrc ? `url(${imgSrc})` : "none",
    backgroundPosition: imgPos ? imgPos : "initial",
    backgroundSize: imgPos ? "cover" : "initial",
  };

  return (
    <header
      className="home-hero-wrapper"
      style={wrapperStyles}
      data-img-src={imgSrc}
      data-img-pos={imgPos}
    >
      <Overlay
        opacity={overlay.opacity}
        colorOne={overlay.colorOne}
        colorTwo={overlay.colorTwo}
      />

      <div className="home-hero-container">
        <HeroInfo
          header={header}
          subHeader={subHeader}
          body={body}
          guarantees={guarantees}
        />
        <ScheduleBox title={ScheduleBoxTitle} />
      </div>
    </header>
  );
};
