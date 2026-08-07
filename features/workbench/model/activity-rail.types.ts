import type { LucideIcon } from "lucide-react";
import type { WorkbenchPanelId } from "./workbench.types";

export type ActivityRailItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  kind?: "view" | "action";
  badge?: number | string;
  shortcut?: string;
  controls?: string;
  revealsPanel?: WorkbenchPanelId;
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
