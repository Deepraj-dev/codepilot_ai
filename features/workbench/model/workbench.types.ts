import type { CSSProperties, ReactNode } from "react";

export type WorkbenchPanelId = "sidebar" | "assistant" | "bottomPanel";

export type WorkbenchShellLabels = {
  activityRail?: string;
  sidebar?: string;
  editor?: string;
  assistant?: string;
  bottomPanel?: string;
  statusbar?: string;
};

export type WorkbenchShellStyle = CSSProperties & {
  "--workbench-sidebar-size"?: string;
  "--workbench-assistant-size"?: string;
  "--workbench-bottom-panel-size"?: string;
};

export type WorkbenchShellProps = {
  titlebar: ReactNode;
  activityRail: ReactNode;
  editor: ReactNode;
  statusbar: ReactNode;
  sidebar?: ReactNode;
  assistant?: ReactNode;
  bottomPanel?: ReactNode;
  sidebarCollapsed?: boolean;
  assistantCollapsed?: boolean;
  bottomPanelCollapsed?: boolean;
  labels?: WorkbenchShellLabels;
  className?: string;
  style?: WorkbenchShellStyle;
};
