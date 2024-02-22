import { Nav } from "@/components/Nav/Nav";
import { Testimonials } from "@/components/Testimonials";

import { HeroSection } from "@/components/Hero/Hero";
import { ServicesSection } from "@/components/ServiceSection/ServicesSection";
import { FAQSection } from "@/components/FAQSection/FAQSection";
import { AboutUsSection } from "@/components/AboutUsSection/AboutUsSection";
import { InfoSection } from "@/components/InfoSection/InfoSection";
import { BenefitsSection } from "@/components/BenefitsSection/BenefitsSection";
import { BlogSection } from "@/components/BlogSection/BlogSection";
import { CallToActionSection } from "@/components/CallToActionSection/CallToActionSection";
import { Footer } from "@/components/Footer/Footer";

import homePageInfo from "./pageInfo/homePageInfo.json";
import { BlogSize, ServiceItemTypes } from "./types/types";
import { ToastContainer } from "react-toastify";

export default function HomePage() {
  const heroSection = homePageInfo?.hero;
  const serviceSection = homePageInfo?.services;
  const faqSection = homePageInfo?.faq;
  const aboutUsSection = homePageInfo?.aboutUs;
  const infoSection = homePageInfo?.info;
  const partnerUp = homePageInfo?.partnerUp;
  const blogsSection = homePageInfo?.blogs;

  return (
    <div>
      <Nav currentPathName={"/"} />
      {/* <main>
        {heroSection && (
          <HeroSection
            imgSrc={heroSection.imgSrc}
            imgPos={heroSection.overlay?.imgPos}
            overlay={heroSection.overlay}
            header={heroSection.info?.header}
            subHeader={heroSection.info.subtitle}
            body={heroSection.info.body}
          />
        )}
      </main> */}
      {/* <Footer /> */}
    </div>
  );
}
