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
import { getData } from "@/firebase";
import { OverlayProps } from "@/components/Header/Header";
import { cache } from "react";

interface homePageData {
  hero: {
    imgSrc: string;
    overlay: OverlayProps;
    info: { header: string; subtitle: string; body: string };
  };
  services: {
    type: ServiceItemTypes;
    selectedServices?: string[];
    header: string | undefined;
    buttonText?: string | undefined;
    subtitle?: string | undefined;
  };
  faq: {
    header: string;
    buttonText: string;
    selectedFaqs: string[];
  };
  aboutUs: {
    title: string;
    subtitle: string;
    buttonText: string;
    imgSrc: string;
    overlay: OverlayProps;
  };
  info: {
    infoOneTitle: string;
    infoOneBody: string;
    infoTwoTitle: string;
    infoTwoBody: string;
    infoThreeTitle: string;
    infoThreeBody: string;
  };
  partnerUp: {
    title: string;
    benefitsOne: string;
    benefitsTwo: string;
    benefitsThree: string;
  };
  blogs: {
    size: BlogSize;
    title?: string | null;
    subTitle?: string | null;
    buttonText?: string | null;
    selectedBlogs: string[];
    cols?: number;
    getAllBlogs?: boolean;
  };
}

export const revalidate = 1000 * 60 * 60 * 24; // revalidate the data at most every day

export const getHomePageData = cache(async () => {
  const homePageData = await getData<homePageData>(
    "pages/home",
    () => {},
    () => {}
  );

  return homePageData;
});

export default async function HomePage() {
  const homePageData = await getHomePageData();
  const heroSection = homePageData?.hero;
  const serviceSection = homePageData?.services;
  const faqSection = homePageData?.faq;
  const aboutUsSection = homePageData?.aboutUs;
  const infoSection = homePageData?.info;
  const partnerUp = homePageData?.partnerUp;
  const blogsSection = homePageData?.blogs;

  return (
    <div>
      <Nav currentPathName={"/"} />
      <main>
        {heroSection && (
          <HeroSection
            imgSrc={heroSection.imgSrc}
            imgPos={heroSection.overlay?.imgPos || ""}
            overlay={heroSection.overlay}
            header={heroSection.info?.header}
            subHeader={heroSection.info.subtitle}
            body={heroSection.info.body}
          />
        )}
        {serviceSection && (
          <ServicesSection
            selectedServices={serviceSection?.selectedServices}
            header={serviceSection?.header}
            subtitle={serviceSection?.subtitle}
            buttonText={serviceSection?.buttonText}
            type={ServiceItemTypes.typeOne}
          />
        )}
        {faqSection && (
          <FAQSection
            title={faqSection?.header}
            buttonText={faqSection?.buttonText}
            selectedFaqs={faqSection?.selectedFaqs}
          />
        )}
        {aboutUsSection && (
          <AboutUsSection
            title={aboutUsSection?.title}
            subTitle={aboutUsSection?.subtitle}
            imgPos={aboutUsSection?.overlay?.imgPos || ""}
            imgSrc={aboutUsSection?.imgSrc}
          />
        )}
        {infoSection && <InfoSection info={infoSection} />}
        {partnerUp && (
          <BenefitsSection
            title={partnerUp?.title}
            benefitsOne={partnerUp?.benefitsOne}
            benefitsTwo={partnerUp?.benefitsTwo}
            benefitsThree={partnerUp?.benefitsThree}
          />
        )}
        {blogsSection && (
          <BlogSection
            cols={3}
            size={BlogSize.MEDIUM}
            title={blogsSection?.title}
            subTitle={blogsSection?.subTitle || ""}
            selectedBlogs={blogsSection?.selectedBlogs}
            buttonText={blogsSection.buttonText}
          />
        )}
        <CallToActionSection
          title={"Learn more about our services"}
          video={"https://dialpros.com/wp-content/uploads/2022/12/video.mp4"}
          subTitle={"Schedule a free consultation with us"}
          href={"#"}
          buttonText={"Schedule A Call"}
        />
      </main>
      <Footer />
    </div>
  );
}
