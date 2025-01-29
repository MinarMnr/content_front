import { REGISTER } from "@/app/(authentication)/action";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const jsonResponse = await REGISTER();

    //return;

    if (jsonResponse.code === 200 && jsonResponse.status === "success") {
      let newValue =
        request.nextUrl.origin + request.nextUrl.search.replace("?", "");
      let url = new URL(jsonResponse.data);

      if (newValue) {
        let paramName = "next";
        let paramValue = newValue;

        url.searchParams.set(paramName, paramValue);
      }

      console.log(newValue, "********************************", url, "sad");
      console.log("frsadasd+++++++++++++++", url);
      return NextResponse.redirect(url);
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
