import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { Header, OverlayProps } from "@/components/Header/Header";
import { CallToActionSection } from "@/components/CallToActionSection/CallToActionSection";

import { ServicesSection } from "@/components/ServiceSection/ServicesSection";

import servicePageInfo from "./../pageInfo/servicePageInfo.json";
import { ServiceItemTypes } from "../types/types";
import { Metadata } from "next";

interface IServicePageData {
  title: string;
  subtitle: string;
  imgSrc: string;
  overlay: OverlayProps;
}

export const metadata: Metadata = {
  title: "Elite VA | Services",
  description:
    "We provide talented and highly creative Elite Virtual Assistants with various skills related to the services offered by our company.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function ServicesPage() {
  return (
    <>
      <Nav currentPathName="/services" />
      <main>
        {servicePageInfo && (
          <Header
            title={servicePageInfo?.title}
            imgSrc={servicePageInfo?.imgSrc}
            overlay={servicePageInfo?.overlay}
          />
        )}
        <ServicesSection
          getAllServices={true}
          type={ServiceItemTypes.typeTwo}
          header={servicePageInfo?.subtitle}
        />
        <CallToActionSection
          title={"Learn more about our services"}
          video={"https://dialpros.com/wp-content/uploads/2022/12/video.mp4"}
          subTitle={"Schedule a free consultation with us"}
          href={"#"}
          buttonText={"Contact Us Today"}
        />
      </main>
      <Footer />
    </>
  );
}
