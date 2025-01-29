import { LOGIN_CALLBACK } from "@/app/(authentication)/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const is_exist = searchParams.get("is_exist");
  const payload = searchParams.get("payload");
  const redirect1: any = searchParams.get("next");

  // Parsing the URL
  const params = new URL(request.url).searchParams;

  // Base response object
  const result: any = {
    code: params.get("code"),
    state: params.get("state"),
    registration: params.get("registration"),
    is_exist: params.get("is_exist"),
    payload: {},
  };

  console.log(searchParams, "--------callback+++++++++++++++", redirect1);

  // Dynamically extract payload attributes
  params.forEach((value, key) => {
    if (key.startsWith("payload[")) {
      const payloadKey = key.slice(8, -1); // Extract the key inside the brackets
      result.payload[payloadKey] = value;
    }
  });

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing code or state" },
      { status: 400 }
    );
  }

  if (result?.is_exist) {
    const serializedResult = encodeURIComponent(btoa(JSON.stringify(result)));
    return NextResponse.redirect(
      new URL(`/register?res=${serializedResult}`, request.url)
    );
  } else {
    try {
      const tokenData = await LOGIN_CALLBACK({
        code,
        state,
      });

      console.log(tokenData, "--------callback2+++++++++++++++", redirect1);
      //return;

      if (tokenData.code === 200 && tokenData.status === "success") {
        return NextResponse.redirect(new URL(redirect1, request.url));
      } else {
        return NextResponse.json(
          { error: "Failed to retrieve token" },
          { status: 500 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: error || "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
