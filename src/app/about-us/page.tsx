import { Nav } from "@/components/Nav/Nav";
import { Header } from "@/components/Header/Header";
import { CallToActionSection } from "@/components/CallToActionSection/CallToActionSection";
import { ImageWithTextSection } from "@/components/ImageWithTextSection/ImageWithTextSection";
import { TextOnlySection } from "@/components/TextOnlySection/TextOnlySection";
import { BlogSection } from "@/components/BlogSection/BlogSection";
import { Footer } from "@/components/Footer/Footer";

import { BlogSize } from "../types/types";

import AboutUsPageInfoInit from "../pageInfo/aboutUsPageInfo.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elite VA | About us",
  description:
    "We provide talented and highly creative Elite Virtual Assistants with various skills related to the services offered by our company.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function About() {
  const heroSection = AboutUsPageInfoInit?.hero;
  const blogSection = AboutUsPageInfoInit?.blogs;
  const aboutUsSection = AboutUsPageInfoInit?.["about-us"];

  return (
    <>
      <Nav currentPathName="/about-us" />
      <main>
        {heroSection && (
          <Header
            title={heroSection?.info?.header}
            imgSrc={heroSection?.imgSrc}
            overlay={heroSection?.overlay}
          />
        )}
        {aboutUsSection && (
          <ImageWithTextSection
            imgPos={aboutUsSection?.overlay?.imgPos}
            imgSrc={aboutUsSection?.imgSrc}
            body={aboutUsSection?.body}
            title={aboutUsSection?.header}
            subTitle={aboutUsSection?.subtitle}
          />
        )}

        <TextOnlySection />

        <CallToActionSection
          title={"What Will it Cost You"}
          imgSrc={
            "https://dialpros.com/wp-content/uploads/2022/12/businessman-using-digital-tablet-scaled.jpg"
          }
          imgPos={"center center"}
          href={"#"}
          buttonText={"Contact Us Today"}
        >
          <>
            <p>
              Don’t worry. Our services won’t cost you an arm and a leg. Elite
              Virtual Assistant mission is to help businesses struggling with
              cold calling achieve their sales goals without breaking their
              bank.
            </p>
            <p>Say goodbye to cold calling woes forever.</p>
          </>
        </CallToActionSection>

        {blogSection && (
          <BlogSection
            cols={3}
            title={blogSection.header}
            selectedBlogs={blogSection.selectedBlogs}
            size={BlogSize.MEDIUM}
            buttonText={null}
          />
        )}

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
