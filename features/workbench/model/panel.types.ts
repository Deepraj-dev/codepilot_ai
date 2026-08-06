import type { ReactNode } from "react";

export type PanelCollapseDirection = "start" | "end" | "bottom";

export type WorkspacePanelProps = {
  id: string;
  title: string;
  children: ReactNode;
  eyebrow?: string;
  actions?: ReactNode;
  resizeHandle?: ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  collapseDirection?: PanelCollapseDirection;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
  contentClassName?: string;
};

export type PanelResizeHandleProps = {
  value: number;
  min: number;
  max: number;
  onResize: (value: number) => void;
  orientation: "horizontal" | "vertical";
  edge: "top" | "right" | "bottom" | "left";
  label: string;
  step?: number;
  inverted?: boolean;
};
