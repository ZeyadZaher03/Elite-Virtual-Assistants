import { Nav } from "@/components/Nav/Nav";
import { BlogSection } from "@/components/BlogSection/BlogSection";
import { CallToActionSection } from "@/components/CallToActionSection/CallToActionSection";
import { Header, OverlayProps } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

import { BlogSize } from "../types/types";

import blogPageInfo from "./../pageInfo/blogPageInfo.json";
import { Metadata } from "next";

interface IBlogPageData {
  sectionHeader: string;
  title: string;
  imgSrc: string;
  overlay: OverlayProps;
}

export const metadata: Metadata = {
  title: "Elite VA | Blogs",
  description:
    "We provide talented and highly creative Elite Virtual Assistants with various skills related to the services offered by our company.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function BlogsPage() {
  return (
    <>
      <Nav currentPathName="/blogs" />
      <main>
        <Header
          title={blogPageInfo.title}
          imgSrc={blogPageInfo.imgSrc}
          overlay={blogPageInfo.overlay}
        />

        <BlogSection
          getAllBlogs={true}
          selectedBlogs={[]}
          title={blogPageInfo.sectionHeader}
          cols={4}
          size={BlogSize.SMALL}
        />

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
