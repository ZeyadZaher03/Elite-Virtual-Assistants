"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";
import styled from "styled-components";
import {
  SelectImagePosition,
  ImageInput,
  InputWithActionsAndOldValue,
  INPUT_TYPES,
  onInputChange,
} from "../components/Fields/Fields";
import { useGetData, useInsertValue } from "@/firebase/useFetch";
import { OverlayProps } from "@/components/Header/Header";

const Container = styled.div``;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IServicePageData {
  title: string;
  subtitle: string;
  imgSrc: string;
  selectedServices: string[];
  sectionHeader: string;
  overlay: OverlayProps;
}

export default function Services() {
  const servicesPageRef = "/pages/services";
  const [servicePageData, fetchServicePageData] =
    useGetData<IServicePageData | null>(
      servicesPageRef,
      null,
      () => {},
      () => {}
    );

  const refs = {
    title: servicesPageRef + "/title",
    imgSrc: servicesPageRef + "/imgSrc",
    subtitle: servicesPageRef + "/subtitle",
    overlay: servicesPageRef + "/overlay",
    selectedServices: servicesPageRef + "/selectedServices",
  };

  const [imgSrc, setImgSrc] = useState("");
  const [imagePos, setImagePos] = useState("");

  const [opacity, setOpacity] = useState(0.71);
  const [colorOne, setColorOne] = useState("");
  const [colorTwo, setColorTwo] = useState("");

  const [header, setHeader] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const { insertValue } = useInsertValue();

  useEffect(() => {
    setHeader(servicePageData?.title || "");
    setImgSrc(servicePageData?.imgSrc || "");
    setSubtitle(servicePageData?.subtitle || "");

    setImagePos(servicePageData?.overlay?.imgPos || "");
    setColorOne(servicePageData?.overlay?.colorTwo || "");
    setColorTwo(servicePageData?.overlay?.colorOne || "");
    setOpacity(servicePageData?.overlay?.opacity || 0.71);
  }, [servicePageData, insertValue]);

  const onInsert = ({ refPath, data }: { refPath: string; data: any }) =>
    insertValue({
      ref: refPath,
      data,
      onSuccess: fetchServicePageData,
    });

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <Container>
          <AdminHeader>Services</AdminHeader>
          <SectionContainer>
            {/* Header */}
            <InputWithActionsAndOldValue
              type={INPUT_TYPES.TEXT}
              value={header}
              onChange={(e) => onInputChange(e, setHeader)}
              label={"header"}
              name={"header"}
              initialValue={servicePageData?.title}
              onInsert={() =>
                onInsert({
                  refPath: refs.title,
                  data: header,
                })
              }
              setValue={setHeader}
            />

            {/* subtitle */}
            <InputWithActionsAndOldValue
              type={INPUT_TYPES.TEXT}
              value={subtitle}
              onChange={(e) => onInputChange(e, setSubtitle)}
              label={"subtitle"}
              name={"subtitle"}
              initialValue={servicePageData?.subtitle}
              onInsert={() =>
                onInsert({
                  refPath: refs.subtitle,
                  data: subtitle,
                })
              }
              setValue={setSubtitle}
            />

            {/* Image Link */}
            <ImageInput
              label={"Image Link"}
              value={imgSrc}
              name={"imgSrc"}
              onChange={(e) => onInputChange(e, setImgSrc)}
              initialValue={servicePageData?.imgSrc}
              onInsert={() =>
                onInsert({
                  refPath: refs.imgSrc,
                  data: imgSrc,
                })
              }
              setValue={setImgSrc}
              withActions={true}
            />

            {/* Image Position */}
            <SelectImagePosition
              onInsert={() =>
                onInsert({
                  refPath: refs.overlay,
                  data: {
                    imgPos: imagePos,
                    opacity: opacity,
                    colorOne: colorOne,
                    colorTwo: colorTwo,
                  },
                })
              }
              imgSrc={imgSrc}
              setValueImgPos={setImagePos}
              imgPosValue={imagePos}
              imgPosOldValue={servicePageData?.overlay?.imgPos}
              setOpacity={setOpacity}
              opacityValue={opacity}
              opacityOldValue={servicePageData?.overlay?.opacity}
              setColorOne={setColorOne}
              colorOneValue={colorOne}
              colorOneOldValue={servicePageData?.overlay?.colorOne}
              setColorTwo={setColorTwo}
              colorTwoValue={colorTwo}
              colorTwoOldValue={servicePageData?.overlay?.colorTwo}
            />
          </SectionContainer>
        </Container>
      </AdminWrapper>
    </>
  );
}
