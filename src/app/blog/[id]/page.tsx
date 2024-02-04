"use client";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { CallToActionSection } from "@/components/CallToActionSection/CallToActionSection";
import styled from "styled-components";

import Head from "next/head";
import { useGetData } from "@/firebase/useFetch";

type Blog = {
  imgSrc: string;
  title: string;
  body: string;
  description: string;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  margin-top: -20rem;
  display: flex;
  width: calc(var(--global-width) - 15rem);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;
  background-color: var(--primary-color-dark-1);
`;

const BlogHeader = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: var(--white);
  max-width: 50rem;
  margin: 0 auto;
  font-family: Montserrat, Sans-serif;
  font-weight: 800;
  line-height: 3.875rem;
  margin-bottom: 3rem;
`;

const BlogImageContainer = styled.div`
  margin-bottom: 3rem;
  width: 43.75rem;
  height: 31.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const BlogImage = styled.img``;

const BlogDescription = styled.span``;

const BlogBody = styled.div`
  * {
    font-family: var(--font-montserrat) !important;
    letter-spacing: 0 !important;
  }
  h1,
  h2 {
    font-weight: normal !important;
    * {
      font-weight: normal !important;
    }
  }
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700 !important;
    * {
      font-weight: 700 !important;
    }
  }

  h2 {
    margin: 1.875rem 0 !important;
    font-size: 3rem !important;
    letter-spacing: 0 !important;
    * {
      margin: 1.875rem 0 !important;
      font-size: 3rem !important;
      letter-spacing: 0 !important;
    }
  }
  p {
    margin: 2rem 0 !important;
    font-family: Montserrat, Sans-serif !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
    line-height: 1.7;
    * {
      margin: 2rem 0 !important;
      font-family: Montserrat, Sans-serif !important;
      font-size: 1rem !important;
      font-weight: 500 !important;
      line-height: 1.7;
    }
  }

  ul {
    position: relative;
    left: 2rem;
  }

  li {
    font-family: Montserrat, Sans-serif !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
    line-height: 1.7;
    * {
      font-family: Montserrat, Sans-serif !important;
      font-size: 1rem !important;
      font-weight: 500 !important;
      line-height: 1.7;
    }
  }
`;

type IBlogData = {
  title: string;
  description: string;
  body: string;
  imgSrc: string;
};

export default function Blogs({ params }: { params: { id: string } }) {
  const { id } = params;

  const [blog, _] = useGetData<IBlogData | null>(
    `/blogs/${id}`,
    null,
    () => {},
    () => {}
  );

  if (!blog) return null;

  return (
    <>
      <Head>
        <title>{blog?.title}</title>
        <meta name="description" content={blog?.description} />
      </Head>
      <Nav currentPathName="" />
      <Header />
      <Wrapper>
        <Container>
          <BlogHeader>{blog?.title}</BlogHeader>
          <BlogImageContainer>
            <BlogImage src={blog?.imgSrc} alt={blog?.title} />
          </BlogImageContainer>
          <BlogDescription>{blog?.description}</BlogDescription>
          <BlogBody
            dangerouslySetInnerHTML={{
              __html: blog?.body,
            }}
          />
        </Container>
      </Wrapper>
      <CallToActionSection
        title={"Learn more about our services"}
        video={"https://dialpros.com/wp-content/uploads/2022/12/video.mp4"}
        subTitle={"Schedule a free consultation with us"}
        href={"#"}
        buttonText={"Schedule A Call"}
      />
      <Footer />
    </>
  );
}
