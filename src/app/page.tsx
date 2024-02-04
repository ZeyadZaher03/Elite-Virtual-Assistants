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

interface IHomePageData {
  hero?: any;
  services?: {
    selectedServices: string[];
    header: string;
    subtitle: string;
    buttonText: string;
  } | null;
  faq?: any;
  aboutUs?: any;
  info?: any;
  partnerUp?: any;
  blogs?: any;
}

export default function Home() {
  // Access the data sections
  const heroSection = homePageInfo?.hero;
  const serviceSection = homePageInfo?.services;
  const faqSection = homePageInfo?.faq;
  const aboutUsSection = homePageInfo?.aboutUs;
  const infoSection = homePageInfo?.info;
  const partnerUp = homePageInfo?.partnerUp;
  const blogsSection = homePageInfo?.blogs;

  return (
    <>
      <ToastContainer />
      <Nav currentPathName={"/"} />
      <main>
        {heroSection && (
          <HeroSection
            imgSrc={heroSection?.imgSrc}
            imgPos={heroSection?.overlay?.imgPos}
            overlay={heroSection.overlay}
            header={heroSection?.info?.header}
            subHeader={heroSection?.info?.subtitle}
            body={heroSection?.info?.body}
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
            imgPos={aboutUsSection?.overlay?.imgPos}
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
        aaa
        {/* <Testimonials title={"TESTIMONIALS"} subTitle={"What Our Clients Say"} /> */}
        {blogsSection && (
          <BlogSection
            cols={3}
            size={BlogSize.MEDIUM}
            title={blogsSection?.header}
            subTitle={blogsSection?.subtitle}
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
    </>
  );
}
