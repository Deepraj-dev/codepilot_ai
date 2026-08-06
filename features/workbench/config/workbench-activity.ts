import type { ActivityRailItem } from "../model/activity-rail.types";

export const workbenchActivityItems = [
  {
    id: "explorer",
    label: "Explorer",
    icon: "◇",
    shortcut: "⇧⌘E",
    controls: "explorer-panel-content",
  },
  {
    id: "search",
    label: "Search",
    icon: "⌕",
    shortcut: "⇧⌘F",
  },
  {
    id: "source-control",
    label: "Source control",
    icon: "⑂",
    badge: 3,
    shortcut: "⌃⇧G",
  },
  {
    id: "run",
    label: "Run and debug",
    icon: "▷",
    shortcut: "⇧⌘D",
  },
  {
    id: "extensions",
    label: "Extensions",
    icon: "▦",
    shortcut: "⇧⌘X",
  },
  {
    id: "agent",
    label: "CodePilot agent",
    icon: "✦",
    shortcut: "⌘L",
    controls: "assistant-panel-content",
  },
] as const satisfies readonly ActivityRailItem[];

export const workbenchUtilityItems = [
  {
    id: "accounts",
    label: "Accounts",
    icon: "◎",
    kind: "action",
  },
  {
    id: "settings",
    label: "Manage settings",
    icon: "⚙",
    kind: "action",
    shortcut: "⌘,",
  },
] as const satisfies readonly ActivityRailItem[];
