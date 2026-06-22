import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation primitives. Use these instead of `next/navigation`
// so links and redirects respect the active locale and prefix strategy.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
