"use client";

import React from "react";

import { useGetData, useGetDataByIds } from "@/firebase/useFetch";
import { ServiceItem } from "../ServiceItem/ServiceItem";
import { ServiceItemTypes } from "@/app/types/types";

import "./Services.scss";

export const Services = ({
  selectedServices = [],
  type,
  getAllServices,
  withAction = false,
}: {
  selectedServices?: string[];
  type: ServiceItemTypes;
  getAllServices: boolean;
  withAction?: boolean;
}) => {
  const [fetchedSelectedServices, getSelectedServices] = useGetDataByIds({
    refPath: "/services/",
    ids: getAllServices ? [] : selectedServices,
  });

  const [fetchedServices, getServices] = useGetData(
    "/services/",
    [],
    () => {},
    () => {}
  );

  const services = getAllServices ? fetchedServices : fetchedSelectedServices;

  return (
    <div className="section-wrapper">
      {Object.entries(services).map(([idx, { imgSrc, title, description }]) => (
        <ServiceItem
          key={idx}
          id={idx}
          imgSrc={imgSrc}
          title={title}
          body={description}
          type={type}
          withAction={withAction}
          onDelete={() => {
            getServices();
          }}
        />
      ))}
    </div>
  );
};
