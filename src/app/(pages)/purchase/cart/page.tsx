import React from "react";
import Cart from "../../_global-modals/cart";
import { show } from "@/app/_services/api-call";
import Coupon from "./coupon";
import Link from "next/link";
import CartClear from "./cart-clear";
import LangTra from "@/app/_components/lang-tra";

const Page = async () => {
  let cartDetails: any = {};

  let callApi = async () => {
    return show({ api_key: "CART_API" }).then((resp: any) => {
      if (resp?.status === "success") {
        return resp?.data;
      }
      return null;
    });
  };

  cartDetails = await callApi();

  return (
    <>
      <div className="w-full bg-gray-50 border border-gray-100  pt-0">
        <div className="text-3xl font-black text-slate-500 w-full text-center bg-gray-100 p-3 border-b border-dashed">
          <LangTra control="cart.cart" />
        </div>
        <div className="flex justify-start items-start gap-x-4 py-4 p-3">
          <div className="w-3/4 p-2">
            <div className="flex justify-between  pb-2">
              <div className="text-2xl text-green-700">
                {cartDetails?.items?.length ? (
                  <>
                  <LangTra
                    control="value"
                    data={{ value: cartDetails?.items?.length }}
                  />
                  <LangTra control="cart.is_in_cart" />
                  </>
                ) : (
                  <LangTra control="cart.no_cart" />
                )}
              </div>
              <CartClear disabled={!cartDetails?.items?.length} />
            </div>
            <Cart data={cartDetails} />
            <div className="flex justify-center mt-3">
              <Link
                className="px-8 py-3 bg-emerald-700 text-white font-bold rounded-3xl"
                href={"/all-courses"}
              >
                <LangTra control="cart.cont_shop" />
              </Link>
            </div>
          </div>
          {cartDetails?.items?.length ? (
            <div className="w-1/4 border bg-white p-2 sticky top-0 ">
              <div className="text-2xl border-b border-dashed border-slate-300 w-full mb-2 pt-2 pb-2 text-center text-green-800 bg-gray-100">
                <LangTra control="cart.summary" />
              </div>
              <Coupon
                available_coupons={cartDetails?.appliedCoupons}
                disabled={
                  !cartDetails?.items?.find((tada: any) => !!tada?.selected)
                }
              />
              <table className="w-full font-black my-2 text-lg mb-2  border-gray-200">
                <tbody>
                  <tr>
                    <th className="text-slate-500 text-end border-gray-200 font-medium">
                      <LangTra control="cart.total" />:
                    </th>
                    <td className="text-right w-1/2 text-gray-600 border-gray-200">
                      <LangTra
                        control="value"
                        data={{
                          value: cartDetails?.subtotal
                            ? Number(cartDetails?.subtotal)?.toFixed(2)
                            : "0.00",
                        }}
                      />{" "}
                      /=
                    </td>
                  </tr>
                  <tr>
                    <th className="text-slate-500 text-end border-gray-200 font-medium">
                      <LangTra control="cart.discount" />:
                    </th>
                    <td className="text-right w-1/2 text-gray-600 border-gray-200">
                      <LangTra
                        control="value"
                        data={{
                          value: cartDetails?.discount
                            ? Number(cartDetails?.discount)?.toFixed(2)
                            : "0.00",
                        }}
                      />{" "}
                      /=
                    </td>
                  </tr>
                  <tr>
                    <th className="text-slate-500 text-end border-gray-200 font-medium">
                      <LangTra control="cart.final_price" />:
                    </th>
                    <td className="text-right w-1/2 text-gray-600 border-gray-200">
                      <LangTra
                        control="value"
                        data={{
                          value: cartDetails?.total
                            ? Number(cartDetails?.total)?.toFixed(2)
                            : "0.00",
                        }}
                      />{" "}
                      /=
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link
                href={`/purchase/payment`}
                className={`block w-full text-center py-3 mt-4 rounded-full text-white text-xl ${
                  !cartDetails?.items?.find((tada: any) => !!tada?.selected)
                    ? "bg-slate-500 all-disable"
                    : "bg-emerald-500"
                }`}
              >
                <LangTra control="cart.checkout" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Page;
