"use client";
import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import {
  BookOpenIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
  PlayCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import { SolidIconName } from "@/app/lib/sidebar";
import Informations from "../../_commons/informations";
import Instructors from "../../_commons/instructors";
import RelatedCourses from "../../_commons/related-courses";
import Review from "../../_commons/review";
import Syllabus from "../../_commons/syllabus";
import { show } from "@/app/_services/api-call";
import { getFIleUrl } from "@/app/_services/modifier";
import Rating from "@/app/_components/rating";
import Examination from "../../_commons/exam";
import MediaPlayer from "@/app/_components/media-player";
import LangTra from "@/app/_components/lang-tra";

const Page = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);

  const tabList: { accessor: string; c_id: string }[] = [
    {
      accessor: "course_overview",
      c_id: "intro",
    },
    {
      accessor: "course_content",
      c_id: "details",
    },
    {
      accessor: "course_instructor",
      c_id: "ins",
    },
    {
      accessor: "course_review",
      c_id: "rev",
    },
    {
      accessor: "course_faq",
      c_id: "ask",
    },
  ];
  const [currentTab, setCurrentTab]: [string, Function] = useState("");

  const [stickyClass, setStickyClass] = useState("");

  const [details, setDetails]: [
    any,
    React.Dispatch<React.SetStateAction<any>>
  ] = useState({});

  const [currentContent, setCurrentContent] = useState<{
    type: "media" | "document" | "exam" | "loading" | "";
    content_id: number;
    content_url?: string;
    course_id: number;
    module_id: number;
    extension?: string;
  } | null>(null);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    courseDetails();
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 650 ? setStickyClass("sticky-video") : setStickyClass("");
    }
  };

  const courseDetails = () => {
    show({ api_key: "COURSE_API", addon: params?.id })?.then((resp: any) => {
      if (resp?.status === "success") {
        setDetails(resp?.data);
      }
    });
  };

  const [relatedCourses, setRelatedCourses] = useState<any>([]);

  const getRelatedCourses = async (url_slug?: string) => {
    return show({
      api_key: "RELATED_COURSES",
      parameters: {
        page: 1,
        size: 10,
        ...(url_slug ? { url_slugs: url_slug?.split(",") } : []),
      },
    }).then((resp: any) => {
      setRelatedCourses(resp?.data);
      //return resp?.data;
    });
  };

  useEffect(() => {
    getRelatedCourses(details?.url_slug);
  }, [details]);

  return (
    <>
      <div className="w-full relative">
        <div className="overflow-hidden  -mb-[10%] relative banner-all-details">
          <div className="w-full h-full top-0 absolute m-auto  flex px-32">
            <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
              <div className="basis-full flex flex-col justify-center items-start mt-14">
                {" "}
                {/* <span className="text-3xl font-black text-white">
                  {" "}
                  {details?.title}{" "}
                </span>{" "} */}
                {/* <span className="text-xl mt-2 font-black text-green-200">
                {" "}
                ০১ আগস্ট ২০২৪{" "}
              </span>{" "} */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="container mx-auto px-6 pl-28 pr-28 relative -top-10 height-video-list">
            {/* <div
              className={`flex items-top flex-wrap shadow-lg bg-white-trans pt-9  p-1 navbar${
                vsticky.isvSticky ? " vsticky" : ""
              }`}
              ref={headerRef}
            > */}

            <div
              className={`flex items-top flex-wrap shadow-lg bg-white-trans pt-9  p-1 navbar ${stickyClass}`}
            >
              <div className="w-full md:w-2/3 pr-7 video-player">
                <div className="lg:mr-30px relative mb-10 lg:mb-0 -mt-8">
                  <div className="col-span-2 h-full relative">
                    {currentContent ? (
                      <>
                        {((tada) => {
                          switch (tada?.type) {
                            case "media":
                              return (
                                <MediaPlayer
                                  {...tada}
                                  c_class="w-[800px] h-[450px]"
                                  resolutions={[]}
                                />
                              );
                            case "document":
                              return (
                                <MediaPlayer
                                  {...tada}
                                  c_class="w-[800px] h-[450px]"
                                  resolutions={[]}
                                />
                              );
                            case "exam":
                              return (
                                <Examination
                                  exam_id={tada?.content_id ?? 0}
                                  course_id={tada?.course_id}
                                />
                              );
                            default:
                              return (
                                <div className="w-[800px] h-[450px] bg-white flex flex-col justify-center items-center">
                                  <svg
                                    width="100%"
                                    height="100"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="50"
                                      style={{ fill: "red" }}
                                    >
                                      <animate
                                        attributeName="cx"
                                        begin="0s"
                                        dur="8s"
                                        from="50"
                                        to="90%"
                                        repeatCount="indefinite"
                                      />
                                    </circle>
                                  </svg>
                                  <LangTra control="course_details.loading" />
                                </div>
                              );
                          }
                        })(currentContent)}
                      </>
                    ) : (
                      <>
                        {!!details?.course_trailers?.[0]?.trailer?.path ? (
                          <iframe
                            src={`${
                              getFIleUrl(
                                details?.course_trailers?.[0]?.trailer?.path,
                                true
                              ) ?? null
                            }`}
                            className="border-gray-100 border-[8px] h-[488px] min-w-full"
                            width={300}
                            height={226}
                          ></iframe>
                        ) : (
                          <>
                            <Image
                              className="border-gray-100 border-[8px] min-h-full min-w-full course-img"
                              src={getFIleUrl(details?.thumbnail?.path, true)}
                              alt=""
                              width={300}
                              height={226}
                            />
                            <label className="absolute inset-x-0 mx-auto d-b w-10 h-10  block top-24">
                              <PlayCircleIcon className="text-white size-12" />
                            </label>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* start w-full md:w-1/3 */}
              <div className="w-full md:w-1/3 pl-0 relative -mt-8 play-list">
                <Syllabus
                  modules={details?.course_modules}
                  course_id={details?.url_slug}
                  show_header={false}
                  setModal={setCurrentContent}
                  current={(() => {
                    let tempM: number = (
                      details?.course_modules as any[]
                    )?.findIndex(
                      (tada: any) => tada?.id === currentContent?.module_id
                    );
                    let tempC: number = (
                      details?.course_modules?.[tempM]?.module_contents as any[]
                    )?.findIndex(
                      (tada: any) => tada?.id === currentContent?.content_id
                    );
                    return {
                      module: tempM,
                      content: tempC,
                    };
                  })()}
                />
              </div>
              {/* current={currentContent} */}
              {/*end w-full md:w-1/3 */}
            </div>
          </div>
          <div className="container mx-auto px-6 pl-28  ">
            <div className="flex items-top flex-wrap">
              <div className="w-full md:w-2/3 pr-10">
                <div className="lg:mr-30px relative mb-10 lg:mb-0">
                  <ul className="block w-3/3 sm:flex lg:mt-0 courses-lisy-tab h-10 mb-8 font-semibold text-sm text-center  ">
                    {tabList?.map((tab, i) => (
                      <li
                        key={i}
                        className="relative border-b-2 bg-white flex flex-col w-full"
                      >
                        <Link
                          className={`text-gray-500 ${
                            currentTab === tab?.c_id && "active-couser-list"
                          }`}
                          href={`#${tab?.c_id}`}
                          onClick={() => {
                            setCurrentTab(tab?.c_id);
                          }}
                        >
                          <LangTra
                            control={`course_details.${tab?.accessor}`}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div id="intro" className="text-[#181414] w-full py-4">
                    <div className="pt-3 flex justify-start items-start">
                      <div className="flex-grow flex flex-col">
                        <span className="text-4xl">{details?.title}</span>
                        <span className="text-3xl">
                          {details?.category?.title_en}
                          {details?.sub_category
                            ? ` (${details?.sub_category?.title_en})`
                            : ""}
                        </span>
                        <div className="grid grid-cols-3 py-4">
                          <div className="flex items-center gap-2">
                            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#cdffee] text-green-700 " />
                            <span className="pt-3">
                              <LangTra control="course_details.topic" /> <br />
                              <span className="text-green-700">
                                <LangTra
                                  control="value"
                                  data={{
                                    value: details?.course_modules_count ?? 0,
                                  }}
                                />
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#E3F6FE] text-[#03A9F4]" />
                            <span className="pt-3">
                              <LangTra control="course_details.lessons" />{" "}
                              <br />
                              <span className="text-teal-500">
                                <LangTra
                                  control="value"
                                  data={{
                                    value: details?.module_contents_count ?? 0,
                                  }}
                                />
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#FCEDEC] text-[#E23A31]" />
                            <span className="pt-3">
                              <LangTra control="course_details.a_v" />
                              <br />
                              <span className="text-red-500">
                                <LangTra
                                  control="value"
                                  data={{
                                    value:
                                      details?.audio_video_contents_count ?? 0,
                                  }}
                                />
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#F8EFFF] text-[#B95FFD]" />
                            <span className="pt-3">
                              <LangTra control="course_details.docs" /> <br />
                              <span className="text-purple-600">
                                <LangTra
                                  control="value"
                                  data={{
                                    value:
                                      details?.document_contents_count ?? 0,
                                  }}
                                />
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#F5FCEC] text-[#9ADE45]" />
                            <span className="pt-3">
                              <LangTra control="course_details.exams" /> <br />
                              <span className="text-lime-600">
                                <LangTra
                                  control="value"
                                  data={{
                                    value: details?.exam_contents_count ?? 0,
                                  }}
                                />
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpenIcon className="size-10 p-2 rounded-full bg-[#FEF7E8] text-[#F7B320]" />
                            <span className="pt-3">
                              <LangTra control="course_details.duration" />{" "}
                              <br />
                              <span className="text-yellow-500">
                                <LangTra
                                  control="value"
                                  data={{
                                    value: details?.duration_sum ?? 0,
                                  }}
                                />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <Rating
                        rating={Number(details?.rating_point_avg)}
                        edit_data={
                          details?.is_enrolled
                            ? details?.user_rating
                              ? details?.user_rating
                              : {}
                            : null
                        }
                        url_slug={details?.url_slug}
                        callback={courseDetails}
                      />
                    </div>
                    <div className="pt-3">
                      <div className="text-3xl font-semibold mb-6">
                        <LangTra control="course_details.course_overview" />
                      </div>
                      <div>
                        <p
                          className="remove-all"
                          dangerouslySetInnerHTML={{
                            __html: details?.description,
                          }}
                        ></p>
                        <p
                          className="remove-all"
                          dangerouslySetInnerHTML={{
                            __html: details?.specification,
                          }}
                        ></p>
                        <p
                          className="remove-all"
                          dangerouslySetInnerHTML={{
                            __html: details?.requirement,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                  <div id="details" className="pt-10">
                    <Syllabus
                      modules={details?.course_modules}
                      course_id={details?.url_slug}
                    />
                  </div>
                  <div id="ins">
                    <Instructors instructors={details?.course_instructors} />
                  </div>
                  <div id="rev">
                    <Review
                      reviews={details?.course_ratings ?? []}
                      course_id={details?.url_slug}
                    />
                  </div>
                  <div id="ask">
                    <Informations faqs={details?.course_faqs} />
                  </div>
                </div>
                {/* <RelatedCourses /> */}
                <RelatedCourses data={relatedCourses} />
              </div>
              {/* end  w-full md:w-2/3 */}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

// {/* absolute top-[63px] right-96 */}
// <div className="flex flex-col justify-start items-stretch h-full">
//   <div className="bg-[#E0E2DF] text-green-800  pl-5 py-3 text-xl  font-bold">
//     {" "}
//     Playlist{" "}
//   </div>
//   <div className="p-4 w-full bg-[#F5FAF9] rounded-b-xl grow">
//     <div className="bg-[#312E2E] flex flex-col justify-start items-stretch p-4 gap-y-2 h-97 overflow-x-auto scrool_ber">
//       <div>
//         <p className="text-white text-xl font-bold">
//           Chapter One
//         </p>
//         <div className="text-[#f09d61] flex items-center">
//           <ClipboardDocumentIcon className="size-4" />
//           <span>3 Videos</span>{" "}
//         </div>
//       </div>
//       {moduleItems?.map((module, index: number) => (
//         <div
//           key={index}
//           className={`flex items-center bg-[#DFE0DF] px-3 py-4 rounded-lg gap-x-2 ${
//             lastActive === index
//               ? "border-l-[4px] border-[#F1A753]"
//               : ""
//           }`}
//           onClick={() => {
//             setActiveItem(index);
//             setLastActive(index);
//           }}
//         >
//           <DynamicHeroIcon
//             s_icon={module?.icon}
//             className={`size-7 p-2 text-white rounded-full ${
//               lastActive === index
//                 ? "bg-[#F2A043E5]"
//                 : "bg-[#DFE0DF]"
//             }`}
//           />
//           <div className="grow font-bold">
//             {index + 1}. {module?.title}
//           </div>
//           <span className="text-[#DB2D29]">
//             {module?.duration}
//           </span>{" "}
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

// {modal ? (
//   <Modal closeModal={setModal}>
//   {modal?.type === "exam" ? (
//     <Examination
//       exam_id={modal?.content_id ?? 0}
//       course_id={modal?.course_id}
//     />
//   ) : (
//     <div className="bg-white p-3">
//       <iframe
//         src={modal?.content_url ?? ""}
//         className="w-[800px] h-[450px]"
//       ></iframe>
//     </div>
//   )}
// </Modal>
// ) : null}
