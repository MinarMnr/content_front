import { show } from "@/app/_services/api-call";
import React from "react";
import { toast } from "react-toastify";
import Invoice from "./invoice";
import Link from "next/link";
import Gateway from "./gateway";
import LangTra from "@/app/_components/lang-tra";

const Page = async () => {
  let cartData: any;

  await show({
    api_key: "CART_API",
  })
    .then((resp: any) => {
      if (resp?.status === "success") {
        cartData = {
          ...resp?.data,
          items: resp?.data?.items?.filter((tada: any) => !!tada?.selected),
          coupons: resp?.data?.appliedCoupons
        };
      } else {
        toast.error(resp?.error);
        cartData = undefined;
      }
    })
    .catch((error: any) => {
      cartData = undefined;
    });

  return (
    <div className="flex flex-col justify-start items-stretch bg-gray-50 border border-gray-100">
      <div className="text-3xl font-black text-slate-500 w-full text-center bg-gray-100 p-3 border-b border-dashed">
        <LangTra control="cart.checkout" />
      </div>
      <div className="flex items-start justify-start gap-x-3">
        <div className="flex-grow py-4">
          <Invoice data={cartData} />
        </div>
        <div className="py-4 flex flex-col justify-start items-stretch gap-y-2 text-nowrap pe-3 mt-11">
          <Link
            href={"/purchase/cart"}
            className="text-center px-10 py-2 bg-red-400 text-white"
          >
            <LangTra control="payment.go_back" />
          </Link>
          <Gateway />
        </div>
      </div>
    </div>
  );
};

export default Page;
