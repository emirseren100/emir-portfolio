"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { analyticsProject, type ProjectMedia } from "@/data/projects";
import { useReducedMotion } from "@/lib/a11y/use-reduced-motion";
import { motionTokens } from "@/lib/motion/tokens";
import styles from "./analytics.module.css";

gsap.registerPlugin(ScrollTrigger);

type CSSVariableStyle = React.CSSProperties & Record<`--${string}`, string | number>;

const analyticalStates = [
  { at: 0, label: "ANALYTICS / INTRO" },
  { at: 0.2, label: "03 / DATA SURFACE" },
  { at: 0.42, label: "LENS / READY" },
  { at: 0.72, label: "03 / CONTEXT" },
  { at: 0.9, label: "03 → PLAYGROUND" },
];

function AnalyticsImage({
  media,
  sizes,
  priority = false,
  decorative = false,
}: {
  media: ProjectMedia | null;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  if (!media) return null;

  return (
    <Image
      src={media.src}
      alt={decorative ? "" : media.alt}
      aria-hidden={decorative || undefined}
      fill
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

export function AnalyticsSequence() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [analyticalState, setAnalyticalState] = useState("ANALYTICS / INTRO");
  const sequenceRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef("ANALYTICS / INTRO");

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

    if (!sequence || !scene || reducedMotion || isMobile) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sequence,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.78,
          pin: scene,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const current = [...analyticalStates].reverse().find((item) => self.progress >= item.at) ?? analyticalStates[0];

            if (current.label !== stateRef.current) {
              stateRef.current = current.label;
              setAnalyticalState(current.label);
            }
          },
        },
      });

      timeline
        .to(sequence, { "--analytics-progress": 1, duration: 1 }, 0)
        .to(sequence, { "--analytics-surface": 1, duration: 0.42 }, 0.14)
        .to(sequence, { "--analytics-lens-gate": 1, duration: 0.2 }, 0.34)
        .to(
          sequence,
          {
            "--analytics-exit": 1,
            duration: 0.18,
            ease: motionTokens.ease.settle,
          },
          0.82,
        );

      return () => timeline.kill();
    }, sequence);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  useLayoutEffect(() => {
    const surface = surfaceRef.current;

    if (!surface || reducedMotion || isMobile) return;

    const moveX = gsap.quickTo(surface, "--analytics-lens-x", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const moveY = gsap.quickTo(surface, "--analytics-lens-y", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const moveSize = gsap.quickTo(surface, "--analytics-lens-size", {
      duration: motionTokens.duration.standard,
      ease: motionTokens.ease.settle,
    });
    const moveActive = gsap.quickTo(surface, "--analytics-lens-active", {
      duration: motionTokens.duration.micro,
      ease: motionTokens.ease.standard,
    });

    let bounds = surface.getBoundingClientRect();
    const refreshBounds = () => {
      bounds = surface.getBoundingClientRect();
    };

    const activateCenter = () => {
      moveX(50);
      moveY(50);
      moveSize(10);
      moveActive(1);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const x = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
      const y = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));

      moveX(x);
      moveY(y);
      moveSize(10);
      moveActive(1);
    };

    const resetLens = () => {
      moveSize(0);
      moveActive(0);
      moveX(50);
      moveY(50);
    };

    const resizeObserver = new ResizeObserver(refreshBounds);
    resizeObserver.observe(surface);
    window.addEventListener("resize", refreshBounds, { passive: true });
    surface.addEventListener("pointerenter", activateCenter, { passive: true });
    surface.addEventListener("pointerenter", refreshBounds, { passive: true });
    surface.addEventListener("pointermove", handlePointerMove, { passive: true });
    surface.addEventListener("pointerleave", resetLens, { passive: true });
    surface.addEventListener("focus", activateCenter, { passive: true });
    surface.addEventListener("blur", resetLens, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", refreshBounds);
      surface.removeEventListener("pointerenter", activateCenter);
      surface.removeEventListener("pointerenter", refreshBounds);
      surface.removeEventListener("pointermove", handlePointerMove);
      surface.removeEventListener("pointerleave", resetLens);
      surface.removeEventListener("focus", activateCenter);
      surface.removeEventListener("blur", resetLens);
      resetLens();
    };
  }, [isMobile, reducedMotion]);

  const media = analyticsProject.media;
  const secondaryMedia = analyticsProject.secondaryMedia ?? null;
  const initialStyle: CSSVariableStyle = {
    "--analytics-progress": 0,
    "--analytics-surface": 0,
    "--analytics-lens-gate": 0,
    "--analytics-exit": 0,
    "--analytics-lens-x": 50,
    "--analytics-lens-y": 50,
    "--analytics-lens-size": 0,
    "--analytics-lens-active": 0,
  };

  return (
    <section
      ref={sequenceRef}
      id="analytics"
      className={styles.analyticsSequence}
      data-analytics-mobile={isMobile || undefined}
      data-reduced-motion={reducedMotion || undefined}
      aria-labelledby="analytics-title"
      style={initialStyle}
    >
      <div ref={sceneRef} className={styles.analyticsScene}>
        <div className={styles.analyticsGrid} aria-hidden="true" />
        <div className={styles.analyticsCoordinate} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.analyticsTopline}>
          <span>02 → 03 / ANALYTICS</span>
          <span>{analyticalState}</span>
        </div>

        <div className={styles.analyticsIntro}>
          <p className={styles.analyticsEyebrow}>PROJECT 03 / DATA LENS</p>
          <p>ScoutLab compresses into a precise analytical surface. The pointer opens a second, related dashboard view.</p>
        </div>

        <div className={styles.analyticsTitleBlock}>
          <span className={styles.analyticsIndex}>03</span>
          <h2 id="analytics-title">PULSEBOARD ANALYTICS</h2>
          <span className={styles.analyticsTitleLabel}>REVENUE / HEALTH / GROWTH</span>
        </div>

        <div
          ref={surfaceRef}
          className={styles.analyticsSurface}
          tabIndex={0}
          role="group"
          aria-label="Pulseboard Analytics data lens. Move the pointer across the dashboard to inspect the revenue view."
        >
          <div className={styles.analyticsPrimaryLayer}>
            <AnalyticsImage media={media} sizes="(max-width: 899px) 100vw, 70vw" />
          </div>
          <div className={styles.analyticsLensLayer} aria-hidden="true">
            <AnalyticsImage media={secondaryMedia} sizes="(max-width: 899px) 100vw, 70vw" decorative />
          </div>
          <span className={styles.analyticsLensBoundary} aria-hidden="true" />
          <span className={styles.analyticsLensLabel} aria-hidden="true">
            INSPECT / REVENUE
          </span>
          <span className={styles.analyticsSurfaceHint} aria-hidden="true">
            MOVE TO INSPECT
          </span>
          <span className={styles.analyticsCorner} aria-hidden="true" />
        </div>

        <aside className={styles.analyticsRail} aria-label="Pulseboard Analytics project information">
          <span className={styles.analyticsRailIndex}>{analyticsProject.index}</span>
          <strong>{analyticsProject.title}</strong>
          <span>{analyticsProject.category}</span>
          <p>{analyticsProject.description}</p>
          <span className={styles.analyticsRailRule} aria-hidden="true" />
          <span className={styles.analyticsRailLabel}>CONFIRMED STACK</span>
          <ul>
            {analyticsProject.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </aside>

        <div className={styles.analyticsStaticAlt}>
          <span className={styles.analyticsStaticLabel}>SECONDARY VIEW / REVENUE</span>
          <div className={styles.analyticsStaticMedia}>
            <AnalyticsImage media={secondaryMedia} sizes="(max-width: 899px) 100vw, 48vw" />
          </div>
        </div>

        <div className={styles.analyticsMobileFlow}>
          <div className={styles.analyticsMobileMediaBlock}>
            <span className={styles.analyticsStaticLabel}>PRIMARY VIEW / OVERVIEW</span>
            <div className={styles.analyticsMobileMedia}>
              <AnalyticsImage media={media} sizes="(max-width: 899px) 100vw, 50vw" />
            </div>
          </div>
          <div className={styles.analyticsMobileMediaBlock}>
            <span className={styles.analyticsStaticLabel}>SECONDARY VIEW / REVENUE</span>
            <div className={styles.analyticsMobileMedia}>
              <AnalyticsImage media={secondaryMedia} sizes="(max-width: 899px) 100vw, 50vw" />
            </div>
          </div>
        </div>

        <div className={styles.analyticsMobileContext}>
          <span className={styles.analyticsRailLabel}>PROJECT CONTEXT</span>
          <p>{analyticsProject.description}</p>
          <ul>
            {analyticsProject.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className={styles.analyticsExit}>
          <span>03 → PLAYGROUND</span>
          <span>THE ANALYTICAL SYSTEM RESOLVES INTO EXPERIMENT</span>
        </div>

        <p className={styles.analyticsScreenReaderStatus} aria-live="polite">
          Current Project 03 state: {analyticalState.toLowerCase()}.
        </p>
      </div>
    </section>
  );
}
