import ReviewCard from "@/app/_components/ReviewCard";
import { getFIleUrl } from "@/app/_services/modifier";
import React from "react";

const Reviews = ({ data }: { data: any }) => {
  return (
    <>
      <div className="w-full text-3xl font-semibold mb-6">Reviews</div>
      <div className="grid grid-cols-3 gap-1">
        {data?.course_ratings?.map((tada: any, t_i: number) => (
          <ReviewCard
            key={t_i}
            name={tada?.name_en}
            title={tada?.phone}
            imageSrc={getFIleUrl(tada?.profile_photo, true)}
            rating={tada?.rating_point}
            review={tada?.comments}
            url_slug={`${data?.url_slug}-${t_i}`}
          />
        ))}
      </div>
    </>
  );
};

export default Reviews;
