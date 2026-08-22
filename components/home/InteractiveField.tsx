"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/a11y/use-reduced-motion";
import styles from "./playground.module.css";

type FieldNode = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  index: string;
  column: number;
  row: number;
};

type PointerState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  down: boolean;
};

const fieldLabels = ["E", "M", "I", "R", "01", "02", "03", "→", "E", "M", "I", "R"];

function createNodes(width: number, height: number, compact: boolean): FieldNode[] {
  const columns = compact ? 4 : 6;
  const rows = compact ? 3 : 4;
  const left = width * 0.1;
  const right = width * 0.9;
  const top = height * 0.18;
  const bottom = height * 0.82;
  const nodes: FieldNode[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const normalizedX = column / Math.max(1, columns - 1);
      const normalizedY = row / Math.max(1, rows - 1);
      const x = left + (right - left) * normalizedX;
      const y = top + (bottom - top) * normalizedY;
      const labelIndex = (row * columns + column) % fieldLabels.length;

      nodes.push({
        homeX: x,
        homeY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        label: fieldLabels[labelIndex],
        index: `${String(row + 1).padStart(2, "0")}.${String(column + 1).padStart(2, "0")}`,
        column,
        row,
      });
    }
  }

  return nodes;
}

function drawField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  nodes: FieldNode[],
  columns: number,
  pointer: PointerState,
  reducedMotion: boolean,
) {
  context.clearRect(0, 0, width, height);

  context.lineWidth = 1;
  context.strokeStyle = "rgba(16, 16, 16, 0.10)";
  const gridSize = Math.max(44, Math.min(88, width / 12));
  for (let x = 0; x <= width; x += gridSize) {
    context.beginPath();
    context.moveTo(Math.round(x) + 0.5, 0);
    context.lineTo(Math.round(x) + 0.5, height);
    context.stroke();
  }
  for (let y = 0; y <= height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, Math.round(y) + 0.5);
    context.lineTo(width, Math.round(y) + 0.5);
    context.stroke();
  }

  context.strokeStyle = "rgba(0, 47, 167, 0.46)";
  context.beginPath();
  context.moveTo(width * 0.1, height * 0.5 + 0.5);
  context.lineTo(width * 0.9, height * 0.5 + 0.5);
  context.stroke();

  nodes.forEach((node, nodeIndex) => {
    if (!reducedMotion) {
      const dx = pointer.x - node.x;
      const dy = pointer.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = pointer.down ? 190 : 150;

      if (pointer.active && distance < influenceRadius) {
        const strength = (1 - distance / influenceRadius) ** 2;
        const direction = distance || 1;
        const directionX = dx / direction;
        const directionY = dy / direction;
        const push = pointer.down ? -18 : -8;
        node.vx += directionX * strength * push + pointer.vx * strength * 0.06;
        node.vy += directionY * strength * push + pointer.vy * strength * 0.06;
      }

      node.vx += (node.homeX - node.x) * 0.024;
      node.vy += (node.homeY - node.y) * 0.024;
      node.vx *= 0.89;
      node.vy *= 0.89;
      node.x += node.vx;
      node.y += node.vy;
    }

    const rightNode = nodes[nodeIndex + 1];
    if (rightNode && rightNode.row === node.row) {
      context.strokeStyle = "rgba(16, 16, 16, 0.23)";
      context.beginPath();
      context.moveTo(node.x, node.y);
      context.lineTo(rightNode.x, rightNode.y);
      context.stroke();
    }

    const belowNode = nodes[nodeIndex + columns];
    if (belowNode) {
      context.strokeStyle = "rgba(16, 16, 16, 0.16)";
      context.beginPath();
      context.moveTo(node.x, node.y);
      context.lineTo(belowNode.x, belowNode.y);
      context.stroke();
    }
  });

  nodes.forEach((node, nodeIndex) => {
    const isSignal = nodeIndex === 0 || nodeIndex === nodes.length - 1 || node.label === "03";
    context.fillStyle = isSignal ? "#002fa7" : "#101010";
    context.beginPath();
    context.arc(node.x, node.y, isSignal ? 4 : 2.5, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "rgba(16, 16, 16, 0.62)";
    context.font = "600 11px Arial, sans-serif";
    context.fillText(node.index, node.x + 10, node.y - 12);
    context.fillStyle = isSignal ? "#002fa7" : "#101010";
    context.font = isSignal ? "700 24px Arial, sans-serif" : "700 18px Arial, sans-serif";
    context.fillText(node.label, node.x + 10, node.y + 8);
  });

  if (pointer.active) {
    context.strokeStyle = pointer.down ? "rgba(0, 47, 167, 0.58)" : "rgba(0, 47, 167, 0.28)";
    context.setLineDash([3, 5]);
    context.beginPath();
    context.arc(pointer.x, pointer.y, pointer.down ? 28 : 18, 0, Math.PI * 2);
    context.stroke();
    context.setLineDash([]);
  }
}

