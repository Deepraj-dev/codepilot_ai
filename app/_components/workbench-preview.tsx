"use client";

import { useShallow } from "zustand/react/shallow";
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
          <button className={styles.resetLayoutButton} type="button" onClick={resetLayout}>
            Reset layout
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
          <div><span>⑂ main</span><span>ⓧ 0</span><span>△ 0</span></div>
          <div><span>UTF-8</span><span>TypeScript</span><strong>✦ CodePilot ready</strong></div>
        </div>
      }
      />
    </>
  );
}
