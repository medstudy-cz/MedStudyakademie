import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Fallback when opening `/` (proxy also redirects to default locale). */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
