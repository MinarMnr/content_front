"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function revalidated(path: string) {
  revalidatePath(path);
}

export async function setCookie(key: string, data: any): Promise<any> {
  return new Promise(async (resolve) => {
    (await cookies())?.set(key, JSON.stringify(data));
    resolve(data);
  }).then((value: any) => value);
}

export async function getCookie(key: string) {
  return new Promise(async (resolve) => {
    let result = (await cookies())?.get(key)?.value;
    resolve(result);
  }).then((value: any) => {
    return /^\"(.*?)\"$/.test(value) ? value?.slice(1, -1) : value;
  });
}

export async function removeCookie(key: string) {
  return new Promise(async (resolve) => {
    (await cookies())?.delete(key);
    resolve(key);
  }).then((value: any) => value);
}
