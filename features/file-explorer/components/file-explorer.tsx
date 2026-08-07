"use client";

import {
  ChevronDown,
  ChevronRight,
  ChevronsUp,
  FilePlus2,
  Folder,
  FolderOpen,
  FolderPlus,
  History,
  ListTree,
  LockKeyhole,
  RefreshCw,
} from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { collectDirectoryIds, flattenVisibleNodes } from "../lib/file-tree";
import type {
  FileExplorerAction,
  FileExplorerProps,
  FileGitStatus,
  FileTreeNode,
} from "../model/file-explorer.types";
import styles from "./file-explorer.module.css";
import { FileTypeIcon } from "./file-type-icon";

const statusLabel: Record<FileGitStatus, string> = {
  modified: "M",
  added: "A",
  untracked: "U",
  deleted: "D",
  renamed: "R",
  ignored: "I",
};

type CreatedNodeEntry = {
  node: FileTreeNode;
  parentId?: string;
};

function mergeCreatedNodes(
  nodes: readonly FileTreeNode[],
  createdNodes: readonly CreatedNodeEntry[],
  parentId?: string,
): readonly FileTreeNode[] {
  const additions = createdNodes
    .filter((entry) => entry.parentId === parentId)
    .map((entry) => entry.node);

  return [...nodes, ...additions].map((node) => node.kind === "directory"
    ? { ...node, children: mergeCreatedNodes(node.children ?? [], createdNodes, node.id) }
    : node);
}

function findNodeContext(
  nodes: readonly FileTreeNode[],
  id: string | undefined,
  parentId?: string,
): { node: FileTreeNode; parentId?: string } | undefined {
  if (!id) return undefined;

  for (const node of nodes) {
    if (node.id === id) return { node, parentId };
    if (node.kind === "directory") {
      const match = findNodeContext(node.children ?? [], id, node.id);
      if (match) return match;
    }
  }
}

