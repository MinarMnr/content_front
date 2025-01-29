"use client";
import React from "react";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { StarIcon } from "@heroicons/react/24/solid";
import ReviewCard from "@/app/_components/ReviewCard";
import { getFIleUrl } from "@/app/_services/modifier";
import LangTra from "@/app/_components/lang-tra";

const Review = ({
  course_id,
  reviews,
}: {
  course_id: string;
  reviews: any[];
}) => {
  const review = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
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
    <div className="rounded-xl pt-14 p-3 mt-6">
      <div className="text-3xl font-semibold mb-6">
        <LangTra control="course_details.course_feat_review" />
      </div>
      <Carousel
        className="carousel-list carousel-list mt-5 grid md:grid-cols-1 grid-cols-1 gap-4"
        responsive={review}
      >
        {reviews?.map((tada: any, t_i: number) => (
          <ReviewCard
            key={t_i}
            name={tada?.name_en}
            title={tada?.phone}
            imageSrc={getFIleUrl(tada?.profile_photo, true)}
            rating={tada?.rating_point}
            review={tada?.comments}
            url_slug={`${course_id}-${t_i}`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Review;
