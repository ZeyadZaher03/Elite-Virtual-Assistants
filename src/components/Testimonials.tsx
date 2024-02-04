import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { SectionHeader } from "./SectionHeader/SectionHeader";
import { useGetData } from "@/firebase/useFetch";

const Container = styled.div`
  background-color: transparent;
  background-image: linear-gradient(106deg, #00162a 0, #164876 100%);
  padding: 4.375rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .slick-list {
    margin: 0 -5px;
  }
  .slick-slide > div {
    padding: 0 5px;
  }
`;

const TestimonialWrapper = styled.div`
  width: 50%;
`;

const TestimonialItem = styled.div`
  background-color: var(--white);
  padding: 2rem;
  border-radius: 6px;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  height: 17rem;
  flex-direction: column;
`;

const TestimonialBody = styled.p`
  margin-bottom: 1.5625rem;
  color: var(--black);
  font-size: 1.25rem;
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0.5px;
  text-align: center;
`;

const TestimonialName = styled.span`
  color: var(--black);
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  display: block;
  text-align: center;
`;

const TestimonialPos = styled.span`
  color: var(--primary-color-light-1);
  font-family: Montserrat, Sans-serif;
  font-style: italic;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  display: block;
`;

interface ITestimonialsData {
  body: string;
  name: string;
  title: string;
}

export const Testimonials = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  const settings = {
    dots: true,
    swipeToSlide: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    customPaging: (i: number) => <></>,
  };

  const [testimonials, getTestimonials] = useGetData<
    ITestimonialsData[] | null
  >(
    "/faqs",
    null,
    () => {},
    () => {}
  );

  useEffect(() => {
    getTestimonials();
  }, [getTestimonials]);

  return (
    <Container>
      <SectionHeader title={title} subTitle={subTitle} titleColor={"#fff"} />
      <TestimonialWrapper>
        <Slider {...settings}>
          {Object.entries(testimonials || {})?.map(
            ([idx, { body, name, title }]) => (
              <TestimonialItem key={idx}>
                <TestimonialBody>{body}</TestimonialBody>
                <div>
                  <TestimonialName>{name}</TestimonialName>
                  <TestimonialPos>{title}</TestimonialPos>
                </div>
              </TestimonialItem>
            )
          )}
        </Slider>
      </TestimonialWrapper>
    </Container>
  );
};
