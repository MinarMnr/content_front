"use client";

import { post } from "@/app/_services/api-call";
import { getFIleUrl } from "@/app/_services/modifier";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LangTra from "@/app/_components/lang-tra";
import FuckHim from "./CustomButton";

const Gateway = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [invoiceEndPoint, setInvoiceEndPoint] = useState<string>("");

  let clickButton = () => {
    window.setTimeout(() => {
      document.getElementById("sslczPayBtn")?.click();
      setLoading(false);
    }, 2000);
  };

  let removeScript = () => {
    document.getElementById("sandbox-of-ssl-commerz")?.remove();
  };

  let setScript = () => {
    let script = document.createElement("script");
    let tag = document.getElementsByTagName("script")[0];
    // script.src = "https://seamless-epay.sslcommerz.com/embed.min.js?" + Math.random().toString(36).substring(7); // USE THIS FOR LIVE
    script.src = `https://sandbox.sslcommerz.com/embed.min.js?${Math.random()
      .toString(36)
      .substring(7)}`;
    script.id = `sandbox-of-ssl-commerz`;
    tag?.parentNode?.insertBefore(script, tag);
  };

  useEffect(() => {
    removeScript();
    if (invoiceEndPoint) {
      setScript();
      clickButton();
    }
  }, [invoiceEndPoint]);

  const placeOrder = () => {
    setLoading(true);
    post({ api_key: "PLACE_ORDER_API", body: {}, addon: "" })
      .then((resp: any) => {
        if (resp?.status === "success") {
          setInvoiceEndPoint(
            getFIleUrl(resp?.data?.invoice_code, false, "PAYMENT_API", true, true)
          );
        } else {
          toast.error(resp?.error);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        toast.error(error?.error);
        setLoading(false);
      });
  };

  return (
    <>
      {invoiceEndPoint ? (
        <FuckHim
          className="btn btn-primary btn-lg btn-block hidden"
          id="sslczPayBtn"
          token={``}
          postdata="your javascript arrays or objects which requires in backend"
          order="1"
          endpoint={invoiceEndPoint}
        ></FuckHim>
      ) : null}
      <button
        onClick={placeOrder}
        className={`block w-full text-center py-2 text-white ${
          loading ? "bg-slate-500" : "bg-emerald-500"
        }`}
        disabled={loading}
      >
        <LangTra control="payment.pay_now" />
      </button>
    </>
  );
};

export default Gateway;
