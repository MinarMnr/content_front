import { env } from "../../../environments/environment";
import { url_list as admin_url_list } from "../admin/_resources/api-collection";
import { url_list as public_url_list } from "../_resources/api-collections";
import { getClientCookie } from "./storage";

export const paramsStringToObj = (params: string | null) => {
  return (params?.startsWith("?") ? params?.slice(1) : params)
    ?.split("&")
    ?.reduce((pV: { [key: string]: any }, cV: string) => {
      let each_split: string[] = cV?.split("=");
      return {
        ...pV,
        [each_split?.[0]]: each_split?.[1],
      };
    }, {});
};
export const form_maker = (
  data: any,
  before_string?: string,
  form_data?: FormData
): any => {
  if (typeof data === "object") {
    return Object.entries(data).reduce(
      (pV: FormData, [key, value]: [string, any]) => {
        let before_str: string = `${before_string ?? ""}${
          before_string ? "[" : ""
        }${key}${before_string ? "]" : ""}`;
        if (
          value !== undefined &&
          value !== "" &&
          ((typeof value).match(/boolean|string|number|bigint|symbol/) ||
            value instanceof File)
        ) {
          pV.append(before_str, value);
        } else if (value && Array.isArray(value)) {
          value.forEach((val: any, index: number) => {
            form_maker(val, `${before_str}[${index}]`, pV);
          });
        } else if (value && typeof value === "object") {
          form_maker(value, before_str, pV);
        }
        return pV;
      },
      form_data ?? new FormData()
    );
  } else if (before_string && form_data) {
    form_data.append(before_string, data);
  }
};

export const params_maker = (param: any, parent?: string): string => {
  return Object.entries(param)?.reduce(
    (pV: string, [key, val]: [string, any]) => {
      return `${pV ? "" : "?"}${pV}${pV && val ? "&" : ""}${
        Array.isArray(val)
          ? val?.reduce((cV, a_v, i) => {
              return `${cV}${cV ? "&" : ""}${parent ?? ""}${key}[${i}]=${a_v}`;
            }, "")
          : typeof val === "object"
          ? params_maker(val, key)
          : `${parent ?? ""}${key}=${val}`
      }`;
    },
    ""
  );
};

export const convertToFile = async (dataURI: string): Promise<Blob> => {
  let type: string = dataURI.match(/:[\S]+;/)?.[0]?.slice(1, -1) ?? "";
  return fetch(dataURI)
    .then((res) => res.blob())
    .then(
      (buf) =>
        new File([buf], `converted file.${type?.split("/")[1]}`, { type })
    );
};

export const convertToFileUrl = async (dataURI: string): Promise<string> => {
  return fetch(dataURI)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob));
};

export const convertToBase64 = async (
  file?: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve: any, reject: any) => {
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    } else {
      reject();
    }
  });
};

export const getFIleUrl = (
  img_path: string,
  is_auth?: boolean,
  api_key?: string,
  token?: boolean,
  referer?: boolean
) => {
  if (img_path) {
    return `${env?.base_url}${
      is_auth
        ? "/storage"
        : api_key
        ? `/api/${{ ...admin_url_list, ...public_url_list }?.[api_key]}`
        : ""
    }/${img_path}`
      ?.replaceAll("%5C", "/")
      ?.replaceAll("+", " ")
      ?.concat(token ? `?_token=${getClientCookie("edutube-auth-token")}` : "")
      ?.concat(referer ? `&_referer=${env.domain_url}` : "");
  } else {
    return "/no-image.jpg";
  }
};

export const formatTime = (actual: number) => {
  let s: number = Math.round(actual % 60);
  let m: number = Math.round((actual - s) % 3600) / 60;
  let h: number = Math.round((actual - s - m * 60) / 3600);
  return `${`${h}`.padStart(2, "0")}:${`${m}`.padStart(
    2,
    "0"
  )}:${`${s}`.padStart(2, "0")}`;
};
