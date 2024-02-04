"use client";
import React from "react";
import styled from "styled-components";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminHeroSection } from "./HeroSection";
import { AdminBlogsSection } from "../components/AdminBlogsSection";
import { AboutUsSection } from "./AboutUs";

const Container = styled.div``;

export default function AboutUs() {
  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <Container>
          <AdminHeader>About Us</AdminHeader>
          <AdminHeroSection />
          <AboutUsSection />
          <AdminBlogsSection rootRef={"/pages/about-us/blogs/"} />
        </Container>
      </AdminWrapper>
    </>
  );
}
