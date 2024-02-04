"use client";

import React from "react";
import { FAQ } from "../FAQ/FAQ";
import { Button } from "../Button/Button";
import { useGetDataByIds } from "@/firebase/useFetch";

import "./FAQSection.scss";

export const FAQSection = ({
  selectedFaqs,
  title,
  buttonText,
}: {
  title: string;
  buttonText: string;
  selectedFaqs: string[];
}) => {
  const [faqs, _] = useGetDataByIds({
    refPath: "/faqs/",
    ids: selectedFaqs || [],
  });

  return (
    <div className="faq_section__wrapper">
      <div className="faq_section__container">
        <h2 className="faq_section__header">{title}</h2>
        <div className="faq_section__faq-wrapper">
          {Object.entries(faqs).map(([idx, { body, title }]) => (
            <FAQ key={idx} title={title} body={body} />
          ))}
        </div>
        <Button link="/sales-meetings/">{buttonText}</Button>
      </div>
    </div>
  );
};
