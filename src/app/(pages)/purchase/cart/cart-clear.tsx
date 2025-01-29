"use client";

import LangTra from "@/app/_components/lang-tra";
import { kill } from "@/app/_services/api-call";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CartClear = ({ disabled }: { disabled: boolean }) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const router = useRouter();

  const deleteAction = () => {
    kill({ api_key: "CART_API", addon: `clear` }).then((resp: any) => {
      if (resp?.status === "success") {
        window.dispatchEvent(new Event("cart-items"));
        toast.success(resp?.message);
        setDeleteModal(false);
        router.refresh();
      } else {
        toast.error(resp?.error);
      }
    });
  };

  return (
    <>
      {deleteModal ? (
        <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-[#7979796e] z-10">
          <div className="w-[500px] h-400px] bg-white p-5 flex flex-col justify-center items-stretch gap-y-5">
            <div className="text-center text-xl font-bold text-red-600 mt-6">
              <LangTra control="cart.clr_cart" />
            </div>
            <div className="flex justify-between ps-4 pe-4 p-3">
              <button
                onClick={deleteAction}
                className="w-1/2 text-center py-2 bg-emerald-700 text-white rounded-full"
              >
                <LangTra control="cart.yes" />
              </button>
              <button
                onClick={() => {
                  setDeleteModal(false);
                }}
                className="w-1/2 text-center py-2 bg-red-700 rounded-full ms-2 text-white"
              >
                <LangTra control="cart.no" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button
        className={`px-4 py-2 text-white font-bold  rounded-full ${
          disabled ? "bg-[#8f2222]" : "bg-red-500"
        }`}
        onClick={() => setDeleteModal(true)}
        disabled={disabled}
      >
        <LangTra control="cart.cart_clr" />
      </button>
    </>
  );
};

export default CartClear;
