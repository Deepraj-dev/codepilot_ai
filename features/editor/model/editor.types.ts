export type EditorDocumentTab = {
  id: string;
  name: string;
  path: string;
  dirty?: boolean;
  readonly?: boolean;
};

export type EditorTabsProps = {
  tabs: readonly EditorDocumentTab[];
  activeTabId?: string;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  ariaLabel?: string;
  className?: string;
};
