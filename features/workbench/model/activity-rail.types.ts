import type { ReactNode } from "react";

export type ActivityRailItem = {
  id: string;
  label: string;
  icon: ReactNode;
  kind?: "view" | "action";
  badge?: number | string;
  shortcut?: string;
  controls?: string;
  disabled?: boolean;
};

export type ActivityRailProps = {
  items: readonly ActivityRailItem[];
  utilityItems?: readonly ActivityRailItem[];
  activeItemId?: string;
  onItemSelect?: (item: ActivityRailItem) => void;
  label?: string;
  className?: string;
};
