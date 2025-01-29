"use client";
import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import {
  BookOpenIcon,
  PlayCircleIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Informations from "../../_commons/informations";
import Instructors from "../../_commons/instructors";
import RelatedCourses from "../../_commons/related-courses";
import Review from "../../_commons/review";
import Syllabus from "../../_commons/syllabus";
import { show } from "@/app/_services/api-call";
import { getClientCookie } from "@/app/_services/storage";
import { getFIleUrl } from "@/app/_services/modifier";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Rating from "@/app/_components/rating";
import LangTra from "@/app/_components/lang-tra";

const Page = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const [stickyClass, setStickyClass] = useState("");
  const [user, setUser] = useState<any>(null);
  const [currentTab, setCurrentTab]: [string, Function] = useState("");

  const [details, setDetails]: [
    any,
    React.Dispatch<React.SetStateAction<any>>
  ] = useState({});

  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullUrl = `${pathname}${
    searchParams.size != 0 ? `?${searchParams.toString()}` : ""
  }`;

  useEffect(() => {
    if (currentTab) {
      const targetElement = document.getElementById(currentTab);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp: any = await show({
          api_key: "COURSE_API",
          addon: params?.id,
        });
        if (resp?.status === "success") {
          setDetails(resp?.data);

          if (typeof window !== "undefined") {
            let removeHash = window.location.hash.substring(1) ?? "";
            setCurrentTab(removeHash);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    window.addEventListener("scroll", stickNavbar);

    fetchData();

    const data = getClientCookie("edutube-auth-user");
    if (data) {
      setUser(data);
    }

    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 450
        ? setStickyClass("sticky-package")
        : setStickyClass("");
    }
  };

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

  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [relatedCourses, setRelatedCourses] = useState<any>([]);

  const generateStars = (rating: number) => {
    return Array(5)
      .fill(null)
      .map((_, index) => (
        <StarIcon
          key={index}
          className={`size-5 ${
            index < rating ? "text-orange-600" : "text-gray-400"
          }`}
        />
      ));
  };

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
    setStars(generateStars(details?.rating_point_avg || 0));
    getRelatedCourses(details?.url_slug);
  }, [details]);

  return (
    <div className="w-full relative">
      <div className="overflow-hidden relative banner-all">
        <div className="w-full h-full top-0 absolute m-auto px-32">
          <div className="container mx-auto pt-30 pb-90px pl-28 pr-28">
            <div className="basis-full flex flex-col justify-center items-start py-24">
              <span className="text-3xl mt-5 font-black text-white">
                {details?.title}
              </span>
              <span className="text-xl text-white font-semibold">
                {details?.sub_title}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="container mx-auto px-6 pl-28 pr-28 ">
          <div className="flex items-top flex-wrap">
            {/* start  w-full md:w-2/3 */}
            <div className="w-full md:w-2/3 pr-10">
              <div className="lg:mr-30px relative mb-10 lg:mb-0 mt-8">
                <ul className="block w-3/3 sm:flex lg:mt-0 courses-lisy-tab h-10 mb-8 font-semibold text-sm text-center ">
                  {tabList?.map((tab: any, index: number) => (
                    <li
                      key={index}
                      className="relative border-b-2 bg-white flex flex-col w-full"
                    >
                      <Link
                        className={`text-gray-500 ${
                          currentTab === tab?.c_id && "active-couser-list"
                        }`}
                        href={`#${tab?.c_id}`}
                        onClick={() => setCurrentTab(tab?.c_id)}
                      >
                        <LangTra control={`course_details.${tab?.accessor}`} />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div id="intro" className="text-[#181414] w-full py-8">
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
                    course_id={params?.id}
                  />
                </div>
                <div id="ins" className="pt-10">
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
            <div className="w-full md:w-1/3 pl-8">
              <div
                className={`buy-card  flex -mt-1  -top-56  relative flex-col justify-start items-stretch bg-white z-[1] border border-[#EBEBEB] navbar ${stickyClass}`}
              >
                {!!details?.course_trailers?.[0]?.trailer?.path ? (
                  <iframe
                    src={`${
                      getFIleUrl(
                        details?.course_trailers?.[0]?.trailer?.path,
                        true
                      ) ?? null
                    }`}
                    className="border-x-4 border-t-4 border-white w-full course-image-thum"
                    width={300}
                    height={226}
                  ></iframe>
                ) : (
                  <>
                    <Image
                      className="border-x-4 border-t-4 border-white w-full course-image-thum"
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
                <div className="py-4 px-8">
                  <div className="w-full border-b-2 border-dashed  border-[#a3bea1] grid grid-cols-2 gap-y-2 pb-4">
                    <div className="text-xl font-bold">{details?.title}</div>
                    <div className="pl-6 flex">
                      <Rating rating={Number(details?.rating_point_avg)} />
                    </div>
                    <div className="text-[#BFBFBF]">
                      <LangTra control="sub_category.title_en" data={details} />{" "}
                      | <LangTra control="category.title_en" data={details} />
                    </div>
                    <div className="text-2xl text-green-700 font-bold pl-10">
                      {!!details?.discounted_fee ? (
                        <>
                          <LangTra
                            control="value"
                            data={{
                              value: Number(
                                details?.discounted_fee ?? details?.fee
                              )?.toFixed(2),
                            }}
                          />{" "}
                          <LangTra control="cart.tk" />
                        </>
                      ) : (
                        <LangTra control="course_details.free" />
                      )}
                      <br />
                      {Number(details?.discount) ? (
                        <span className="text-red-400 font-light text-lg line-through">
                          {details?.fee ? (
                            <LangTra
                              control="value"
                              data={{ value: Number(details?.fee)?.toFixed(2) }}
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 place-content-between gap-x-6 gap-y-4 pt-4">
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
                        <LangTra control="course_details.lessons" /> <br />
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
                              value: details?.audio_video_contents_count ?? 0,
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
                              value: details?.document_contents_count ?? 0,
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
                        <LangTra control="course_details.duration" /> <br />
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
                  {!user ? (
                    <Link href={`/api/auth/authorize?${fullUrl}`}>
                      <button
                        type="button"
                        className="px-12 mt-6 py-3 bg-green-700 rounded-full w-full text-center text-white hover:bg-green-600"
                      >
                        <LangTra control="course_details.buy_now" />
                      </button>
                    </Link>
                  ) : null}
                  {!!user ? (
                    details?.is_added_to_cart ? (
                      <Link href={"/purchase/cart"}>
                        <button
                          type="button"
                          className="px-12 mt-6 py-3 bg-green-700 rounded-full w-full text-center text-white hover:bg-green-600"
                        >
                          <LangTra control="course_details.go_cart" />
                        </button>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="px-12 mt-6 py-3 bg-green-700 rounded-full w-full text-center text-white hover:bg-green-600"
                        onClick={() => {
                          show({
                            api_key: "CART_API",
                            addon: `add/${details?.url_slug}`,
                            show_msg: true,
                          })
                            .then((resp: any) => {
                              if (resp?.status === "success") {
                                window.dispatchEvent(new Event("cart-items"));
                                toast.success(resp?.message);
                                router.push("/purchase/cart");
                              } else {
                                toast.error(resp?.error);
                              }
                            })
                            .catch((error: any) => {
                              toast.error(error?.error);
                            });
                        }}
                      >
                        <LangTra control="course_details.buy_now" />
                      </button>
                    )
                  ) : null}
                </div>
              </div>
            </div>

            {/*end w-full md:w-1/3 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
