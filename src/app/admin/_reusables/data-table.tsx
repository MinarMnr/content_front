import React from "react";
import { headers } from "next/headers";
import { TableStruct } from "@/app/lib/data-table";
import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import Link from "next/link";
import { show } from "@/app/_services/api-call";
import Pagination from "./pagination";
import DeleteModal from "./delete-modal";

const dataPipe = (data: any, keygen: string) => {
  switch (keygen) {
    case "*":
      return data;
    default:
      return keygen?.split(/\.|\[|\]/g)?.reduce((pV: any, cV: string) => {
        return pV === "---"
          ? pV
          : pV?.[cV] !== undefined && pV?.[cV] !== null
          ? pV?.[cV]
          : "---";
      }, data);
  }
};

const funcPipe = (data: any, fungen: Function) => {
  let temp_val: any = fungen(data);
  return temp_val !== undefined && temp_val !== null ? temp_val : "---";
};

const CustomHeader = ({
  singleHead,
  headSort,
}: {
  singleHead: TableStruct;
  headSort?: "asc" | "desc";
}) => {
  return (
    <th
      className={`p-2 text-md text-start border border-dotted border-collapse whitespace-nowrap ${singleHead?.classList?.head}`}
    >
      <span>{singleHead?.view}</span>
      {singleHead?.sort ? (
        <button>
          {headSort === "desc" ? (
            <DynamicHeroIcon className={"size-6"} s_icon={"ArrowLongUpIcon"} />
          ) : (
            <DynamicHeroIcon
              className={"size-6"}
              s_icon={"ArrowLongDownIcon"}
            />
          )}
        </button>
      ) : null}
    </th>
  );
};

const CustomData = ({
  row_index,
  col_index,
  struct,
  data,
  param,
}: {
  row_index: number;
  col_index: number;
  struct: TableStruct;
  data: any;
  param: any;
}) => {
  let outputData: any;
  switch (typeof struct?.control) {
    case "string":
      switch (struct?.control) {
        case "sl":
          outputData =
            row_index + 1 + (Number(param?.page) - 1) * Number(param?.size);
          break;
        default:
          outputData = dataPipe(data, struct?.control);
          break;
      }
      break;
    case "function":
      outputData = funcPipe(data, struct?.control);
      break;
    default:
      switch (Array.isArray(struct?.control)) {
        case true:
          outputData = (
            <div className="whitespace-nowrap">
              {struct?.control?.map(async (tada: any, index: number) => {
                if (tada?.path) {
                  return (
                    <Link
                      key={index}
                      href={tada?.path(data)}
                      title={tada?.tooltip}
                    >
                      <button
                        key={index}
                        className={`p-2 border-2 border-gray-200 rounded-lg m-1 ${tada?.className}`}
                      >
                        <DynamicHeroIcon
                          className={"size-4"}
                          s_icon={tada?.icon}
                        />
                      </button>
                    </Link>
                  );
                } else {
                  return await tada?.action(data);
                }
              })}
            </div>
          );
          break;
        default:
          break;
      }
      break;
  }
  return (
    <td className="border border-dotted border-gray-600 text-md text-gray-600 border-collapse p-1">
      {outputData ? outputData : "---"}
    </td>
  );
};

const DataTable = async ({
  table_structure,
  api_key,
  pagination = true,
  addon,
  children,
}: {
  table_structure: TableStruct[];
  api_key: string;
  pagination?: boolean;
  addon?: string;
  children?: { [key: string]: React.ReactNode };
}) => {
  let str_params: string | null = (await headers()).get("x-current-params");
  let paginations: { page: number; size: number } = {
    page: Number(str_params?.match(/(?<=page\=)\d+/)?.[0]),
    size: Number(str_params?.match(/(?<=size\=)\d+/)?.[0]),
  };
  let delete_modal_id: number = Number(
    (str_params ? str_params : "")?.match(/(?<=delete_modal_id\=)\d+/)?.[0]
  );
  let dataList: any[] = [];
  let total: number = 0;

  await show({ api_key, addon, parameters: str_params })
    .then((resp: any) => {
      dataList = resp?.data;
      total = Number(resp?.meta?.total ?? 0);
    })
    .catch((error: any) => {
      dataList = [];
    });

  return (
    <>
      {delete_modal_id ? (
        <DeleteModal api_endpoint={api_key} data_id={`${delete_modal_id}`} />
      ) : null}
      <table className="w-full table-custom mb-2 border border-gray-100">
        <thead>
          <tr>
            {table_structure?.map((head: TableStruct, index: number) => (
              <CustomHeader key={index} singleHead={head} />
            ))}
          </tr>
        </thead>
        <tbody>
          {dataList?.length ? (
            dataList?.map((data: any, r_i: number) => {
              return (
                <tr key={r_i}>
                  {table_structure?.map((head: TableStruct, c_i: number) => (
                    <CustomData
                      key={`${r_i}-${c_i}`}
                      row_index={r_i}
                      col_index={c_i}
                      struct={head}
                      data={data}
                      param={paginations}
                    />
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan={99}>
                No Data Available
              </td>
            </tr>
          )}
          {children?.["table"] ?? null}
        </tbody>
      </table>
      {children?.["after_table"]}
      {pagination ? <Pagination total={total} /> : null}
    </>
  );
};

export default DataTable;