export default function InteractiveField() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const field = canvas?.parentElement;
    if (!canvas || !field) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer: PointerState = { x: 0, y: 0, vx: 0, vy: 0, active: false, down: false };
    const size = { width: 0, height: 0, dpr: 1 };
    const compactQuery = window.matchMedia("(max-width: 767px)");
    let compact = compactQuery.matches;
    let columns = compact ? 4 : 6;
    let nodes: FieldNode[] = [];
    let frame = 0;
    let visible = true;
    let canvasBounds = canvas.getBoundingClientRect();

    const draw = () => {
      drawField(context, size.width, size.height, nodes, columns, pointer, reducedMotion);
    };

    const resize = () => {
      canvasBounds = canvas.getBoundingClientRect();
      compact = compactQuery.matches;
      columns = compact ? 4 : 6;
      size.width = Math.max(1, canvasBounds.width);
      size.height = Math.max(1, canvasBounds.height);
      size.dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.5);
      canvas.width = Math.floor(size.width * size.dpr);
      canvas.height = Math.floor(size.height * size.dpr);
      context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      nodes = createNodes(size.width, size.height, compact);
      pointer.x = size.width * 0.5;
      pointer.y = size.height * 0.5;
      draw();
    };

    const loop = () => {
      frame = window.requestAnimationFrame(loop);
      draw();
    };

    const start = () => {
      if (!reducedMotion && visible && !frame) frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const settleField = () => {
      pointer.active = false;
      pointer.down = false;
      pointer.vx = 0;
      pointer.vy = 0;
      nodes.forEach((node) => {
        node.x = node.homeX;
        node.y = node.homeY;
        node.vx = 0;
        node.vy = 0;
      });
      draw();
    };

    const refreshBounds = () => {
      canvasBounds = canvas.getBoundingClientRect();
    };

    const getPoint = (event: PointerEvent) => ({
      x: Math.max(0, Math.min(size.width, event.clientX - canvasBounds.left)),
      y: Math.max(0, Math.min(size.height, event.clientY - canvasBounds.top)),
    });

    const handlePointerMove = (event: PointerEvent) => {
      const point = getPoint(event);
      pointer.vx = point.x - pointer.x;
      pointer.vy = point.y - pointer.y;
      pointer.x = point.x;
      pointer.y = point.y;
      pointer.active = true;
      if (reducedMotion) draw();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const point = getPoint(event);
      pointer.x = point.x;
      pointer.y = point.y;
      pointer.vx = 0;
      pointer.vy = 0;
      pointer.active = true;
      pointer.down = true;
      canvas.setPointerCapture(event.pointerId);
      if (reducedMotion) draw();
    };

    const releasePointer = () => {
      pointer.down = false;
      if (reducedMotion) draw();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.down = false;
      if (reducedMotion) draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        start();
      } else {
        settleField();
        stop();
      }
    }, { rootMargin: "120px" });

    resizeObserver.observe(field);
    intersectionObserver.observe(field);
    window.addEventListener("resize", resize, { passive: true });
    compactQuery.addEventListener("change", resize);
    canvas.addEventListener("pointerenter", refreshBounds, { passive: true });
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerdown", handlePointerDown, { passive: true });
    canvas.addEventListener("pointerup", releasePointer, { passive: true });
    canvas.addEventListener("pointercancel", releasePointer, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      compactQuery.removeEventListener("change", resize);
      canvas.removeEventListener("pointerenter", refreshBounds);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", releasePointer);
      canvas.removeEventListener("pointercancel", releasePointer);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.fieldCanvas}
      role="img"
      aria-label="Interactive EMIR coordinate field. Pointer or touch drag temporarily bends the structural field and it returns to equilibrium on release."
    />
  );
}
