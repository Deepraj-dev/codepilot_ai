"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import type { PanelResizeHandleProps } from "../model/panel.types";
import styles from "./panel-resize-handle.module.css";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PanelResizeHandle({
  value,
  min,
  max,
  onResize,
  orientation,
  edge,
  label,
  step = 8,
  inverted = false,
}: PanelResizeHandleProps) {
  const dragOrigin = useRef<{ pointer: number; value: number } | null>(null);

  function getPointerPosition(event: PointerEvent<HTMLDivElement>) {
    return orientation === "vertical" ? event.clientX : event.clientY;
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragOrigin.current = { pointer: getPointerPosition(event), value };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragOrigin.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const delta = getPointerPosition(event) - dragOrigin.current.pointer;
    const nextValue = dragOrigin.current.value + delta * (inverted ? -1 : 1);
    onResize(clamp(nextValue, min, max));
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    dragOrigin.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const decrementKey = orientation === "vertical" ? "ArrowLeft" : "ArrowUp";
    const incrementKey = orientation === "vertical" ? "ArrowRight" : "ArrowDown";
    let nextValue: number | undefined;

    if (event.key === "Home") nextValue = min;
    if (event.key === "End") nextValue = max;
    if (event.key === decrementKey) nextValue = value - step * (inverted ? -1 : 1);
    if (event.key === incrementKey) nextValue = value + step * (inverted ? -1 : 1);

    if (nextValue === undefined) return;
    event.preventDefault();
    onResize(clamp(nextValue, min, max));
  }

  return (
    <div
      className={styles.handle}
      data-orientation={orientation}
      data-edge={edge}
      role="separator"
      tabIndex={0}
      aria-label={label}
      aria-orientation={orientation}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={Math.round(value)}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <span aria-hidden="true" />
    </div>
  );
}
