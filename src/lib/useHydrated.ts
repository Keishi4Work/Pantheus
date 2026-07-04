"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// true only after hydration. SSR and the hydration render both see false, so
// branching on it can never cause a server/client markup mismatch — needed
// because prefers-reduced-motion is unknowable on the server.
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
