import { env } from "../../../environments/environment";
import { url_list as admin_url_list } from "../admin/_resources/api-collection";
import { url_list as public_url_list } from "../_resources/api-collections";
import { form_maker, params_maker } from "./modifier";
import { getCookie } from "../actions";

export async function show({
  api_key,
  addon,
  parameters,
  show_msg,
  is_base,
}: {
  api_key: string;
  addon?: string;
  parameters?: { [key: string]: any } | string | null;
  show_msg?: boolean;
  is_base?: boolean;
}): Promise<any> {
  let token = await getCookie("edutube-auth-token");

  return fetch(
    `${env?.base_url}${is_base ? "" : "/api"}/${{ ...admin_url_list, ...public_url_list }?.[api_key]
    }${addon ? `/${addon}` : ""}${parameters
      ? typeof parameters === "string"
        ? "?" + parameters
        : params_maker(parameters ?? {})
      : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method: "GET",
    }
  )
    ?.then(async (response: Response) => {
      let result = await response?.json();
      if (result?.code === 401) {
        throw JSON.stringify(result);
      }
      return result;
    })
    ?.catch((error: any) => {
      throw error;
    });
}

export const post = async ({
  api_key,
  body,
  addon,
  is_form,
  parameters,
}: {
  api_key: string;
  body: any;
  addon: string;
  is_form?: boolean;
  parameters?: { [key: string]: any };
}): Promise<any> => {
  let token = await getCookie("edutube-auth-token");
  return fetch(
    `${env?.base_url}/api/${{ ...admin_url_list, ...public_url_list }?.[api_key]
    }${addon ? `/${addon}` : ""}${params_maker(parameters ?? {})}`,
    {
      headers: {
        ...(is_form ? {} : { "Content-Type": "application/json" }),
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method: "POST",
      body: is_form ? form_maker(body) : JSON.stringify(body),
    }
  )
    ?.then((response: Response) => {
      return response?.json();
    })
    ?.catch((error: any) => {
      throw error;
    });
};

export const update = async ({
  api_key,
  body,
  addon,
  is_form,
  parameters,
}: {
  api_key: string;
  body: any;
  addon: string;
  is_form?: boolean;
  parameters?: { [key: string]: any };
}): Promise<any> => {
  let token = await getCookie("edutube-auth-token");
  return fetch(
    `${env?.base_url}/api/${{ ...admin_url_list, ...public_url_list }?.[api_key]
    }${addon ? `/${addon}` : ""}${params_maker(parameters ?? {})}`,
    {
      headers: {
        ...(is_form ? {} : { "Content-Type": "application/json" }),
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method: "PUT",
      body: is_form ? form_maker(body) : JSON.stringify(body),
    }
  )
    ?.then((response: Response) => {
      return response?.json();
    })
    ?.catch((error: any) => {
      throw error;
    });
};

export const patch = async ({
  api_key,
  body,
  addon,
  is_form,
  parameters,
}: {
  api_key: string;
  body: any;
  addon: string;
  is_form?: boolean;
  parameters?: { [key: string]: any };
}): Promise<Response> => {
  let token = await getCookie("edutube-auth-token");
  return fetch(
    `${env?.base_url}/api/${{ ...admin_url_list, ...public_url_list }?.[api_key]
    }${addon ? `/${addon}` : ""}${params_maker(parameters ?? {})}`,
    {
      headers: {
        ...(is_form ? {} : { "Content-Type": "application/json" }),
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method: "PATCH",
      body: is_form ? form_maker(body) : JSON.stringify(body),
    }
  )
    ?.then((response: Response) => {
      return response?.json();
    })
    ?.catch((error: any) => {
      throw error;
    });
};

export const kill = async ({
  api_key,
  addon,
  parameters,
}: {
  api_key: string;
  addon: string;
  parameters?: { [key: string]: any };
}) => {
  let token = await getCookie("edutube-auth-token");
  return fetch(
    `${env?.base_url}/api/${{ ...admin_url_list, ...public_url_list }?.[api_key]
    }${addon ? `/${addon}` : ""}${params_maker(parameters ?? {})}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method: "DELETE",
    }
  )
    ?.then((response: Response) => {
      return response?.json();
    })
    ?.catch((error: any) => {
      throw error;
    });
};
