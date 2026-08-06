import { WorkbenchShell } from "@/features/workbench";
import styles from "./page.module.css";

const activityItems = ["◇", "⌕", "⑂", "▷", "▦"];

function RegionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className={styles.regionLabel}>
      <span>{eyebrow}</span>
      <strong>{title}</strong>
    </div>
  );
}

export default function Home() {
  return (
    <WorkbenchShell
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
        <div className={styles.activityContent}>
          <div>
            {activityItems.map((item, index) => (
              <button
                type="button"
                className={index === 0 ? styles.activityActive : undefined}
                aria-label={`Placeholder tool ${index + 1}`}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Placeholder settings">⚙</button>
        </div>
      }
      sidebar={
        <div className={styles.placeholderRegion}>
          <RegionLabel eyebrow="Left sidebar" title="Explorer slot" />
          <div className={styles.placeholderTree} aria-hidden="true">
            <span className={styles.treeLong} />
            <span className={styles.treeMedium} />
            <span className={styles.treeShort} />
            <span className={styles.treeMedium} />
            <span className={styles.treeLong} />
          </div>
        </div>
      }
      editor={
        <div className={styles.editorPlaceholder}>
          <div className={styles.editorTabs}>
            <span className={styles.editorTabActive}>workbench-shell.tsx</span>
            <span>page.tsx</span>
          </div>
          <div className={styles.editorCanvas}>
            <div className={styles.editorIntro}>
              <span className={styles.editorSymbol} aria-hidden="true">⌘</span>
              <RegionLabel eyebrow="Primary content" title="Editor slot" />
              <p>Feature content mounts here without changing the workspace layout.</p>
            </div>
          </div>
        </div>
      }
      assistant={
        <div className={styles.placeholderRegion}>
          <RegionLabel eyebrow="Right sidebar" title="Assistant slot" />
          <div className={styles.assistantPreview} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      }
      bottomPanel={
        <div className={styles.bottomPlaceholder}>
          <RegionLabel eyebrow="Bottom panel" title="Terminal slot" />
          <code><span>~/codepilot-ai</span> waiting for terminal integration…</code>
        </div>
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
