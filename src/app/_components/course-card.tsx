"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getFIleUrl } from "../_services/modifier";
import { show } from "../_services/api-call";
import { getClientCookie } from "../_services/storage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Rating from "./rating";
import LangTra from "./lang-tra";

const CourseCard = ({ data }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const clickHandle = () => {
    if (user) {
      if (data?.is_enrolled) {
        router.push(`/paid/${data?.url_slug}`);
      } else if (!data?.is_added_to_cart) {
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
        router.push("/purchase/cart");
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
    <div className="border border-gray-300 border-solid  rounded-md bg-white p-3">
      <Link
        href={
          data?.is_enrolled
            ? `/paid/${data?.url_slug}`
            : `/unpaid/${data?.url_slug}`
        }
      >
        <div className="overflow-hidden h-40">
          <Image
            src={getFIleUrl(data?.thumbnail?.path, true)}
            alt={""}
            width={500}
            height={500}
          />
        </div>
      </Link>
      <div className="px-3 py-5">
        <Link
          href={
            data?.is_enrolled
              ? `/paid/${data?.url_slug}`
              : `/unpaid/${data?.url_slug}`
          }
        >
          <div className="tracking-wide text font-bold text-gray-800 h-20 line-clamp-3 leading-7">
            {data?.title}
          </div>
          <Rating
            rating={data?.rating_point_avg}
            size={24}
            cid={data?.url_slug}
          />
          <div className="text-sm text-gray-500 line-clamp-1 mt-4">
            <LangTra control="sub_category.title_en" data={data} /> |{" "}
            <LangTra control="category.title_en" data={data} />
          </div>
        </Link>
        <div className="flex md:flex-row flex-col justify-between items-center pt-4 mt-3 border-t border-dashed border-gray-200 add-to-cart">
          <div className="flex flex-col">
            <div className="text-emerald-900 font-bold">
              <LangTra
                control="value"
                data={{
                  value: Number(data?.discounted_fee ?? data?.fee)?.toFixed(2),
                }}
              />{" "}
              <LangTra control="cart.tk" />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={clickHandle}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-900 hover:text-white"
            >
              {data?.is_enrolled ? (
                <LangTra control="cart.details" />
              ) : data?.is_added_to_cart ? (
                <LangTra control="cart.go_cart" />
              ) : (
                <LangTra control="cart.add_cart" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
