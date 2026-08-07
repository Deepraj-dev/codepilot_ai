import type { FileTreeNode, VisibleFileTreeNode } from "../model/file-explorer.types";

export function flattenVisibleNodes(
  nodes: readonly FileTreeNode[],
  expandedIds: ReadonlySet<string>,
  depth = 0,
  parentId?: string,
): VisibleFileTreeNode[] {
  const result: VisibleFileTreeNode[] = [];

  for (const node of nodes) {
    result.push({ node, depth, parentId });

    if (node.kind === "directory" && node.children && expandedIds.has(node.id)) {
      result.push(...flattenVisibleNodes(node.children, expandedIds, depth + 1, node.id));
    }
  }

  return result;
}

export function collectDirectoryIds(nodes: readonly FileTreeNode[], result = new Set<string>()) {
  for (const node of nodes) {
    if (node.kind !== "directory") continue;
    result.add(node.id);
    if (node.children) collectDirectoryIds(node.children, result);
  }

  return result;
}
