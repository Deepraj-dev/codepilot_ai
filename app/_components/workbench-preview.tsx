"use client";

import { useState } from "react";
import {
  ActivityRail,
  PanelResizeHandle,
  WorkbenchShell,
  WorkspacePanel,
  workbenchActivityItems,
  workbenchUtilityItems,
  type ActivityRailItem,
} from "@/features/workbench";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [assistantCollapsed, setAssistantCollapsed] = useState(false);
  const [bottomPanelCollapsed, setBottomPanelCollapsed] = useState(false);
  const [sidebarSize, setSidebarSize] = useState(224);
  const [assistantSize, setAssistantSize] = useState(330);
  const [bottomPanelSize, setBottomPanelSize] = useState(174);
  const [activeActivity, setActiveActivity] = useState("explorer");

  function handleActivitySelect(item: ActivityRailItem) {
    if (item.kind === "action") return;

    setActiveActivity(item.id);
    if (item.id === "explorer") setSidebarCollapsed(false);
    if (item.id === "agent") setAssistantCollapsed(false);
  }

  return (
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
            <span className={styles.brandMark} aria-hidden="true" />
            <strong>CodePilot</strong>
          </div>
          <button className={styles.commandCenter} type="button">
            <span>⌕</span>
            <span>Search files, commands, and symbols</span>
            <kbd>⌘ K</kbd>
          </button>
          <div className={styles.sessionStatus}>
            <i />
            Workspace ready
          </div>
        </div>
      }
      activityRail={
        <ActivityRail
          items={workbenchActivityItems}
          utilityItems={workbenchUtilityItems}
          activeItemId={activeActivity}
          onItemSelect={handleActivitySelect}
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
          onCollapsedChange={setSidebarCollapsed}
          resizeHandle={
            <PanelResizeHandle
              value={sidebarSize}
              min={176}
              max={416}
              orientation="vertical"
              edge="right"
              label="Resize Explorer panel"
              onResize={setSidebarSize}
            />
          }
        >
          <div className={styles.placeholderTree} aria-hidden="true">
            <span className={styles.treeLong} />
            <span className={styles.treeMedium} />
            <span className={styles.treeShort} />
            <span className={styles.treeMedium} />
            <span className={styles.treeLong} />
          </div>
        </WorkspacePanel>
      }
      editor={
        <div className={styles.editorPlaceholder}>
          <div className={styles.editorTabs}>
            <span className={styles.editorTabActive}>workbench-shell.tsx</span>
            <span>workspace-panel.tsx</span>
          </div>
          <div className={styles.editorCanvas}>
            <div className={styles.editorIntro}>
              <span className={styles.editorSymbol} aria-hidden="true">⌘</span>
              <RegionLabel eyebrow="Primary content" title="Editor slot" />
              <p>Drag panel edges or use the keyboard while a resize handle is focused.</p>
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
          onCollapsedChange={setAssistantCollapsed}
          resizeHandle={
            <PanelResizeHandle
              value={assistantSize}
              min={280}
              max={672}
              orientation="vertical"
              edge="left"
              label="Resize CodePilot panel"
              inverted
              onResize={setAssistantSize}
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
          onCollapsedChange={setBottomPanelCollapsed}
          contentClassName={styles.terminalPanelContent}
          resizeHandle={
            <PanelResizeHandle
              value={bottomPanelSize}
              min={96}
              max={480}
              orientation="horizontal"
              edge="top"
              label="Resize Terminal panel"
              inverted
              onResize={setBottomPanelSize}
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
          <div><span>⑂ main</span><span>ⓧ 0</span><span>△ 0</span></div>
          <div><span>UTF-8</span><span>TypeScript</span><strong>✦ CodePilot ready</strong></div>
        </div>
      }
    />
  );
}
