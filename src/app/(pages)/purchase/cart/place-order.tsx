"use client";

import { post } from "@/app/_services/api-call";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PlaceOrder = ({disabled} : {disabled: boolean}) => {
  const [orderStatus, setOrderStatus] = useState<
    "pending" | "complete" | "running"
  >("pending");
  const router = useRouter();

  const placeOrder = () => {
    setOrderStatus("running");
    post({ api_key: "PLACE_ORDER_API", body: {}, addon: "" })
      .then((resp: any) => {
        if (resp?.status === "success") {
          // toast.success(resp?.message);
          setOrderStatus("complete");
          router.push(`/purchase/payment?invoice-code=${resp?.data?.invoice_code}`);
        } else {
          toast.error(resp?.error);
          setOrderStatus("pending");
        }
      })
      .catch((error: any) => {
        toast.error(error?.error);
      });
  };

  return (
    <>
      <button
        onClick={placeOrder}
        className={`block w-full text-center py-3 text-white ${orderStatus !== 'pending' || disabled ? 'bg-slate-500' : 'bg-emerald-500'}`}
        disabled={orderStatus !== 'pending' || disabled}
      >
        Place Order
      </button>
    </>
  );
};

export default PlaceOrder;
