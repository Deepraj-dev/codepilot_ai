import type { WorkbenchShellProps, WorkbenchShellStyle } from "../model/workbench.types";
import styles from "./workbench-shell.module.css";

const defaultLabels = {
  activityRail: "Workspace tools",
  sidebar: "Primary sidebar",
  editor: "Editor workspace",
  assistant: "AI assistant",
  bottomPanel: "Bottom panel",
  statusbar: "Workspace status",
} satisfies Required<NonNullable<WorkbenchShellProps["labels"]>>;

export function WorkbenchShell({
  titlebar,
  activityRail,
  sidebar,
  editor,
  assistant,
  bottomPanel,
  sidebarCollapsed = false,
  assistantCollapsed = false,
  bottomPanelCollapsed = false,
  statusbar,
  labels,
  className,
  style,
}: WorkbenchShellProps) {
  const regionLabels = { ...defaultLabels, ...labels };
  const shellClassName = [styles.shell, className].filter(Boolean).join(" ");
  const shellStyle = {
    ...style,
    "--workbench-sidebar-track": sidebar
      ? sidebarCollapsed
        ? "var(--size-panel-collapsed)"
        : "var(--workbench-sidebar-size, var(--size-sidebar-default))"
      : "0px",
    "--workbench-assistant-track": assistant
      ? assistantCollapsed
        ? "var(--size-panel-collapsed)"
        : "var(--workbench-assistant-size, var(--size-assistant-default))"
      : "0px",
    "--workbench-bottom-panel-track": bottomPanel
      ? bottomPanelCollapsed
        ? "var(--size-panel-collapsed)"
        : "var(--workbench-bottom-panel-size, var(--size-bottom-panel-default))"
      : "0px",
  } as WorkbenchShellStyle;

  return (
    <div
      className={shellClassName}
      style={shellStyle}
      data-sidebar={Boolean(sidebar)}
      data-assistant={Boolean(assistant)}
      data-bottom-panel={Boolean(bottomPanel)}
      data-sidebar-collapsed={sidebarCollapsed}
      data-assistant-collapsed={assistantCollapsed}
      data-bottom-panel-collapsed={bottomPanelCollapsed}
    >
      <header className={styles.titlebar}>{titlebar}</header>

      <div className={styles.workspace}>
        <nav className={styles.activityRail} aria-label={regionLabels.activityRail}>
          {activityRail}
        </nav>

        {sidebar ? (
          <aside className={styles.sidebar} aria-label={regionLabels.sidebar}>
            {sidebar}
          </aside>
        ) : null}

        <section className={styles.centerStage}>
          <main className={styles.editor} aria-label={regionLabels.editor}>
            {editor}
          </main>

          {bottomPanel ? (
            <section className={styles.bottomPanel} aria-label={regionLabels.bottomPanel}>
              {bottomPanel}
            </section>
          ) : null}
        </section>

        {assistant ? (
          <aside className={styles.assistant} aria-label={regionLabels.assistant}>
            {assistant}
          </aside>
        ) : null}
      </div>

      <footer className={styles.statusbar} aria-label={regionLabels.statusbar}>
        {statusbar}
      </footer>
    </div>
  );
}
