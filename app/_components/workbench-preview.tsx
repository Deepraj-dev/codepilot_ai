"use client";

import {
  CircleX,
  Code2,
  GitBranch,
  RotateCcw,
  Search,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { EditorTabs, useEditorStore } from "@/features/editor";
import { FileExplorer } from "@/features/file-explorer";
import {
  ActivityRail,
  WorkbenchStateHydrator,
  PanelResizeHandle,
  WorkbenchShell,
  WorkspacePanel,
  WORKBENCH_PANEL_LIMITS,
  useWorkbenchStore,
  workbenchActivityItems,
  workbenchUtilityItems,
} from "@/features/workbench";
import { defaultExpandedFileIds, workbenchPreviewTree } from "../_data/workbench-preview-tree";
import styles from "../page.module.css";

function RegionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className={styles.regionLabel}>
      <span>{eyebrow}</span>
      <strong>{title}</strong>
    </div>
  );
}

export function WorkbenchPreview() {
  const {
    editorTabs,
    activeEditorTabId,
    openDocument,
    selectEditorTab,
    closeEditorTab,
    renameDocument,
  } = useEditorStore(
    useShallow((state) => ({
      editorTabs: state.tabs,
      activeEditorTabId: state.activeTabId,
      openDocument: state.openDocument,
      selectEditorTab: state.selectTab,
      closeEditorTab: state.closeTab,
      renameDocument: state.renameDocument,
    })),
  );
  const activeEditorTab = editorTabs.find((tab) => tab.id === activeEditorTabId);
  const {
    activeActivityId,
    sidebarCollapsed,
    assistantCollapsed,
    bottomPanelCollapsed,
    sidebarSize,
    assistantSize,
    bottomPanelSize,
    activateActivity,
    setPanelCollapsed,
    setPanelSize,
    resetLayout,
  } = useWorkbenchStore(
    useShallow((state) => ({
      activeActivityId: state.activeActivityId,
      sidebarCollapsed: state.sidebarCollapsed,
      assistantCollapsed: state.assistantCollapsed,
      bottomPanelCollapsed: state.bottomPanelCollapsed,
      sidebarSize: state.sidebarSize,
      assistantSize: state.assistantSize,
      bottomPanelSize: state.bottomPanelSize,
      activateActivity: state.activateActivity,
      setPanelCollapsed: state.setPanelCollapsed,
      setPanelSize: state.setPanelSize,
      resetLayout: state.resetLayout,
    })),
  );

  return (
    <>
      <WorkbenchStateHydrator />
      <WorkbenchShell
      sidebarCollapsed={sidebarCollapsed}
      assistantCollapsed={assistantCollapsed}
      bottomPanelCollapsed={bottomPanelCollapsed}
      style={{
        "--workbench-sidebar-size": `${sidebarSize}px`,
        "--workbench-assistant-size": `${assistantSize}px`,
        "--workbench-bottom-panel-size": `${bottomPanelSize}px`,
      }}
      titlebar={
        <div className={styles.titlebarContent}>
          <div className={styles.brand}>
            <Sparkles className={styles.brandMark} size={17} strokeWidth={1.8} aria-hidden="true" />
            <strong>CodePilot</strong>
          </div>
          <button className={styles.commandCenter} type="button">
            <Search size={14} strokeWidth={1.8} aria-hidden="true" />
            <span>Search files, commands, and symbols</span>
            <kbd>⌘ K</kbd>
          </button>
          <div className={styles.sessionStatus}>
            <i />
            Workspace ready
          </div>
          <button className={styles.resetLayoutButton} type="button" onClick={resetLayout}>
            <RotateCcw size={12} aria-hidden="true" />
            <span>Reset layout</span>
          </button>
        </div>
      }
      activityRail={
        <ActivityRail
          items={workbenchActivityItems}
          utilityItems={workbenchUtilityItems}
          activeItemId={activeActivityId}
          onItemSelect={activateActivity}
        />
      }
      sidebar={
        <WorkspacePanel
          id="explorer-panel"
          eyebrow="Workspace"
          title="Explorer"
          collapsible
          collapsed={sidebarCollapsed}
          collapseDirection="start"
          onCollapsedChange={(collapsed) => setPanelCollapsed("sidebar", collapsed)}
          contentClassName={styles.explorerPanelContent}
          resizeHandle={
            <PanelResizeHandle
              value={sidebarSize}
              min={WORKBENCH_PANEL_LIMITS.sidebar.min}
              max={WORKBENCH_PANEL_LIMITS.sidebar.max}
              orientation="vertical"
              edge="right"
              label="Resize Explorer panel"
              onResize={(size) => setPanelSize("sidebar", size)}
            />
          }
        >
          <FileExplorer
            projectName="codepilot_ai"
            nodes={workbenchPreviewTree}
            defaultExpandedIds={defaultExpandedFileIds}
            defaultSelectedId="app/page.tsx"
            onFileOpen={(node) => openDocument({
              id: node.id,
              name: node.name,
              path: node.path,
              readonly: node.readonly,
            })}
            onCreate={(node) => {
              if (node.kind === "file") openDocument({ id: node.id, name: node.name, path: node.path });
            }}
            onRename={(node, nextName) => {
              renameDocument(node.id, nextName);
            }}
          />
        </WorkspacePanel>
      }
      editor={
        <div className={styles.editorPlaceholder}>
          <EditorTabs
            tabs={editorTabs}
            activeTabId={activeEditorTabId}
            onTabSelect={selectEditorTab}
            onTabClose={closeEditorTab}
          />
          <div
            className={styles.editorCanvas}
            id="editor-document-surface"
            role="tabpanel"
            aria-labelledby={activeEditorTabId ? `editor-tab-${activeEditorTabId}` : undefined}
          >
            <div className={styles.editorIntro}>
              <span className={styles.editorSymbol} aria-hidden="true"><Code2 size={18} strokeWidth={1.7} /></span>
              <RegionLabel
                eyebrow={activeEditorTab ? "Editor ready" : "No open editors"}
                title={activeEditorTab?.name ?? "Open a file from Explorer"}
              />
              <p>{activeEditorTab?.path ?? "The Monaco editor surface will appear here next."}</p>
            </div>
          </div>
        </div>
      }
      assistant={
        <WorkspacePanel
          id="assistant-panel"
          eyebrow="AI"
          title="CodePilot"
          collapsible
          collapsed={assistantCollapsed}
          collapseDirection="end"
          onCollapsedChange={(collapsed) => setPanelCollapsed("assistant", collapsed)}
          resizeHandle={
            <PanelResizeHandle
              value={assistantSize}
              min={WORKBENCH_PANEL_LIMITS.assistant.min}
              max={WORKBENCH_PANEL_LIMITS.assistant.max}
              orientation="vertical"
              edge="left"
              label="Resize CodePilot panel"
              inverted
              onResize={(size) => setPanelSize("assistant", size)}
            />
          }
        >
          <div className={styles.assistantPreview} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </WorkspacePanel>
      }
      bottomPanel={
        <WorkspacePanel
          id="terminal-panel"
          eyebrow="Output"
          title="Terminal"
          collapsible
          collapsed={bottomPanelCollapsed}
          collapseDirection="bottom"
          onCollapsedChange={(collapsed) => setPanelCollapsed("bottomPanel", collapsed)}
          contentClassName={styles.terminalPanelContent}
          resizeHandle={
            <PanelResizeHandle
              value={bottomPanelSize}
              min={WORKBENCH_PANEL_LIMITS.bottomPanel.min}
              max={WORKBENCH_PANEL_LIMITS.bottomPanel.max}
              orientation="horizontal"
              edge="top"
              label="Resize Terminal panel"
              inverted
              onResize={(size) => setPanelSize("bottomPanel", size)}
            />
          }
        >
          <code className={styles.terminalPreview}>
            <span>~/codepilot-ai</span> panel primitives ready…
          </code>
        </WorkspacePanel>
      }
      statusbar={
        <div className={styles.statusbarContent}>
          <div>
            <span><GitBranch size={11} aria-hidden="true" /> main</span>
            <span><CircleX size={11} aria-hidden="true" /> 0</span>
            <span><TriangleAlert size={11} aria-hidden="true" /> 0</span>
          </div>
          <div>
            <span>UTF-8</span>
            <span>TypeScript</span>
            <strong><Sparkles size={11} aria-hidden="true" /> CodePilot ready</strong>
          </div>
        </div>
      }
      />
    </>
  );
}
