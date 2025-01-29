import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

const courseDetails = () => {
  return (
    <div className="pt-3">
      <div className="text-3xl text-green-800  font-black mb-6">
        {" "}
        Course Introduction{" "}
      </div>
      <div className="text-gray-500">
        <p className="mb-6 leading-7">
          {" "}
          If your dream is to study in Dhaka University, then this course will
          be the right decision for you! Because, there are up to 27 years as a
          teacher in this course Experienced teacher panel. Whose hands are
          numerous students are already different including Dhaka University
          They have fulfilled their dreams by enrolling in the university।{" "}
        </p>
        <p className="mb-6 leading-7">
          {" "}
          We know that this entrance exam is highly competitive Getting a chance
          is not an easy task, it takes a lot of study Need, along with need
          practice and preparation foolproof Do regular tests. So, this course
          is how we do it Arranged to understand all concepts in 97 live classes
          Then as many questions as possible on that topic There is one exam and
          advanced question solving 140 videos. 12 weekly tests and 20 MCQs and
          written models To know your ranking in the whole country with the test
          chance!{" "}
        </p>
        <p className="mb-6 leading-7">
          {" "}
          Also 100% accurate with most questions and solutions Printed Question
          Bank, Master Book and Exercise Book, BUET-DU-Medical Pass Guidelines
          for Experienced Teachers One-to-One Doubt Solving Session.{" "}
        </p>
      </div>
      <div className="text-gray-600 text-2xl font-extrabold mb-2 mt-10">
        {" "}
        What is in this course{" "}
      </div>
      <ul className="list-none leading-9 text-gray-600">
        <li className="flex gap-2">
          <CheckCircleIcon className="size-5 mt-2 bg-[#E7F6E9] text-green-700  rounded-full" />
          Teacher with up to 27 years of experience{" "}
        </li>
        <li className="flex gap-2">
          <CheckCircleIcon className="size-5 mt-2 bg-[#E7F6E9] text-green-700 rounded-full" />
          97+ interactive live classes and lecture sheets{" "}
        </li>
        <li className="flex gap-2">
          <CheckCircleIcon className="size-5 mt-2 bg-[#E7F6E9]text-green-700 rounded-full" />
          12 live classes per week{" "}
        </li>
        <li className="flex gap-2">
          <CheckCircleIcon className="size-5 mt-2 bg-[#E7F6E9] text-green-700 rounded-full" />
          Chapter wise lecture sheet{" "}
        </li>
        <li className="flex gap-2">
          <CheckCircleIcon className="size-5 mt-2 bg-[#E7F6E9] text-green-700 rounded-full" />
          3 sets of full model tests{" "}
        </li>
        <li className="flex gap-2">
          <CheckCircleIcon className="size-5 mt-2 bg-[#E7F6E9]  text-green-700 rounded-full" />
          Chapter wise report cards and QNA classes{" "}
        </li>
      </ul>
    </div>
  );
};

export default courseDetails;
