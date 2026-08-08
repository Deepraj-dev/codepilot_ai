import { create } from "zustand";
import type { EditorDocumentTab } from "../model/editor.types";

type EditorStore = {
  tabs: EditorDocumentTab[];
  activeTabId?: string;
  openDocument: (document: EditorDocumentTab) => void;
  selectTab: (tabId: string) => void;
  closeTab: (tabId: string) => void;
  renameDocument: (documentId: string, nextName: string) => void;
  setDocumentDirty: (documentId: string, dirty: boolean) => void;
};

const initialTabs: EditorDocumentTab[] = [
  {
    id: "features/workbench/components/workbench-shell.tsx",
    name: "workbench-shell.tsx",
    path: "features/workbench/components/workbench-shell.tsx",
  },
  {
    id: "features/workbench/components/workspace-panel.tsx",
    name: "workspace-panel.tsx",
    path: "features/workbench/components/workspace-panel.tsx",
  },
];

export const useEditorStore = create<EditorStore>((set) => ({
  tabs: initialTabs,
  activeTabId: initialTabs[0].id,

  openDocument: (document) => set((state) => ({
    tabs: state.tabs.some((tab) => tab.id === document.id)
      ? state.tabs
      : [...state.tabs, document],
    activeTabId: document.id,
  })),

  selectTab: (tabId) => set((state) => (
    state.tabs.some((tab) => tab.id === tabId) ? { activeTabId: tabId } : state
  )),

  closeTab: (tabId) => set((state) => {
    const closingIndex = state.tabs.findIndex((tab) => tab.id === tabId);
    if (closingIndex < 0) return state;

    const tabs = state.tabs.filter((tab) => tab.id !== tabId);
    if (state.activeTabId !== tabId) return { tabs };

    const nextActiveTab = tabs[Math.min(closingIndex, tabs.length - 1)];
    return { tabs, activeTabId: nextActiveTab?.id };
  }),

  renameDocument: (documentId, nextName) => set((state) => ({
    tabs: state.tabs.map((tab) => {
      if (tab.id !== documentId) return tab;
      const parentPath = tab.path.includes("/") ? tab.path.slice(0, tab.path.lastIndexOf("/")) : "";
      return { ...tab, name: nextName, path: parentPath ? `${parentPath}/${nextName}` : nextName };
    }),
  })),

  setDocumentDirty: (documentId, dirty) => set((state) => ({
    tabs: state.tabs.map((tab) => tab.id === documentId ? { ...tab, dirty } : tab),
  })),
}));
