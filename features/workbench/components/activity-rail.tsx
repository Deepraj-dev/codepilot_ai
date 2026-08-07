"use client";

import { useRef, type KeyboardEvent } from "react";
import type { ActivityRailItem, ActivityRailProps } from "../model/activity-rail.types";
import styles from "./activity-rail.module.css";

export function ActivityRail({
  items,
  utilityItems = [],
  activeItemId,
  onItemSelect,
  label = "Workspace views",
  className,
}: ActivityRailProps) {
  const itemRefs = useRef(new Map<string, HTMLButtonElement>());
  const railClassName = [styles.rail, className].filter(Boolean).join(" ");
  const allItems = [...items, ...utilityItems];
  const enabledItems = allItems.filter((item) => !item.disabled);
  const fallbackTabStop = enabledItems[0]?.id;

  function focusItem(item: ActivityRailItem | undefined) {
    if (item) itemRefs.current.get(item.id)?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentId: string) {
    const currentIndex = enabledItems.findIndex((item) => item.id === currentId);
    if (currentIndex < 0) return;

    let nextItem: ActivityRailItem | undefined;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextItem = enabledItems[(currentIndex + 1) % enabledItems.length];
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextItem = enabledItems[(currentIndex - 1 + enabledItems.length) % enabledItems.length];
    } else if (event.key === "Home") {
      nextItem = enabledItems[0];
    } else if (event.key === "End") {
      nextItem = enabledItems.at(-1);
    }

    if (!nextItem) return;
    event.preventDefault();
    focusItem(nextItem);
  }

  function renderItem(item: ActivityRailItem) {
    const Icon = item.icon;
    const active = item.kind !== "action" && item.id === activeItemId;
    const tooltipId = `activity-${item.id}-tooltip`;
    const tabbable = item.id === activeItemId || (!activeItemId && item.id === fallbackTabStop);
    const accessibleLabel = item.badge === undefined
      ? item.label
      : `${item.label}, ${item.badge} notifications`;

    return (
      <button
        key={item.id}
        ref={(node) => {
          if (node) itemRefs.current.set(item.id, node);
          else itemRefs.current.delete(item.id);
        }}
        className={styles.item}
        type="button"
        data-active={active}
        disabled={item.disabled}
        tabIndex={tabbable ? 0 : -1}
        aria-label={accessibleLabel}
        aria-pressed={item.kind === "action" ? undefined : active}
        aria-controls={item.controls}
        aria-describedby={tooltipId}
        onClick={() => onItemSelect?.(item)}
        onKeyDown={(event) => handleKeyDown(event, item.id)}
      >
        <span className={styles.activeIndicator} aria-hidden="true" />
        <span className={styles.icon} aria-hidden="true">
          <Icon size={20} strokeWidth={1.7} />
        </span>
        {item.badge !== undefined ? <span className={styles.badge} aria-hidden="true">{item.badge}</span> : null}
        <span id={tooltipId} className={styles.tooltip} role="tooltip">
          <span>{item.label}</span>
          {item.shortcut ? <kbd>{item.shortcut}</kbd> : null}
        </span>
      </button>
    );
  }

  return (
    <div className={railClassName} aria-label={label}>
      <div className={styles.primaryItems}>{items.map(renderItem)}</div>
      {utilityItems.length > 0 ? <div className={styles.utilityItems}>{utilityItems.map(renderItem)}</div> : null}
    </div>
  );
}
