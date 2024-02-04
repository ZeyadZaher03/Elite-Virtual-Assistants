import { Metadata } from "next";
import { Nav } from "@/components/Nav/Nav";
import { ToastContainer } from "react-toastify";
import { Overlay } from "@/components/Overlay/Overlay";
import { Footer } from "@/components/Footer/Footer";

import loginPageInfo from "../pageInfo/loginPageInfo.json";

import "./login.scss";
import { LoginForm } from "./loginForm/LoginForm";

export const metadata: Metadata = {
  title: "Elite VA | Login",
  description:
    "We provide talented and highly creative Elite Virtual Assistants with various skills related to the services offered by our company.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function LoginPage() {
  const title = loginPageInfo?.title;
  const imgSrc = loginPageInfo?.imgSrc;
  const overlay = loginPageInfo?.overlay;

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
          opacity={overlay?.opacity}
          colorOne={overlay?.colorOne}
          colorTwo={overlay?.colorTwo}
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
