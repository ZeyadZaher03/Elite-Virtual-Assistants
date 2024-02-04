"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import "react-toastify/dist/ReactToastify.css";

import { OverlayProps } from "@/components/Header/Header";
import {
  INPUT_TYPES,
  ImageInput,
  InputWithActionsAndOldValue,
  SelectImagePosition,
  onInputChange,
} from "../components/Fields/Fields";

interface ISalesMeetingPageData {
  title: string;
  subtitle: string;
  imgSrc: string;
  overlay: OverlayProps;
}

export default function SalesMeeting() {
  const salesMeetingPageRef = "/pages/sales-meetings";
  const refs = {
    title: `${salesMeetingPageRef}/title`,
    subtitle: `${salesMeetingPageRef}/subtitle`,
    imgSrc: `${salesMeetingPageRef}/imgSrc`,
    overlay: `${salesMeetingPageRef}/overlay`,
  };

  const [salesMeetingData, fetchSalesMeetingData] =
    useGetData<ISalesMeetingPageData | null>(
      salesMeetingPageRef,
      null,
      () => {},
      () => {}
    );

  const { insertValue } = useInsertValue();

  const [header, setHeader] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgPos, setImgPos] = useState("");
  const [opacity, setOpacity] = useState(0.71);
  const [colorOne, setColorOne] = useState("");
  const [colorTwo, setColorTwo] = useState("");

  useEffect(() => {
    if (salesMeetingData) {
      const { title, subtitle, imgSrc, overlay } = salesMeetingData;
      setHeader(title);
      setSubtitle(subtitle);
      setImgSrc(imgSrc);
      setImgPos(overlay?.imgPos || "");
      setColorOne(overlay?.colorOne);
      setColorTwo(overlay?.colorTwo);
      setOpacity(overlay?.opacity);
    }
  }, [salesMeetingData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchSalesMeetingData,
    });

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Sales Meetings Page</AdminHeader>
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={header}
          onChange={(e) => onInputChange(e, setHeader)}
          label={"header"}
          name={"header"}
          initialValue={salesMeetingData?.title}
          onInsert={() =>
            onInsert({
              refPath: refs.title,
              data: header,
            })
          }
          setValue={setHeader}
        />
        <InputWithActionsAndOldValue
          type={INPUT_TYPES.TEXT}
          value={subtitle}
          onChange={(e) => onInputChange(e, setSubtitle)}
          label={"subtitle"}
          name={"subtitle"}
          initialValue={salesMeetingData?.subtitle}
          onInsert={() =>
            onInsert({
              refPath: refs.subtitle,
              data: subtitle,
            })
          }
          setValue={setSubtitle}
        />
        <ImageInput
          label={"Image Link"}
          value={imgSrc}
          name={"imgSrc"}
          onChange={(e) => onInputChange(e, setImgSrc)}
          initialValue={salesMeetingData?.imgSrc}
          onInsert={() =>
            onInsert({
              refPath: refs.imgSrc,
              data: imgSrc,
            })
          }
          setValue={setImgSrc}
          withActions={true}
        />

        <SelectImagePosition
          onInsert={() =>
            onInsert({
              refPath: refs.overlay,
              data: {
                imgPos: imgPos,
                opacity: opacity,
                colorOne: colorOne,
                colorTwo: colorTwo,
              },
            })
          }
          imgSrc={imgSrc}
          setValueImgPos={setImgPos}
          imgPosValue={imgPos}
          imgPosOldValue={salesMeetingData?.overlay?.imgPos}
          setOpacity={setOpacity}
          opacityValue={opacity}
          opacityOldValue={salesMeetingData?.overlay?.opacity}
          setColorOne={setColorOne}
          colorOneValue={colorOne}
          colorOneOldValue={salesMeetingData?.overlay?.colorOne}
          setColorTwo={setColorTwo}
          colorTwoValue={colorTwo}
          colorTwoOldValue={salesMeetingData?.overlay?.colorTwo}
        />
      </AdminWrapper>
    </>
  );
}
