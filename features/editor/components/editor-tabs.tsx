"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { FileTypeIcon } from "@/features/file-explorer";
import type { EditorTabsProps } from "../model/editor.types";
import styles from "./editor-tabs.module.css";

export function EditorTabs({
  tabs,
  activeTabId,
  onTabSelect,
  onTabClose,
  ariaLabel = "Open editors",
  className,
}: EditorTabsProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabsClassName = [styles.tabs, className].filter(Boolean).join(" ");

  useEffect(() => {
    tabRefs.current[activeTabId ?? ""]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeTabId]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, tabId: string) {
    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
    let nextIndex: number | undefined;

    if (event.key === "ArrowLeft") nextIndex = Math.max(0, currentIndex - 1);
    if (event.key === "ArrowRight") nextIndex = Math.min(tabs.length - 1, currentIndex + 1);
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    onTabSelect(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  }

  function handleMiddleClick(event: MouseEvent<HTMLDivElement>, tabId: string) {
    if (event.button !== 1) return;
    event.preventDefault();
    onTabClose(tabId);
  }

  return (
    <div className={tabsClassName} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <div
            className={styles.tab}
            data-active={isActive}
            data-dirty={tab.dirty || undefined}
            key={tab.id}
            onMouseDown={(event) => handleMiddleClick(event, tab.id)}
          >
            <button
              className={styles.tabTarget}
              type="button"
              role="tab"
              id={`editor-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls="editor-document-surface"
              tabIndex={isActive ? 0 : -1}
              title={tab.path}
              ref={(element) => { tabRefs.current[tab.id] = element; }}
              onClick={() => onTabSelect(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, tab.id)}
            >
              <span className={styles.fileIcon} aria-hidden="true">
                <FileTypeIcon name={tab.name} />
              </span>
              <span className={styles.tabName}>{tab.name}</span>
            </button>
            <button
              className={styles.closeButton}
              type="button"
              aria-label={`Close ${tab.name}`}
              title={`Close ${tab.name}`}
              onClick={() => onTabClose(tab.id)}
            >
              {tab.dirty ? <span className={styles.dirtyDot} /> : <X size={13} strokeWidth={1.8} />}
            </button>
          </div>
        );
      })}
    </div>
  );
}
