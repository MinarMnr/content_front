"use client";
import React from "react";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Link from "next/link";
import { getFIleUrl } from "@/app/_services/modifier";

import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { show } from "@/app/_services/api-call";
import { getClientCookie } from "@/app/_services/storage";
import LangTra from "@/app/_components/lang-tra";
const RelatedCourses = ({ data }: any) => {
  const router = useRouter();

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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [user, setUser] = useState<any>(null);

  const clickHandle = (data: any) => {
    if (user) {
      if (!data?.is_added_to_cart) {
        show({
          api_key: "CART_API",
          addon: `add/${data?.url_slug}`,
          show_msg: true,
        })
          .then((resp: any) => {
            if (resp?.status === "success") {
              window.dispatchEvent(new Event("cart-items"));
              toast.success(resp?.message);
              router.refresh();
            } else {
              toast.error(resp?.error);
            }
          })
          .catch((error: any) => {
            toast.error(error?.error);
          });
      } else {
        router.push("/cart");
      }
    } else {
      let pathname = usePathname();
      let searchParams = useSearchParams();
      let fullUrl = `${pathname}${
        searchParams.size != 0 ? `?${searchParams.toString()}` : ""
      }`;

      router.push(`/api/auth/authorize?${fullUrl}`);
    }
  };

  useEffect(() => {
    let tada = getClientCookie("edutube-auth-user");
    if (tada) {
      setUser(tada);
    }
  }, []);

  return (
    <div className="py-12">
      <div className="text-3xl mb-4">
        <LangTra control="course_details.course_related" />
      </div>

      {data && data?.length > 0 && (
        <Carousel
          className="carousel-list carousel-list mt-5 grid md:grid-cols-3 grid-cols-1 gap-4"
          responsive={responsive}
        >
          {data?.map((item: any, index: number) => (
            <div
              className="border-2 border-gray-100 border-solid p-1 rounded-md"
              key={index}
            >
              <Link href={`/unpaid/${item?.url_slug}`}>
                <div className="overflow-hidden h-40">
                  <Image
                    src={getFIleUrl(item?.thumbnail?.path, true)}
                    alt={""}
                    width={500}
                    height={500}
                  />
                </div>
              </Link>
              <div className="px-3 py-2">
                <div className="tracking-wide text font-bold text-gray-500 h-20 line-clamp-3">
                  {item?.title}
                </div>
                <div className="text-sm text-gray-400 line-clamp-1 mt-4">
                  <LangTra control="sub_category.title_en" data={item} /> | <LangTra control="category.title_en" data={item} />
                </div>
                <div className="flex md:flex-row flex-col justify-between items-center pt-4">
                  <div className="text-green-800 font-bold">
                    <LangTra control="value" data={{value: item?.fee ? item?.fee : '0.00'}} /> <LangTra control="cart.tk" />
                  </div>

                  <button
                    onClick={() => clickHandle(item)}
                    className="bg-green-200 text-black px-6 py-2 rounded-md"
                  >
                    {item?.is_added_to_cart ? <LangTra control="course_details.go_cart" /> : <LangTra control="cart.add_cart" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default RelatedCourses;
