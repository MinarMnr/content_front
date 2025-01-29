"use client";

export function getClientCookie(name: string): any {
  let rex: RegExp = new RegExp(`(?<=${name}\=)(.*?)(?=$|;)`);
  let output = document.cookie?.match(rex)?.[0];
  if (output) {
    return JSON.parse(
      decodeURIComponent(document.cookie.match(rex)?.[0] ?? "")
    );
  }
  return null;
}

export function removeClientCookie(): any {
  document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
    location.hostname
      .split(/\.(?=[^\.]+\.)/)
      .reduceRight(
        (acc: any, val: any, i: number, arr: any) =>
          i ? (arr[i] = "." + val + acc) : ((arr[i] = ""), arr),
        ""
      )
      .map(
        (domain: any) =>
          (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`)
      )
  );
  window.location.href = '/';
  return null;
}
