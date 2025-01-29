import { getFIleUrl } from "@/app/_services/modifier";
import Image from "next/image";
import React from "react";
import "./invoice.scss";
import LangTra from "@/app/_components/lang-tra";

export const InvoiceTable = ({ data }: any) => {
  return data ? (
    <>
      <span>
        <LangTra control="cart.summary" />
      </span>
      <table className="summary table-custom-all summery-table bg-white  border">
        <tbody>
          <tr>
            <th>
              <LangTra control="cart.total" />:
            </th>
            <td>
              <LangTra
                control="value"
                data={{
                  value: data?.subtotal
                    ? Number(data?.subtotal)?.toFixed(2)
                    : "0.00",
                }}
              />{" "}
              <LangTra control="cart.tk" />
            </td>
          </tr>
          <tr>
            <th>
              <LangTra control="cart.discount" />:
            </th>
            <td>
              <LangTra
                control="value"
                data={{
                  value: data?.discount
                    ? Number(data?.discount)?.toFixed(2)
                    : "0.00",
                }}
              />{" "}
              <LangTra control="cart.tk" />
            </td>
          </tr>
          <tr>
            <th>
              <LangTra control="cart.final_price" />:
            </th>
            <td>
              <LangTra
                control="value"
                data={{
                  value: data?.total ? Number(data?.total)?.toFixed(2) : "0.00",
                }}
              />{" "}
              <LangTra control="cart.tk" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  ) : null;
};

export const InvoiceItems = ({ items }: any) => {
  return items && items?.length ? (
    <>
      <span className="text-xl bg-gray-200 p-1 ps-5 pe-5 rounded-full">
        <LangTra control="payment.courses" />
      </span>
      <table className="items table-custom-all table-custom-all-ta mt-2">
        <thead>
          <tr>
            <th>
              <LangTra control="payment.sl" />
            </th>
            <th>
              <LangTra control="payment.thumbnail" />
            </th>
            <th>
              <LangTra control="payment.courses" />
            </th>
            <th>
              <LangTra control="all_courses.category" />
            </th>
            <th>
              <LangTra control="payment.creator" />
            </th>
            <th>
              <LangTra control="payment.price" />
            </th>
            <th>
              <LangTra control="cart.discount" />
            </th>
            <th>
              <LangTra control="cart.final_price" />
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.length
            ? items?.map((tada: any, index: number) => (
                <tr key={index}>
                  <td>
                    <LangTra control="value" data={{ value: index + 1 }} />
                  </td>
                  <td>
                    <Image
                      src={getFIleUrl(tada?.thumbnail?.path, true)}
                      alt=""
                      width={500}
                      height={500}
                      className="max-w-40"
                    />
                  </td>
                  <td>{tada?.title}</td>
                  <td>
                    {tada?.sub_category?.title_en}
                    {tada?.category ? `(${tada?.category?.title_en})` : ""}
                  </td>
                  <td>{tada?.owner?.name}</td>
                  <td>
                    <LangTra
                      control="value"
                      data={{
                        value: tada?.fee
                          ? Number(tada?.fee)?.toFixed(2)
                          : "0.00",
                      }}
                    />{" "}
                    <LangTra control="cart.tk" />
                  </td>
                  <td>
                    <LangTra
                      control="value"
                      data={{
                        value: tada?.discount
                          ? Number(tada?.discount)?.toFixed(2)
                          : "0.00",
                      }}
                    />{" "}
                    <LangTra control="cart.tk" />
                  </td>
                  <td>
                    <LangTra
                      control="value"
                      data={{
                        value: tada?.discounted_fee
                          ? Number(tada?.discounted_fee)?.toFixed(2)
                          : "0.00",
                      }}
                    />{" "}
                    <LangTra control="cart.tk" />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  ) : null;
};

export const CouponItems = ({ items }: any) => {
  return items && items?.length ? (
    <>
      <span>Coupons</span>
      <table className="coupons table-custom-all">
        <thead>
          <tr>
            <th>
              <LangTra control="payment.sl" />
            </th>
            <th>
              <LangTra control="payment.name" />
            </th>
            <th>
              <LangTra control="payment.code" />
            </th>
            <th>
              <LangTra control="cart.discount" />
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((tada: any, index: number) => (
            <tr key={index}>
              <td>
                <LangTra control="value" data={{ value: index + 1 }} />
              </td>
              <td>{tada?.title}</td>
              <td>{tada?.code}</td>
              <td>
                <LangTra
                  control="value"
                  data={{
                    value: tada?.discount
                      ? Number(tada?.discount)?.toFixed(2)
                      : "0.00",
                  }}
                />{" "}
                <LangTra control="cart.tk" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : null;
};

const Invoice = ({ data }: any) => {
  return (
    <div className="invoice">
      <div>
        <InvoiceItems items={data?.items} />
      </div>
      <div>
        <CouponItems items={data?.coupons} />
      </div>
      <div>
        <InvoiceTable data={data} />
      </div>
    </div>
  );
};

export default Invoice;
