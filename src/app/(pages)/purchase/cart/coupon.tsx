"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import LangTra from "@/app/_components/lang-tra";
import { kill, post } from "@/app/_services/api-call";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Coupon = ({ available_coupons, disabled }: any) => {
  const router = useRouter();

  const [couponCode, setCouponCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const applyCoupon = () => {
    post({
      api_key: "CART_API",
      body: {
        coupon_code: couponCode,
      },
      addon: "apply/coupon",
    })
      .then((resp: any) => {
        if (resp?.status === "success") {
          toast.success(resp?.message);
          setCouponCode("");
          router.refresh();
        } else {
          setError(resp?.error);
        }
      })
      .catch((error: any) => {
        setError(error?.error);
      });
  };

  const removeCoupon = (data: any) => {
    kill({
      api_key: "CART_API",
      addon: `remove/coupon/${data?.url_slug}`,
    }).then((resp: any) => {
      if (resp?.status === "success") {
        toast.success(resp?.message);
        router.refresh();
      } else {
        toast.error(resp?.error);
      }
    });
  };

  useEffect(() => {
    if (couponCode?.length === 0) {
      setError("");
    }
  }, [couponCode]);

  return (
    <div className="flex flex-col justify-start items-stretch py-2 gap-y-4">
      <div className="flex border border-dotted border-gray-400 justify-start items-stretch p-1 rounded-full">
        <input
          type="text"
          className="flex-grow rounded-full text-center"
          placeholder="Add Coupon Code"
          disabled={disabled}
          onChange={(e) => setCouponCode(e?.target?.value)}
          value={couponCode}
          onKeyUp={(e) => {
            if (e?.key === "Enter" && !!couponCode?.length) applyCoupon();
          }}
        />
        <button
          className={`px-6 py-2 rounded-full text-white ${
            disabled || !couponCode?.length ? "bg-slate-500" : "bg-emerald-500"
          }`}
          onClick={applyCoupon}
          title="Add Coupon"
          disabled={disabled || !couponCode?.length}
        >
          <span>
            <LangTra control="cart.apply" />
          </span>
        </button>
      </div>
      <div className="text-red-500 text-sm font-bold text-center -mt-4">
        {error}
      </div>
      <div className="border border-dashed border-gray-300 flex flex-col justify-start items-stretch">
        {available_coupons?.map((tada: any, index: number) => (
          <div key={index} className="grid grid-cols-5 p-2">
            <div className="col-span-3 flex flex-col">
              <span className="font-bold text-lg text-emerald-500">
                {tada?.title}
              </span>
              <span className="text-sm text-gray-500">{tada?.code}</span>
            </div>
            <div className="col-span-2 flex justify-end items-center text-gray-500">
              <button
                className="text-red-400 ps-2"
                title="Remove Coupon"
                onClick={() => {
                  removeCoupon(tada);
                }}
              >
                <DynamicHeroIcon className="size-6 border" s_icon="TrashIcon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupon;
