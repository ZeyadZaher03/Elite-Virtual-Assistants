import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ $menuOpened: boolean }>`
  background-color: #111227;
  display: flex;
  flex-direction: column;
  width: 20rem;
  z-index: 9999;
  height: 100vh;
  position: fixed;
  transition: all 200ms ease-in-out;
  @media only screen and (max-width: 600px) {
    & {
      left: ${({ $menuOpened }) => ($menuOpened ? "0px" : "-100vw")};
    }
  }
`;

const NavItem = styled.a`
  color: var(--white);
  padding: 1.5rem 2rem;
  text-decoration: none;
  &:hover {
    background-color: #202247;
  }
`;

export const AdminWrapper = styled.div`
  margin-left: 20rem;
  padding: 2rem;
  @media only screen and (max-width: 600px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

export const AdminHeader = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;

  &::after {
    content: "";
    display: flex;
    width: 80%;
    margin-top: 1rem;
    height: 0.5rem;
    background-color: #111227;
  }

  @media only screen and (max-width: 600px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;

    &::after {
      content: "";
      display: flex;
      width: 80%;
      margin-top: 0.3rem;
      height: 0.2rem;
      background-color: #111227;
    }
  }
`;

export const HamburgerMenu = styled.button`
  display: none;

  @media only screen and (max-width: 600px) {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 0;
    background-color: #0f0f0f;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 1rem 0.5rem;
    div {
      height: 0.1rem;
      background-color: var(--white);
      width: 70%;
    }
    z-index: 9999999;
  }
`;

export const AdminNav = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    if (menuOpened) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, [menuOpened]);

  return (
    <>
      <HamburgerMenu onClick={() => setMenuOpened((p) => !p)}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerMenu>
      <Container $menuOpened={menuOpened}>
        <NavItem href={"/admin/homepage"}>HomePage</NavItem>
        <NavItem href={"/admin/about-us"}>About Us</NavItem>
        <NavItem href={"/admin/services"}>Services</NavItem>
        <NavItem href={"/admin/blogs"}>Blogs</NavItem>
        <NavItem href={"/admin/sales-meetings"}>Sales Meetings</NavItem>
        <NavItem href={"/admin/login"}>Login Page</NavItem>
        <NavItem href={"/admin/add-blog"}>Add A Blog</NavItem>
        <NavItem href={"/admin/add-faq"}>Add A FAQ</NavItem>
        <NavItem href={"/admin/add-testimonials"}>Add Testimonial</NavItem>
        <NavItem href={"/admin/add-service"}>Add A Service</NavItem>
        <NavItem href={"/admin/bookings"}>Bookings</NavItem>
      </Container>
    </>
  );
};
