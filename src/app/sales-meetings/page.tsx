import React from "react";
import { Overlay } from "@/components/Overlay/Overlay";
import { Nav } from "@/components/Nav/Nav";

import { OverlayProps } from "@/components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import salesMeetingPageInfo from "./../pageInfo/salesMeetingPageInfo.json";

import { SendMessage } from "@/components/SendMessage/SendMessage";
import { Footer } from "@/components/Footer/Footer";

import "./sales-meetings.scss";

interface ISalesMeetingPageData {
  subtitle: string;
  title: string;
  imgSrc: string;
  overlay: OverlayProps;
}

export default function SalesMeeting() {
  const customStyles = {
    backgroundImage: `url(${salesMeetingPageInfo?.imgSrc})`,
    backgroundPosition: salesMeetingPageInfo?.overlay?.imgPos,
  };

  return (
    <>
      <ToastContainer />
      <Nav currentPathName="/sales-meetings" />
      <div style={customStyles} className="sales-meetings__wrapper">
        <Overlay
          colorOne={salesMeetingPageInfo?.overlay?.colorOne || ""}
          colorTwo={salesMeetingPageInfo?.overlay?.colorTwo || ""}
          opacity={salesMeetingPageInfo?.overlay?.opacity || 0.71}
        />
        <div className="sales-meetings__container">
          <h1 className="sales-meetings__header">
            {salesMeetingPageInfo?.title}
          </h1>
          <h2 className="sales-meetings__sub-header">
            {salesMeetingPageInfo?.subtitle}
          </h2>
          <div className="sales-meetings__contact-us_container">
            <SendMessage />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
