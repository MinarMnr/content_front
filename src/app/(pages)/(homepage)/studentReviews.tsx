"use client";
import React from "react";
import ReviewCard from "../../_components/ReviewCard";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getFIleUrl } from "@/app/_services/modifier";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/translations";
const StudentReview = ({ data }: { data: any }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      className="py-20 bg-no-repeat bg-center slider-padding-less relative"
      style={{
        backgroundImage: "url('/reviewsBaground.png')",
      }}
    >
      <div className="container mx-auto pl-28 pr-28 relative z-20">
        <div className="text-center mb-5">
          {/* <p className="text-green-700">Why You Should Choose Edutube</p> */}
          <h2 className="text-3xl font-bold">
            {t.home_top_review.user_top_rev}
          </h2>
        </div>

        <div className="flex justify-center items-center space-x-4">
          {data && data?.length ? (
            <Carousel
              className="carousel-list mt-5 w-full reviews"
              responsive={responsive}
            >
              {data?.map((tada: any, index: number) => (
                <ReviewCard
                  key={index}
                  name={tada?.name_en}
                  title={tada?.phone}
                  imageSrc={getFIleUrl(tada?.profile_photo, true)}
                  rating={tada?.rating_point}
                  review={tada?.comments}
                  url_slug={tada?.course?.url_slug}
                  enrolled={tada?.course?.is_enrolled}
                />
              ))}
            </Carousel>
          ) : null}
        </div>
      </div>
      <Image
        className="student-review shapemover"
        src={"/faq-5.webp"}
        alt={""}
        width={700}
        height={700}
      />
    </div>
  );
};

export default StudentReview;
