import {
  Blocks,
  BugPlay,
  CircleUserRound,
  Files,
  GitBranch,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import type { ActivityRailItem } from "../model/activity-rail.types";

export const workbenchActivityItems = [
  {
    id: "explorer",
    label: "Explorer",
    icon: Files,
    shortcut: "⇧⌘E",
    controls: "explorer-panel-content",
    revealsPanel: "sidebar",
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    shortcut: "⇧⌘F",
  },
  {
    id: "source-control",
    label: "Source control",
    icon: GitBranch,
    badge: 3,
    shortcut: "⌃⇧G",
  },
  {
    id: "run",
    label: "Run and debug",
    icon: BugPlay,
    shortcut: "⇧⌘D",
  },
  {
    id: "extensions",
    label: "Extensions",
    icon: Blocks,
    shortcut: "⇧⌘X",
  },
  {
    id: "agent",
    label: "CodePilot agent",
    icon: Sparkles,
    shortcut: "⌘L",
    controls: "assistant-panel-content",
    revealsPanel: "assistant",
  },
] as const satisfies readonly ActivityRailItem[];

export const workbenchUtilityItems = [
  {
    id: "accounts",
    label: "Accounts",
    icon: CircleUserRound,
    kind: "action",
  },
  {
    id: "settings",
    label: "Manage settings",
    icon: Settings,
    kind: "action",
    shortcut: "⌘,",
  },
] as const satisfies readonly ActivityRailItem[];
