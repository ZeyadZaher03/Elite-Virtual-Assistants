import { Metadata } from "next";
import { Nav } from "@/components/Nav/Nav";
import { ToastContainer } from "react-toastify";
import { Overlay } from "@/components/Overlay/Overlay";
import { Footer } from "@/components/Footer/Footer";

import loginPageInfo from "../pageInfo/loginPageInfo.json";

import "./login.scss";
import { LoginForm } from "./loginForm/LoginForm";
import { cache } from "react";
import { getData } from "@/firebase";
import { OverlayProps } from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Elite VA | Login",
  description:
    "We provide talented and highly creative Elite Virtual Assistants with various skills related to the services offered by our company.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

interface ILoginData {
  title: string;
  overlay: OverlayProps;
  imgSrc: string;
}

export const revalidate = 1000 * 60 * 60 * 24; // revalidate the data at most every day

export const getLoginData = cache(async () => {
  const loginData = await getData<ILoginData>(
    "pages/login",
    () => {},
    () => {}
  );

  return loginData;
});
export default async function LoginPage() {
  const loginData = await getLoginData();
  const title = loginData?.title;
  const imgSrc = loginData?.imgSrc;
  const overlay = loginData?.overlay;

  const customStyles = {
    backgroundImage: `url(${imgSrc})`,
    backgroundPosition: overlay?.imgPos,
  };

  return (
    <>
      <ToastContainer />
      <Nav currentPathName="/login" />
      <main style={customStyles} className="login__page__wrapper">
        <Overlay
          opacity={overlay?.opacity || 0}
          colorOne={overlay?.colorOne || ""}
          colorTwo={overlay?.colorTwo || ""}
        />
        <div className="login__page__container">
          <h1 className="login__page__header">{title}</h1>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