export function FileExplorer({
  projectName,
  nodes,
  defaultExpandedIds = [],
  defaultSelectedId,
  onSelectionChange,
  onFileOpen,
  onCreate,
  onRename,
  onAction,
  ariaLabel = "Project files",
  className,
}: FileExplorerProps) {
  const [expandedIds, setExpandedIds] = useState(() => new Set(defaultExpandedIds));
  const [selectedId, setSelectedId] = useState(defaultSelectedId);
  const [renamingId, setRenamingId] = useState<string>();
  const [creatingId, setCreatingId] = useState<string>();
  const [renameDraft, setRenameDraft] = useState("");
  const [renameError, setRenameError] = useState(false);
  const [nameOverrides, setNameOverrides] = useState<Record<string, string>>({});
  const [createdNodes, setCreatedNodes] = useState<CreatedNodeEntry[]>([]);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const createdIdRef = useRef(0);
  const createdIdPrefix = useId();
  const treeNodes = useMemo(() => mergeCreatedNodes(nodes, createdNodes), [nodes, createdNodes]);
  const visibleNodes = useMemo(
    () => flattenVisibleNodes(treeNodes, expandedIds),
    [treeNodes, expandedIds],
  );
  const explorerClassName = [styles.explorer, className].filter(Boolean).join(" ");

  useEffect(() => () => {
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
  }, []);

  function displayName(node: FileTreeNode) {
    return nameOverrides[node.id] ?? node.name;
  }

  function displayedNode(node: FileTreeNode): FileTreeNode {
    const name = displayName(node);
    return name === node.name ? node : { ...node, name };
  }

  function selectNode(node: FileTreeNode) {
    setSelectedId(node.id);
    onSelectionChange?.(displayedNode(node));
  }

  function toggleDirectory(node: FileTreeNode) {
    if (node.kind !== "directory") return;

    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(node.id)) next.delete(node.id);
      else next.add(node.id);
      return next;
    });
  }

  function openNode(node: FileTreeNode) {
    if (node.kind === "directory") toggleDirectory(node);
    else onFileOpen?.(displayedNode(node));
  }

  function cancelPendingOpen() {
    if (!clickTimerRef.current) return;
    clearTimeout(clickTimerRef.current);
    clickTimerRef.current = null;
  }

  function handleRowClick(node: FileTreeNode) {
    selectNode(node);
    cancelPendingOpen();
    clickTimerRef.current = setTimeout(() => {
      openNode(node);
      clickTimerRef.current = null;
    }, 220);
  }

  function startRename(node: FileTreeNode, isCreating = false) {
    if (node.readonly) return;
    cancelPendingOpen();
    selectNode(node);
    setRenameDraft(displayName(node));
    setRenameError(false);
    setRenamingId(node.id);
    setCreatingId(isCreating ? node.id : undefined);
  }

  function cancelRename() {
    if (creatingId) {
      setCreatedNodes((current) => current.filter(({ node }) => node.id !== creatingId));
      setSelectedId(undefined);
    }
    setRenamingId(undefined);
    setCreatingId(undefined);
    setRenameDraft("");
    setRenameError(false);
  }

  function siblingNameExists(node: FileTreeNode, nextName: string) {
    const context = findNodeContext(treeNodes, node.id);
    const parent = context?.parentId
      ? findNodeContext(treeNodes, context.parentId)?.node
      : undefined;
    const siblings = parent?.kind === "directory" ? parent.children ?? [] : treeNodes;

    return siblings.some((sibling) => (
      sibling.id !== node.id
      && displayName(sibling).localeCompare(nextName, undefined, { sensitivity: "accent" }) === 0
    ));
  }

  function commitRename(node: FileTreeNode) {
    const nextName = renameDraft.trim();
    const previousName = displayName(node);
    const isCreating = creatingId === node.id;

    if (!nextName || /[\\/\0]/.test(nextName) || siblingNameExists(node, nextName)) {
      setRenameError(true);
      return;
    }

    setRenamingId(undefined);
    setCreatingId(undefined);
    setRenameDraft("");
    setRenameError(false);
    if (!isCreating && nextName === previousName) return;

    setNameOverrides((current) => ({ ...current, [node.id]: nextName }));
    const context = findNodeContext(treeNodes, node.id);
    const parent = context?.parentId
      ? findNodeContext(treeNodes, context.parentId)?.node
      : undefined;
    const nextNode = {
      ...node,
      name: nextName,
      path: parent ? `${parent.path}/${nextName}` : nextName,
    };
    const operation = isCreating
      ? onCreate?.(nextNode, context?.parentId)
      : onRename?.(displayedNode(node), nextName);

    void Promise.resolve(operation).catch(() => {
      setNameOverrides((current) => ({ ...current, [node.id]: previousName }));
      if (isCreating) {
        setCreatedNodes((current) => current.filter((entry) => entry.node.id !== node.id));
      }
    });
  }

  function beginCreate(kind: FileTreeNode["kind"]) {
    cancelPendingOpen();
    const selected = findNodeContext(treeNodes, selectedId);
    const parentId = selected?.node.kind === "directory" ? selected.node.id : selected?.parentId;
    const parent = parentId ? findNodeContext(treeNodes, parentId)?.node : undefined;
    const baseName = kind === "directory" ? "new-folder" : "untitled.ts";
    const siblings = parent?.kind === "directory" ? parent.children ?? [] : treeNodes;
    const siblingNames = new Set(siblings.map((node) => displayName(node).toLocaleLowerCase()));
    let name = baseName;
    let suffix = 2;

    while (siblingNames.has(name.toLocaleLowerCase())) {
      const extensionIndex = kind === "file" ? baseName.lastIndexOf(".") : -1;
      name = extensionIndex > 0
        ? `${baseName.slice(0, extensionIndex)}-${suffix}${baseName.slice(extensionIndex)}`
        : `${baseName}-${suffix}`;
      suffix += 1;
    }

    createdIdRef.current += 1;
    const node: FileTreeNode = {
      id: `created-${createdIdPrefix}-${createdIdRef.current}`,
      name,
      path: parent ? `${parent.path}/${name}` : name,
      kind,
      ...(kind === "directory" ? { children: [] } : {}),
      gitStatus: "untracked",
    };

    setCreatedNodes((current) => [...current, { node, parentId }]);
    if (parentId) setExpandedIds((current) => new Set(current).add(parentId));
    startRename(node, true);
    onAction?.(kind === "directory" ? "new-directory" : "new-file");
  }

  function handleRowDoubleClick(event: MouseEvent<HTMLDivElement>, node: FileTreeNode) {
    event.preventDefault();
    cancelPendingOpen();
    startRename(node);
  }

  function runAction(action: FileExplorerAction) {
    if (action === "collapse-all") setExpandedIds(new Set());
    if (action === "refresh") setExpandedIds((current) => new Set(current));
    onAction?.(action);
  }

  function handleTreeFocus(event: FocusEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || selectedId || visibleNodes.length === 0) return;
    selectNode(visibleNodes[0].node);
  }

  function handleTreeKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (visibleNodes.length === 0) return;

    const currentIndex = Math.max(0, visibleNodes.findIndex(({ node }) => node.id === selectedId));
    const current = visibleNodes[currentIndex];
    let nextNode: FileTreeNode | undefined;

    if (event.key === "ArrowDown") nextNode = visibleNodes[Math.min(currentIndex + 1, visibleNodes.length - 1)].node;
    if (event.key === "ArrowUp") nextNode = visibleNodes[Math.max(currentIndex - 1, 0)].node;
    if (event.key === "Home") nextNode = visibleNodes[0].node;
    if (event.key === "End") nextNode = visibleNodes.at(-1)?.node;

    if (event.key === "ArrowRight" && current.node.kind === "directory") {
      if (!expandedIds.has(current.node.id)) toggleDirectory(current.node);
      else nextNode = visibleNodes[currentIndex + 1]?.node;
    }

    if (event.key === "ArrowLeft") {
      if (current.node.kind === "directory" && expandedIds.has(current.node.id)) {
        toggleDirectory(current.node);
      } else if (current.parentId) {
        nextNode = visibleNodes.find(({ node }) => node.id === current.parentId)?.node;
      }
    }

    if (event.key === "Enter") openNode(current.node);
    if (event.key === "F2") startRename(current.node);
    if (event.key === " ") {
      event.preventDefault();
      selectNode(current.node);
    }

    if (!nextNode) {
      if (["ArrowLeft", "ArrowRight", "Enter", "F2"].includes(event.key)) event.preventDefault();
      return;
    }

    event.preventDefault();
    selectNode(nextNode);
  }

  function handleChevronClick(event: MouseEvent<HTMLButtonElement>, node: FileTreeNode) {
    event.stopPropagation();
    cancelPendingOpen();
    selectNode(node);
    toggleDirectory(node);
  }

  const allDirectoryIds = useMemo(() => collectDirectoryIds(treeNodes), [treeNodes]);
  const allCollapsed = [...allDirectoryIds].every((id) => !expandedIds.has(id));

  return (
    <div className={explorerClassName}>
      <div className={styles.projectHeader}>
        <button
          type="button"
          className={styles.projectToggle}
          aria-label={allCollapsed ? `Expand ${projectName}` : `Collapse ${projectName}`}
          onClick={() => {
            setExpandedIds(allCollapsed ? new Set(allDirectoryIds) : new Set());
          }}
        >
          {allCollapsed
            ? <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
            : <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />}
          <strong>{projectName}</strong>
        </button>

        <div className={styles.projectActions}>
          <button type="button" aria-label="New file" onClick={() => beginCreate("file")}><FilePlus2 size={14} /></button>
          <button type="button" aria-label="New directory" onClick={() => beginCreate("directory")}><FolderPlus size={14} /></button>
          <button type="button" aria-label="Refresh explorer" onClick={() => runAction("refresh")}><RefreshCw size={14} /></button>
          <button type="button" aria-label="Collapse all directories" disabled={allCollapsed} onClick={() => runAction("collapse-all")}><ChevronsUp size={14} /></button>
        </div>
      </div>

      <div
        className={styles.tree}
        role="tree"
        aria-label={ariaLabel}
        aria-activedescendant={selectedId ? `file-tree-node-${selectedId}` : undefined}
        tabIndex={0}
        onFocus={handleTreeFocus}
        onKeyDown={handleTreeKeyDown}
      >
        {visibleNodes.length === 0 ? (
          <div className={styles.emptyState}>This project has no files.</div>
        ) : visibleNodes.map(({ node, depth }) => {
          const isDirectory = node.kind === "directory";
          const isExpanded = isDirectory && expandedIds.has(node.id);
          const nodeName = displayName(node);
          const DirectoryIcon = isExpanded ? FolderOpen : Folder;

          return (
            <div
              id={`file-tree-node-${node.id}`}
              className={styles.row}
              role="treeitem"
              aria-level={depth + 1}
              aria-expanded={isDirectory ? isExpanded : undefined}
              aria-selected={selectedId === node.id}
              data-selected={selectedId === node.id}
              data-renaming={renamingId === node.id}
              data-status={node.gitStatus}
              key={node.id}
              style={{ "--tree-depth": depth } as CSSProperties}
              onClick={() => handleRowClick(node)}
              onDoubleClick={(event) => handleRowDoubleClick(event, node)}
            >
              {depth > 0 ? (
                <span className={styles.indentGuides} aria-hidden="true">
                  {Array.from({ length: depth }, (_, level) => (
                    <span
                      key={level}
                      style={{ "--guide-offset": `${level * 0.875}rem` } as CSSProperties}
                    />
                  ))}
                </span>
              ) : null}
              {isDirectory ? (
                <button
                  className={styles.chevron}
                  type="button"
                  tabIndex={-1}
                  aria-label={`${isExpanded ? "Collapse" : "Expand"} ${nodeName}`}
                  onClick={(event) => handleChevronClick(event, node)}
                >
                  {isExpanded
                    ? <ChevronDown size={13} strokeWidth={1.8} aria-hidden="true" />
                    : <ChevronRight size={13} strokeWidth={1.8} aria-hidden="true" />}
                </button>
              ) : <span className={styles.chevronSpacer} />}
              <span className={styles.fileIcon} data-tone={isDirectory ? "directory" : "file"} aria-hidden="true">
                {isDirectory
                  ? <DirectoryIcon size={14} strokeWidth={1.7} />
                  : <FileTypeIcon name={nodeName} />}
              </span>
              {renamingId === node.id ? (
                <input
                  className={styles.renameInput}
                  value={renameDraft}
                  aria-label={`Rename ${nodeName}`}
                  aria-invalid={renameError}
                  autoFocus
                  onFocus={(event) => event.currentTarget.select()}
                  onChange={(event) => {
                    setRenameDraft(event.target.value);
                    setRenameError(false);
                  }}
                  onClick={(event) => event.stopPropagation()}
                  onDoubleClick={(event) => event.stopPropagation()}
                  onBlur={() => {
                    if (renameDraft.trim()) commitRename(node);
                    else cancelRename();
                  }}
                  onKeyDown={(event) => {
                    event.stopPropagation();
                    if (event.key === "Enter") commitRename(node);
                    if (event.key === "Escape") cancelRename();
                  }}
                />
              ) : <span className={styles.fileName}>{nodeName}</span>}
              {node.readonly ? <LockKeyhole className={styles.readonly} size={11} aria-label="Read only" /> : null}
              {node.gitStatus ? (
                <span className={styles.gitStatus} aria-label={node.gitStatus}>{statusLabel[node.gitStatus]}</span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={styles.sections}>
        <button type="button"><ChevronRight size={12} aria-hidden="true" /><ListTree size={12} aria-hidden="true" /> Outline</button>
        <button type="button"><ChevronRight size={12} aria-hidden="true" /><History size={12} aria-hidden="true" /> Timeline</button>
      </div>
    </div>
  );
}
