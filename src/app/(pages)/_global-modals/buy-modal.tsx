"use client";

import React, { useEffect, useState } from "react";
import Cart from "./cart";
import { show } from "@/app/_services/api-call";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LangTra from "@/app/_components/lang-tra";

const BuyModal = ({ setBuyModal, ...props }: any) => {
  const router = useRouter();
  const [cartData, setCartData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    setLoading(true);
    show({ api_key: "CART_API" })
      .then((resp: any) => {
        setLoading(false);
        if (resp?.status === "success") {
          setCartData(resp?.data);
          window.dispatchEvent(new Event("cart-items"));
        } else {
          setCartData([]);
          window.dispatchEvent(new Event("cart-items"));
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", (e) => {
      if ((e?.target as HTMLInputElement)?.id === "buy-modal-close") {
        setBuyModal(false);
        router.refresh();
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] z-50 flex justify-end items-stretch">
      <div className="flex-grow" id="buy-modal-close"></div>
      <div className="w-[600px]  overflow-y-auto bg-gray-100 border-8 border-white">
        <Cart
          loading={loading}
          setLoading={setLoading}
          data={cartData}
          callApi={callApi}
        />
        {!!cartData?.items?.length ? (
          <>
            <div className="border-t-2 border-slate-100">
              <div className="flex justify-start items-stretch gap-x-4 p-2">
                <div className="text-xl font-bold">
                  <LangTra control="cart.total" />:
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-bold">
                    <LangTra
                      control="value"
                      data={{ value: Number(cartData?.total)?.toFixed(2) }}
                    />{" "}
                    <LangTra control="cart.tk" />
                  </div>
                  <div className="line-through text-red-500">
                    {cartData?.discount ? (
                      <>
                        <LangTra
                          control="value"
                          data={{
                            value: Number(cartData?.subtotal)?.toFixed(2),
                          }}
                        />
                        <LangTra control="cart.tk" />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2">
              <Link
                href={"/purchase/cart"}
                onClick={() => {
                  setBuyModal(false);
                }}
                className="w-full block text-center py-3 bg-green-800 text-white text-xl rounded-full"
              >
                <LangTra control="cart.checkout" />
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BuyModal;
