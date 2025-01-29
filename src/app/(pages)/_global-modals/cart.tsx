"use client";

import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import LangTra from "@/app/_components/lang-tra";
import { kill, show } from "@/app/_services/api-call";
import { getFIleUrl } from "@/app/_services/modifier";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Cart = ({ data, callApi, loading, setLoading, ...props }: any) => {
  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState<string>("");

  const saveList = (control: string | boolean) => {
    let items: string[] = [];
    switch (typeof control) {
      case "string":
        items = [control];
        break;
      case "boolean":
        items = (data?.items as any[])?.reduce(
          (pV: any[], cV: any) =>
            Boolean(cV?.selected) !== control ? [...pV, cV?.url_slug] : pV,
          []
        );
        break;
      default:
        break;
    }
    show({
      api_key: "CART_API",
      addon: "select",
      parameters: {
        courses: items,
      },
    })
      .then((resp: any) => {
        if (callApi) {
          callApi();
        } else {
          router.refresh();
        }
      })
      .catch(() => {
      });
  };

  const deleteAction = () => {
    kill({ api_key: "CART_API", addon: `remove/${deleteModal}` }).then(
      (resp: any) => {
        if (resp?.status === "success") {
          toast.success(resp?.message);
          if (callApi) {
            callApi();
          } else {
            router.refresh();
          }
          window.dispatchEvent(new Event("cart-items"));
          setDeleteModal("");
        } else {
          toast.error(resp?.error);
        }
      }
    );
  };

  return (
    <>
      {deleteModal ? (
        <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-[#7979796e] z-10 ">
          <div className="w-[500px] h-400px] bg-white p-4 flex flex-col justify-center items-stretch gap-y-5 guarantee_block">
            <div className="text-center ">
              <h3>
                <LangTra control="cart.remove_cart_msg" />
              </h3>
            </div>
            <div className="flex justify-between">
              <button
                onClick={deleteAction}
                className="w-1/2 text-center py-2 bg-green-300"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setDeleteModal("");
                }}
                className="w-1/2 text-center py-2 bg-red-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full py-3 px-1 cart_summery_block bg-gray border border-gray-200 rounded-none">
        <div className="relative flex flex-col justify-start items-stretch max-h-[95%] w-full  gap-y-0 pt-8 pr-2">
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="w-[150px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 150"
              >
                <path
                  fill="none"
                  stroke="#00BD25"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeDasharray="300 385"
                  strokeDashoffset="0"
                  d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    calcMode="spline"
                    dur="2"
                    values="685;-685"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                  ></animate>
                </path>
              </svg>
            </div>
          ) : !!data?.items?.length ? (
            <>
              <div className="absolute top-4 right-[9px] flex items-center gap-2 bg-white border border-gray-100 rounded-full p-1 ps-3 pe-3">
                <input
                  id="check-all"
                  type="checkbox"
                  checked={!data?.items?.find((tada: any) => !tada?.selected)}
                  className="w-5 h-5"
                  onChange={(e) => {
                    saveList(!!e?.target?.checked);
                  }}
                />
                <label
                  className="font-dark text-slate-500 text-lg"
                  htmlFor="check-all"
                >
                  <LangTra control="cart.check_all" />
                </label>
              </div>
              <br />
              {data?.items?.map((tada: any, index: number) => (
                <ul
                  key={index}
                  className="cart_summery_block bg-white border border-gray2-50 rounded-none   chart-list mt-1"
                >
                  <li key={index}>
                    <input  className="w-5 h-5 right-2 relative"
                      type="checkbox"
                      id={`cart-check-list-${index}`}
                      checked={!!tada?.selected}
                      onChange={(e) => {
                        saveList(tada?.url_slug);
                      }}
                    />
                    <div className="product_img">
                      <Image
                        src={getFIleUrl(tada?.thumbnail?.path, true)}
                        alt="image"
                        width={500}
                        height={500}
                        className="w-full"
                      />
                    </div>
                    <div className="product_quantity ps-2">
                      <h6>
                        <span className="">{tada?.title}</span>
                      </h6>
                    </div>
                    <div className="product_price">
                      <h4>
                        <div className="flex flex-col items-end">
                          {tada?.selected ? (
                            <>
                              <span className="text-sm text-slate-700 font-bold text-nowrap">
                                <LangTra
                                  control="value"
                                  data={{
                                    value: Number(
                                      tada?.discounted_fee
                                    )?.toFixed(2),
                                  }}
                                />{" "}
                                <LangTra control="cart.tk" />
                              </span>
                              {Number(tada?.discount) ? (
                                <span className="text-red-500 font-light line-through nowrap">
                                  <LangTra
                                    control="value"
                                    data={{
                                      value: Number(tada?.fee)?.toFixed(2),
                                    }}
                                  />{" "}
                                  <LangTra control="cart.tk" />
                                </span>
                              ) : null}
                            </>
                          ) : (
                            <span className="text-sm text-slate-400 font-bold text-nowrap">
                              <LangTra
                                control="value"
                                data={{ value: Number(tada?.fee)?.toFixed(2) }}
                              />{" "}
                              <LangTra control="cart.tk" />
                            </span>
                          )}
                        </div>
                      </h4>
                    </div>
                    <div>
                      <button
                        className=" bg-red-500 text-white p-1 aspect-square rounded-md left-2 relative"
                        onClick={(e) => {
                          e?.preventDefault();
                          e?.stopPropagation();
                          setDeleteModal(tada?.url_slug);
                        }}
                      >
                        <DynamicHeroIcon
                          s_icon="TrashIcon"
                          className="size-5"
                        />
                      </button>
                    </div>
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <div className="w-full text-center text-3xl text-red-500">
              <LangTra control="cart.empty_cart" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
