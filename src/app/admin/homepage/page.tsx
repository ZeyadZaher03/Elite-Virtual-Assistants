"use client";
import React from "react";
import styled from "styled-components";
import { AdminHeader, AdminNav, AdminWrapper } from "../components/AdminNav";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminHeroSection } from "../components/AdminHeroSection";
import { AdminHomeServiceSection } from "../components/AdminHomeServiceSection";
import { AdminFaqSection } from "../components/AdminFaqSection";
import { AdminAboutUsSection } from "../components/AdminAboutUsSection";
import { AdminBenefitsSection } from "../components/AdminBenefitsSection";
import { AdminInfoSection } from "../components/AdminInfoSection";
import { AdminBlogsSection } from "../components/AdminBlogsSection";

export default function Homepage() {
  return (
    <>
      <ToastContainer />
      <AdminNav />
      <AdminWrapper>
        <AdminHeader>Homepage</AdminHeader>
        <AdminHeroSection />
        <AdminHomeServiceSection />
        <AdminFaqSection />
        <AdminAboutUsSection />
        <AdminBenefitsSection />
        <AdminInfoSection />
        <AdminBlogsSection rootRef={"/pages/home/blogs/"} />
      </AdminWrapper>
    </>
  );
}
