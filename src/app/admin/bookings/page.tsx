"use client";
import { get } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { AdminNav, AdminWrapper } from "../components/AdminNav";
import { useGetData } from "@/firebase/useFetch";

interface ISalesItem {
  id: string;
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  name: string;
  message: string;
}

interface ISalesData extends Array<Omit<ISalesItem, "id">> {}

const SalesItem = ({
  id,
  name,
  phoneNumber,
  companyEmail,
  companyName,
  message,
}: ISalesItem) => {
  return (
    <Sale>
      <Item>
        <Title>Name: </Title>
        <Value>{name}</Value>
      </Item>
      <Item>
        <Title>Phone Number: </Title>
        <Value>{phoneNumber}</Value>
      </Item>
      <Item>
        <Title>Company Email: </Title>
        <Value>{companyEmail}</Value>
      </Item>
      <Item>
        <Title>Company Name: </Title>
        <Value>{companyName}</Value>
      </Item>
      <Item>
        <Title>Message: </Title>
        <Value>{message ? message : "N/A"}</Value>
      </Item>
    </Sale>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;
const Header = styled.h1`
  color: var(--primary-color-light-1);
`;
const Count = styled.span`
  color: #000;
  font-size: 1rem;
`;
const SalesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 2rem;
`;
const Sale = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color-dark-2);
  color: var(--white);
  padding: 1rem;
  border-radius: 5px;
`;

const Item = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const Title = styled.span`
  color: var(--white);
  font-weight: 500;
  margin-right: 5px;
`;
const Value = styled.div`
  color: var(--white);
  font-weight: 400;
`;

interface ISalesData {
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  name: string;
  message: string;
}

export default function Sales() {
  const salesRef = "/sales";
  const [salesData, _] = useGetData<ISalesData | {}>(
    salesRef,
    {},
    () => {},
    () => {}
  );

  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <Container>
          <Header>
            Sales <Count>total: {Object.keys(salesData)?.length}</Count>
          </Header>
          <SalesWrapper>
            {Object.entries(salesData)?.map(
              ([
                idx,
                { name, phoneNumber, companyEmail, companyName, message },
              ]) => (
                <SalesItem
                  key={idx}
                  id={idx}
                  name={name}
                  phoneNumber={phoneNumber}
                  companyName={companyName}
                  companyEmail={companyEmail}
                  message={message}
                />
              )
            )}
          </SalesWrapper>
        </Container>
      </AdminWrapper>
    </>
  );
}
