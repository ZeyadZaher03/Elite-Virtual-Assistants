import React from "react";

import { ServiceItemTypes } from "@/app/types/types";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { Services } from "../Services/Services";

import "./ServicesSection.scss";

export const ServicesSection = ({
  selectedServices = [],
  header,
  buttonText,
  subtitle,
  type,
  getAllServices = false,
}: {
  getAllServices?: boolean;
  type: ServiceItemTypes;
  selectedServices?: string[];
  header: string | undefined;
  buttonText?: string | undefined;
  subtitle?: string | undefined;
}) => {
  return (
    <div className="service-section-wrapper">
      <div className="service-section-container">
        <SectionHeader title={header} subTitle={subtitle} />
        <Services
          getAllServices={getAllServices}
          type={type}
          selectedServices={selectedServices}
        />
      </div>
    </div>
  );
};
