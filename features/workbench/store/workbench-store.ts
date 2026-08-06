"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ActivityRailItem } from "../model/activity-rail.types";
import type {
  PanelSizeLimits,
  PersistedWorkbenchLayout,
  WorkbenchLayoutState,
  WorkbenchStore,
} from "../model/workbench-state.types";
import type { WorkbenchPanelId } from "../model/workbench.types";

export const WORKBENCH_PANEL_LIMITS = {
  sidebar: { min: 176, max: 416 },
  assistant: { min: 280, max: 672 },
  bottomPanel: { min: 96, max: 480 },
} as const satisfies PanelSizeLimits;

export const DEFAULT_WORKBENCH_LAYOUT = {
  activeActivityId: "explorer",
  sidebarCollapsed: false,
  assistantCollapsed: false,
  bottomPanelCollapsed: false,
  sidebarSize: 224,
  assistantSize: 330,
  bottomPanelSize: 174,
} as const satisfies WorkbenchLayoutState;

function clampPanelSize(panel: WorkbenchPanelId, size: number) {
  const { min, max } = WORKBENCH_PANEL_LIMITS[panel];
  return Math.min(Math.max(size, min), max);
}

function persistedLayout(state: WorkbenchStore): PersistedWorkbenchLayout {
  return {
    activeActivityId: state.activeActivityId,
    sidebarCollapsed: state.sidebarCollapsed,
    assistantCollapsed: state.assistantCollapsed,
    bottomPanelCollapsed: state.bottomPanelCollapsed,
    sidebarSize: state.sidebarSize,
    assistantSize: state.assistantSize,
    bottomPanelSize: state.bottomPanelSize,
  };
}

function mergePersistedLayout(persisted: unknown, current: WorkbenchStore): WorkbenchStore {
  const stored = (persisted ?? {}) as Partial<PersistedWorkbenchLayout>;

  return {
    ...current,
    ...stored,
    sidebarSize: clampPanelSize("sidebar", stored.sidebarSize ?? current.sidebarSize),
    assistantSize: clampPanelSize("assistant", stored.assistantSize ?? current.assistantSize),
    bottomPanelSize: clampPanelSize("bottomPanel", stored.bottomPanelSize ?? current.bottomPanelSize),
  };
}

export const useWorkbenchStore = create<WorkbenchStore>()(
  persist(
    (set) => ({
      ...DEFAULT_WORKBENCH_LAYOUT,
      hasHydrated: false,

      activateActivity: (item: ActivityRailItem) => {
        if (item.kind === "action" || item.disabled) return;

        set((state) => ({
          activeActivityId: item.id,
          ...(item.revealsPanel
            ? panelCollapsedUpdate(item.revealsPanel, false, state)
            : null),
        }));
      },

      setPanelCollapsed: (panel, collapsed) => {
        set((state) => panelCollapsedUpdate(panel, collapsed, state));
      },

      togglePanel: (panel) => {
        set((state) => panelCollapsedUpdate(panel, !panelCollapsedValue(panel, state), state));
      },

      setPanelSize: (panel, size) => {
        const nextSize = clampPanelSize(panel, size);
        if (panel === "sidebar") set({ sidebarSize: nextSize });
        if (panel === "assistant") set({ assistantSize: nextSize });
        if (panel === "bottomPanel") set({ bottomPanelSize: nextSize });
      },

      resetLayout: () => set(DEFAULT_WORKBENCH_LAYOUT),
      markHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "codepilot:workbench-layout",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: persistedLayout,
      merge: mergePersistedLayout,
      skipHydration: true,
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);

function panelCollapsedValue(panel: WorkbenchPanelId, state: WorkbenchLayoutState) {
  if (panel === "sidebar") return state.sidebarCollapsed;
  if (panel === "assistant") return state.assistantCollapsed;
  return state.bottomPanelCollapsed;
}

function panelCollapsedUpdate(
  panel: WorkbenchPanelId,
  collapsed: boolean,
  state: WorkbenchLayoutState,
): Partial<WorkbenchLayoutState> {
  if (panel === "sidebar" && state.sidebarCollapsed !== collapsed) return { sidebarCollapsed: collapsed };
  if (panel === "assistant" && state.assistantCollapsed !== collapsed) return { assistantCollapsed: collapsed };
  if (panel === "bottomPanel" && state.bottomPanelCollapsed !== collapsed) return { bottomPanelCollapsed: collapsed };
  return {};
}
