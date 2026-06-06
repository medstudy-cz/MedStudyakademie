import createMiddleware from "next-intl/middleware";

import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";



const LEAD_API_PATHS = ["/lead", "/leadForm"] as const;

const intlMiddleware = createMiddleware(routing);



export default function proxy(request: NextRequest) {

  const { pathname } = request.nextUrl;



  if (LEAD_API_PATHS.includes(pathname as (typeof LEAD_API_PATHS)[number])) {

    return NextResponse.next();

  }



  return intlMiddleware(request);

}



export const config = {

  matcher: ["/((?!api|lead|leadForm|_next|_vercel|.*\\..*).*)"],

};

