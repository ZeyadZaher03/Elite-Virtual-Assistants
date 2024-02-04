"use client";
import React from "react";
import styled from "styled-components";
import { AdminNav } from "./components/AdminNav";

const Container = styled.div``;

export default function Admin() {
  return (
    <Container>
      <AdminNav />
    </Container>
  );
}
