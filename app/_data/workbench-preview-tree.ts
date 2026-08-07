import type { FileTreeNode } from "@/features/file-explorer";

export const workbenchPreviewTree = [
  {
    id: "app",
    name: "app",
    path: "app",
    kind: "directory",
    children: [
      { id: "app/design", name: "design", path: "app/design", kind: "directory", children: [] },
      { id: "app/globals.css", name: "globals.css", path: "app/globals.css", kind: "file" },
      { id: "app/layout.tsx", name: "layout.tsx", path: "app/layout.tsx", kind: "file" },
      { id: "app/page.tsx", name: "page.tsx", path: "app/page.tsx", kind: "file", gitStatus: "modified" },
    ],
  },
  {
    id: "features",
    name: "features",
    path: "features",
    kind: "directory",
    children: [
      {
        id: "features/file-explorer",
        name: "file-explorer",
        path: "features/file-explorer",
        kind: "directory",
        gitStatus: "untracked",
        children: [
          { id: "features/file-explorer/components", name: "components", path: "features/file-explorer/components", kind: "directory", children: [] },
          { id: "features/file-explorer/index.ts", name: "index.ts", path: "features/file-explorer/index.ts", kind: "file", gitStatus: "untracked" },
        ],
      },
      {
        id: "features/workbench",
        name: "workbench",
        path: "features/workbench",
        kind: "directory",
        children: [
          { id: "features/workbench/components", name: "components", path: "features/workbench/components", kind: "directory", children: [] },
          { id: "features/workbench/model", name: "model", path: "features/workbench/model", kind: "directory", children: [] },
          { id: "features/workbench/store", name: "store", path: "features/workbench/store", kind: "directory", children: [] },
          { id: "features/workbench/index.ts", name: "index.ts", path: "features/workbench/index.ts", kind: "file" },
        ],
      },
    ],
  },
  {
    id: "styles",
    name: "styles",
    path: "styles",
    kind: "directory",
    children: [
      { id: "styles/base.css", name: "base.css", path: "styles/base.css", kind: "file" },
      { id: "styles/tokens.css", name: "tokens.css", path: "styles/tokens.css", kind: "file", gitStatus: "modified" },
    ],
  },
  { id: "package.json", name: "package.json", path: "package.json", kind: "file", gitStatus: "modified" },
  { id: "README.md", name: "README.md", path: "README.md", kind: "file" },
] as const satisfies readonly FileTreeNode[];

export const defaultExpandedFileIds = ["app", "features", "features/workbench"] as const;
