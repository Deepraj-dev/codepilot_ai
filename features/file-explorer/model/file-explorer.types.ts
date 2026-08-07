export type FileTreeNodeKind = "file" | "directory";

export type FileGitStatus =
  | "modified"
  | "added"
  | "untracked"
  | "deleted"
  | "renamed"
  | "ignored";

export type FileTreeNode = {
  id: string;
  name: string;
  path: string;
  kind: FileTreeNodeKind;
  children?: readonly FileTreeNode[];
  gitStatus?: FileGitStatus;
  readonly?: boolean;
};

export type VisibleFileTreeNode = {
  node: FileTreeNode;
  depth: number;
  parentId?: string;
};

export type FileExplorerAction = "new-file" | "new-directory" | "refresh" | "collapse-all";

export type FileExplorerProps = {
  projectName: string;
  nodes: readonly FileTreeNode[];
  defaultExpandedIds?: readonly string[];
  defaultSelectedId?: string;
  onSelectionChange?: (node: FileTreeNode) => void;
  onFileOpen?: (node: FileTreeNode) => void;
  onCreate?: (node: FileTreeNode, parentId?: string) => void | Promise<void>;
  onRename?: (node: FileTreeNode, nextName: string) => void | Promise<void>;
  onAction?: (action: FileExplorerAction) => void;
  ariaLabel?: string;
  className?: string;
};
