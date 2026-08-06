"use client";

import type { WorkspacePanelProps } from "../model/panel.types";
import styles from "./workspace-panel.module.css";

const collapseGlyph = {
  start: "‹",
  end: "›",
  bottom: "⌄",
} as const;

const expandGlyph = {
  start: "›",
  end: "‹",
  bottom: "⌃",
} as const;

export function WorkspacePanel({
  id,
  title,
  children,
  eyebrow,
  actions,
  resizeHandle,
  collapsible = false,
  collapsed = false,
  collapseDirection = "start",
  onCollapsedChange,
  className,
  contentClassName,
}: WorkspacePanelProps) {
  const titleId = `${id}-title`;
  const contentId = `${id}-content`;
  const panelClassName = [styles.panel, className].filter(Boolean).join(" ");
  const contentClasses = [styles.content, contentClassName].filter(Boolean).join(" ");

  if (collapsed) {
    return (
      <section
        className={panelClassName}
        data-collapsed="true"
        data-collapse-direction={collapseDirection}
        aria-label={title}
      >
        <button
          className={styles.expandButton}
          type="button"
          aria-expanded="false"
          aria-controls={contentId}
          onClick={() => onCollapsedChange?.(false)}
        >
          <span aria-hidden="true">{expandGlyph[collapseDirection]}</span>
          <strong>{title}</strong>
        </button>
      </section>
    );
  }

  return (
    <section className={panelClassName} data-collapsed="false" aria-labelledby={titleId}>
      <header className={styles.header}>
        <div className={styles.heading}>
          {eyebrow ? <span>{eyebrow}</span> : null}
          <h2 id={titleId}>{title}</h2>
        </div>
        <div className={styles.actions}>
          {actions}
          {collapsible ? (
            <button
              className={styles.iconButton}
              type="button"
              aria-expanded="true"
              aria-controls={contentId}
              aria-label={`Collapse ${title}`}
              onClick={() => onCollapsedChange?.(true)}
            >
              <span aria-hidden="true">{collapseGlyph[collapseDirection]}</span>
            </button>
          ) : null}
        </div>
      </header>
      <div id={contentId} className={contentClasses}>
        {children}
      </div>
      {resizeHandle}
    </section>
  );
}
