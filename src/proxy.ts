import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the routing-middleware convention to `proxy.ts`.
// next-intl still ships its handler from `next-intl/middleware`.
export default createMiddleware(routing);

export const config = {
  // Skip `/api`, `/trpc`, Next internals, and any path with a dot (static files).
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
