import type { ActivityRailItem } from "./activity-rail.types";
import type { WorkbenchPanelId } from "./workbench.types";

export type WorkbenchLayoutState = {
  activeActivityId: string;
  sidebarCollapsed: boolean;
  assistantCollapsed: boolean;
  bottomPanelCollapsed: boolean;
  sidebarSize: number;
  assistantSize: number;
  bottomPanelSize: number;
};

export type PersistedWorkbenchLayout = WorkbenchLayoutState;

export type WorkbenchStore = WorkbenchLayoutState & {
  hasHydrated: boolean;
  activateActivity: (item: ActivityRailItem) => void;
  setPanelCollapsed: (panel: WorkbenchPanelId, collapsed: boolean) => void;
  togglePanel: (panel: WorkbenchPanelId) => void;
  setPanelSize: (panel: WorkbenchPanelId, size: number) => void;
  resetLayout: () => void;
  markHydrated: () => void;
};

export type PanelSizeLimits = Record<WorkbenchPanelId, { min: number; max: number }>;
