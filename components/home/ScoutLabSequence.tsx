"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scoutlabProject, type ProjectMedia } from "@/data/projects";
import { useReducedMotion } from "@/lib/a11y/use-reduced-motion";
import { motionTokens } from "@/lib/motion/tokens";
import styles from "./scoutlab.module.css";

gsap.registerPlugin(ScrollTrigger);

type CSSVariableStyle = React.CSSProperties & Record<`--${string}`, string | number>;

const spatialStates = [
  { at: 0, label: "SCOUTLAB / INTRO" },
  { at: 0.2, label: "SCOUTLAB / LAYER 01" },
  { at: 0.46, label: "SCOUTLAB / LAYER 02" },
  { at: 0.7, label: "SCOUTLAB / DETAIL" },
  { at: 0.9, label: "02 → 03 / EXIT" },
];

function ScoutMedia({ media, sizes, priority = false }: { media: ProjectMedia | null; sizes: string; priority?: boolean }) {
  if (!media) return null;

  return <Image src={media.src} alt={media.alt} fill sizes={sizes} loading={priority ? "eager" : "lazy"} />;
}

export function ScoutLabSequence() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [spatialState, setSpatialState] = useState("SCOUTLAB / INTRO");
  const sequenceRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const primaryMediaRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef("SCOUTLAB / INTRO");

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 899px)");
    const updateLayout = () => setIsMobile(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useLayoutEffect(() => {
    const sequence = sequenceRef.current;
    const scene = sceneRef.current;

    if (!sequence || !scene || reducedMotion || isMobile) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 900px)", () => {
        const setStateFromProgress = (progress: number) => {
          const current = [...spatialStates].reverse().find((item) => progress >= item.at) ?? spatialStates[0];

          if (current.label !== stateRef.current) {
            stateRef.current = current.label;
            setSpatialState(current.label);
          }
        };

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sequence,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: scene,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setStateFromProgress(self.progress),
          },
        });

        timeline
          .to(sequence, { "--scout-progress": 1, duration: 1 }, 0)
          .to(
            sequence,
            {
              "--scout-exit": 1,
              duration: 0.18,
              ease: motionTokens.ease.settle,
            },
            0.82,
          );

        return () => timeline.kill();
      });

      return () => media.revert();
    }, sequence);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  useLayoutEffect(() => {
    const primaryMedia = primaryMediaRef.current;

    if (!primaryMedia || reducedMotion || isMobile) {
      return;
    }

    const moveX = gsap.quickTo(primaryMedia, "--scout-pointer-x", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const moveY = gsap.quickTo(primaryMedia, "--scout-pointer-y", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const tiltX = gsap.quickTo(primaryMedia, "--scout-pointer-tilt-x", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const tiltY = gsap.quickTo(primaryMedia, "--scout-pointer-tilt-y", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });

    let bounds = primaryMedia.getBoundingClientRect();
    const refreshBounds = () => {
      bounds = primaryMedia.getBoundingClientRect();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      moveX(x * 12);
      moveY(y * 8);
      tiltX(y * -1.1);
      tiltY(x * 1.4);
    };

    const resetPointer = () => {
      moveX(0);
      moveY(0);
      tiltX(0);
      tiltY(0);
    };

    const resizeObserver = new ResizeObserver(refreshBounds);
    resizeObserver.observe(primaryMedia);
    window.addEventListener("resize", refreshBounds, { passive: true });
    primaryMedia.addEventListener("pointerenter", refreshBounds, { passive: true });
    primaryMedia.addEventListener("pointermove", handlePointerMove, { passive: true });
    primaryMedia.addEventListener("pointerleave", resetPointer, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", refreshBounds);
      primaryMedia.removeEventListener("pointerenter", refreshBounds);
      primaryMedia.removeEventListener("pointermove", handlePointerMove);
      primaryMedia.removeEventListener("pointerleave", resetPointer);
      resetPointer();
    };
  }, [isMobile, reducedMotion]);

  const media: ProjectMedia | null = scoutlabProject.media;
  const secondaryMedia: ProjectMedia | null = scoutlabProject.secondaryMedia ?? null;

  return (
    <section
      ref={sequenceRef}
      id="scoutlab"
      className={styles.scoutSequence}
      data-scout-mobile={isMobile || undefined}
      data-reduced-motion={reducedMotion || undefined}
      aria-labelledby="scoutlab-title"
      style={{ "--scout-progress": 0, "--scout-exit": 0 } as CSSVariableStyle}
    >
      <div ref={sceneRef} className={styles.scoutScene}>
        <div className={styles.scoutGrid} aria-hidden="true" />
        <div className={styles.scoutBackplane} aria-hidden="true">
          <span className={styles.backplaneIndex}>02 / SPATIAL INDEX</span>
          <span className={styles.backplaneWord}>SCOUTLAB</span>
        </div>

        <div className={styles.scoutTopline}>
          <span>02 / SCOUTLAB</span>
          <span>{spatialState}</span>
        </div>

        <div className={styles.scoutIntro}>
          <p className={styles.scoutEyebrow}>PROJECT 02 / SPATIAL SYSTEM</p>
          <p>
            A frontend project explored as a wider workspace: layers, routes and state moving through one analytical
            axis.
          </p>
        </div>

        <div className={styles.scoutAxis} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.scoutViewport}>
          <div className={styles.scoutCanvas}>
            <div className={styles.workspaceLead}>
              <span className={styles.workspaceIndex}>02</span>
              <h2 id="scoutlab-title">SCOUTLAB</h2>
              <span className={styles.workspaceLabel}>INTERFACE / STATE / ROUTE</span>
            </div>

            <div
              ref={primaryMediaRef}
              className={`${styles.scoutMediaPanel} ${styles.scoutMediaPrimary}`}
            >
              <ScoutMedia media={media} sizes="(max-width: 899px) 94vw, 52vw" />
              <span className={styles.panelCorner} aria-hidden="true" />
              <span className={styles.panelStatus}>VIEW / OVERVIEW</span>
            </div>

            <div
              className={`${styles.scoutMediaPanel} ${styles.scoutMediaSecondary}`}
            >
              <ScoutMedia media={secondaryMedia} sizes="(max-width: 899px) 94vw, 40vw" />
              <span className={styles.panelCorner} aria-hidden="true" />
              <span className={styles.panelStatus}>VIEW / PLAYER PROFILE</span>
            </div>

            <aside id="scoutlab-detail" className={styles.scoutDetailRail} aria-label="ScoutLab project detail">
              <span className={styles.detailIndex}>{scoutlabProject.index}</span>
              <strong>{scoutlabProject.title}</strong>
              <span>{scoutlabProject.category}</span>
              <p>{scoutlabProject.description}</p>
            </aside>

            <div className={styles.scoutTechRail}>
              <span className={styles.techLabel}>IMPLEMENTATION CONTEXT</span>
              <ul>
                {scoutlabProject.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.scoutMobileContext}>
          <span className={styles.techLabel}>PROJECT CONTEXT</span>
          <p>{scoutlabProject.description}</p>
          <ul>
            {scoutlabProject.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className={styles.scoutExit}>
          <span>02 → 03</span>
          <span>THE WORKSPACE COMPRESSES</span>
        </div>

        <p className={styles.scoutScreenReaderStatus} aria-live="polite">
          Current ScoutLab state: {spatialState.toLowerCase()}.
        </p>
      </div>
    </section>
  );
}
