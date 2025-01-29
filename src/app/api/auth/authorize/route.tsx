import { LOGIN } from "@/app/(authentication)/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const jsonResponse = await LOGIN();

    if (jsonResponse.code === 200 && jsonResponse.status === "success") {
      let newValue =
        request.nextUrl.origin + request.nextUrl.search.replace("?", "");
      let url = new URL(jsonResponse.data);

      if (newValue) {
        let paramName = "next";
        let paramValue = newValue;

        url.searchParams.set(paramName, paramValue);
      }
      return NextResponse.redirect(url);
      //return NextResponse.redirect(jsonResponse.data);
    } else {
      return NextResponse.json(
        { error: "Failed to initiate login" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
