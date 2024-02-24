"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AdminHeader, AdminNav, AdminWrapper } from "./components/AdminNav";
import { useGetData } from "@/firebase/useFetch";
import { getAuth } from "firebase/auth";

const Wrapper = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
`;

const Card = styled.div`
  padding: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 12px 0px;
  h2 {
    font-size: 1.2em;
    margin-bottom: 1rem;
  }
`;
const LoggedInAs = styled.p`
  margin-bottom: 1rem;
`;

export default function Admin() {
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = getAuth().onAuthStateChanged((user) =>
      setUserEmail(user?.email)
    );
  };

  const [serviceData, _1] = useGetData<any | null>(
    "/services",
    null,
    () => {},
    () => {}
  );
  const [blogsData, _2] = useGetData<any | null>(
    "/blogs",
    null,
    () => {},
    () => {}
  );
  const [FaqData, _3] = useGetData<any | null>(
    "/faqs",
    null,
    () => {},
    () => {}
  );

  const servicesLength = Object.keys(serviceData || {}).length;
  const blogsLength = Object.keys(blogsData || {}).length;
  const faqLength = Object.keys(FaqData || {}).length;

  return (
    <Wrapper>
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Admin</AdminHeader>
        <LoggedInAs>
          you are currently logged in as: {userEmail || "loading .."}
        </LoggedInAs>
        <Container>
          <Card>
            <h2>Blogs</h2>
            number: {blogsLength}
          </Card>
          <Card>
            <h2>Services</h2>
            number: {servicesLength}
          </Card>
          <Card>
            <h2>FAQs</h2>
            number: {faqLength}
          </Card>
        </Container>
      </AdminWrapper>
    </Wrapper>
  );
}
