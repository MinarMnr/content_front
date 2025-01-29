"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, data: any): Promise<any> {
  return new Promise(async (resolve) => {
    (await cookies())?.set(
      key,
      typeof data === "string" ? data : JSON.stringify(data)
    );
    resolve(data);
  });
}

export async function getCookie(key: string) {
  return new Promise(async (resolve) => {
    let result = (await cookies())?.get(key)?.value;
    resolve(result);
  });
}

export async function removeCookie(key: string) {
  return new Promise(async (resolve) => {
    (await cookies())?.delete(key);
    resolve(key);
  });
}
