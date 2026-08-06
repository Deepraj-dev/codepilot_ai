"use client";

import { useEffect } from "react";
import { useWorkbenchStore } from "../store/workbench-store";

export function WorkbenchStateHydrator() {
  const hasHydrated = useWorkbenchStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) void useWorkbenchStore.persist.rehydrate();
  }, [hasHydrated]);

  return null;
}
