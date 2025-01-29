import { env } from "../../../environments/environment";
import { getCookie, removeCookie, setCookie } from "../actions";

// export async function REGISTER(formData: any): Promise<any> {
//   return fetch(`${env?.base_url}/api/register`, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Origin: `http://192.168.1.251:5300`,
//       Referer: `http://192.168.1.251:5300/`,
//     },
//     method: "POST",
//     body: JSON.stringify(formData),
//   })
//     .then(async (resp: Response) => await resp?.json())
//     .then(async (value: any) => {
//       await setCookie("edutube-auth-token", value?.data?.token);
//       await setCookie("edutube-auth-user", value?.data?.user);
//       return value;
//     });
// }

// export async function REGISTER_CALLBACK(formData: any): Promise<any> {
//   return fetch(`${env?.base_url}/api/register`, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Origin: `http://192.168.1.251:5300`,
//       Referer: `http://192.168.1.251:5300/`,
//     },
//     method: "POST",
//     body: JSON.stringify(formData),
//   })
//     .then(async (resp: Response) => await resp?.json())
//     .then(async (value: any) => {
//       await setCookie("edutube-auth-token", value?.data?.token);
//       await setCookie("edutube-auth-user", value?.data?.user);
//       return value;
//     });
// }

export async function LOGIN(): Promise<any> {
  let res = await fetch(`${env?.base_url}/api/v2/login`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: `${env?.domain_url}`,
      Referer: `${env?.domain_url}`,
    },
    method: "GET",
  })
    .then(async (resp: Response) => await resp?.json())
    .then(async (value: any) => {

      if (value?.status === "success") {
        await setCookie("edutube-auth-token", value?.data?.access_token);
        await setCookie("edutube-auth-user", value?.data?.user);
        return value;
      } else {
        throw value;
      }
    });
  return res;
}

export async function LOGIN_CALLBACK(formData: any): Promise<any> {
  let res = await fetch(`${env?.base_url}/api/v2/auth/callback`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: `${env?.domain_url}`,
      Referer: `${env?.domain_url}`,
    },
    method: "POST",
    body: JSON.stringify(formData),
  })
    .then(async (resp: Response) => await resp?.json())
    .then(async (value: any) => {

      if (value?.status === "success") {
        await setCookie("edutube-auth-token", value?.data?.access_token);
        await setCookie("edutube-auth-user", value?.data?.user);
        return value;
      } else {
        throw value;
      }
    });
  return res;
}

export async function LOGOUT() {
  let token = await getCookie("edutube-auth-token");
  let res = await fetch(`${env?.base_url}/api/v2/logout`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({}),
  })
    .then(async (resp: Response) => await resp?.json())
    .then(async (value: any) => {
      await removeCookie("edutube-auth-token");
      await removeCookie("edutube-auth-user");
      return value;
    });
  return res;
}

export async function REGISTER(): Promise<any> {
  let res = await fetch(`${env?.base_url}/api/v2/registration`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: `${env?.domain_url}`,
      Referer: `${env?.domain_url}`,
    },
    method: "GET",
  })
    .then(async (resp: Response) => await resp?.json())
    .then(async (value: any) => {

      if (value?.status === "success") {
        await setCookie("edutube-auth-token", value?.data?.access_token);
        await setCookie("edutube-auth-user", value?.data?.user);
        return value;
      } else {
        throw value;
      }
    });
  return res;
}
