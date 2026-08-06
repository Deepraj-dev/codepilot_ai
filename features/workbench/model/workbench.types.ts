import type { CSSProperties, ReactNode } from "react";

export type WorkbenchShellLabels = {
  activityRail?: string;
  sidebar?: string;
  editor?: string;
  assistant?: string;
  bottomPanel?: string;
  statusbar?: string;
};

export type WorkbenchShellProps = {
  titlebar: ReactNode;
  activityRail: ReactNode;
  editor: ReactNode;
  statusbar: ReactNode;
  sidebar?: ReactNode;
  assistant?: ReactNode;
  bottomPanel?: ReactNode;
  labels?: WorkbenchShellLabels;
  className?: string;
  style?: CSSProperties;
};
