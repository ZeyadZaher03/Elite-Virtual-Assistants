"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { pushData } from "@/firebase";
import styled from "styled-components";
import { Input, InputTypes } from "@/UI/Input";

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  font-size: 1rem;
  color: var(--black);
  font-weight: 700;
  background-color: var(--button-background-color);
`;

export const SendMessage = () => {
  const [name, setName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const emptyInputs = () => {
    setName("");
    setCompanyEmail("");
    setCompanyName("");
    setPhoneNumber("");
    setMessage("");
  };

  const onSend = () => {
    const isFilled =
      !!name.trim() ||
      !!companyEmail.trim() ||
      !!companyName.trim() ||
      !!phoneNumber.trim();
    const data = {
      name,
      companyEmail,
      companyName,
      phoneNumber,
    };
    if (!isFilled) return;
    toast("Sending Message...");
    pushData({
      refPath: "/sales/",
      data,
      callback: () => {
        toast.dismiss();
        toast("Messages Sent");
        emptyInputs();
      },
      onError: () => {
        toast.dismiss();
        toast("Failed", { type: "error" });
        emptyInputs();
      },
    });
  };
  return (
    <>
      <Input
        name="name"
        type={InputTypes.TEXT}
        label={"Your Name"}
        value={name}
        onChange={(e: any) => setName(e?.target?.value)}
        required
      />
      <Input
        name="company-name"
        type={InputTypes.TEXT}
        label={"Company Name"}
        value={companyName}
        onChange={(e: any) => setCompanyName(e?.target?.value)}
        required
      />
      <Input
        name="company-email"
        type={InputTypes.TEXT}
        label={"Company Email"}
        value={companyEmail}
        onChange={(e: any) => setCompanyEmail(e?.target?.value)}
        required
      />
      <Input
        name="phone-number"
        type={InputTypes.PHONE_NUMBER}
        label={"Phone Number"}
        value={message}
        onChange={setPhoneNumber}
        required
      />
      <Input
        name="message"
        type={InputTypes.TEXTAREA}
        label={"Message"}
        value={message}
        onChange={(e: any) => setPhoneNumber(e?.target?.value)}
      />

      <Button onClick={onSend}>Submit</Button>
    </>
  );
};
