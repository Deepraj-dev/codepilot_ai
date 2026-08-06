import type { WorkbenchShellProps } from "../model/workbench.types";
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
  statusbar,
  labels,
  className,
  style,
}: WorkbenchShellProps) {
  const regionLabels = { ...defaultLabels, ...labels };
  const shellClassName = [styles.shell, className].filter(Boolean).join(" ");

  return (
    <div
      className={shellClassName}
      style={style}
      data-sidebar={Boolean(sidebar)}
      data-assistant={Boolean(assistant)}
      data-bottom-panel={Boolean(bottomPanel)}
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
