"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EMIRWordmark } from "@/components/emir/EMIRWordmark";
import { SectionMarker } from "@/components/layout/SectionMarker";
import { useReducedMotion } from "@/lib/a11y/use-reduced-motion";
import { motionTokens, type WordmarkState } from "@/lib/motion/tokens";
import styles from "./motion-lab.module.css";

gsap.registerPlugin(ScrollTrigger);

const stageLabels = [
  { at: 0, label: "EMIR ASSEMBLED", state: "assembled" as WordmarkState },
  { at: 0.22, label: "DECOMPOSITION", state: "separating" as WordmarkState },
  { at: 0.52, label: "PROJECT FRAME", state: "framing" as WordmarkState },
  { at: 0.73, label: "INDEX RAIL", state: "rail" as WordmarkState },
  { at: 0.9, label: "FORWARD / PROJECT 02", state: "exit" as WordmarkState },
];

type CSSVariableStyle = React.CSSProperties & Record<`--${string}`, string | number>;

export function MotionLab() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [wordmarkState, setWordmarkState] = useState<WordmarkState>("assembled");
  const [stageLabel, setStageLabel] = useState("EMIR ASSEMBLED");
  const sequenceRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const projectVisualRef = useRef<HTMLDivElement>(null);
  const stageLabelRef = useRef("EMIR ASSEMBLED");
  const wordmarkStateRef = useRef<WordmarkState>("assembled");

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateLayout = () => setIsMobile(mediaQuery.matches);
    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useLayoutEffect(() => {
    const sequence = sequenceRef.current;
    const stage = stageRef.current;

    if (!sequence || !stage || reducedMotion || isMobile) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const setStageFromProgress = (progress: number) => {
          const current = [...stageLabels].reverse().find((item) => progress >= item.at) ?? stageLabels[0];

          if (current.label !== stageLabelRef.current) {
            stageLabelRef.current = current.label;
            setStageLabel(current.label);
          }

          if (current.state !== wordmarkStateRef.current) {
            wordmarkStateRef.current = current.state;
            setWordmarkState(current.state);
          }
        };

        const timeline = gsap.timeline({
          defaults: {
            ease: motionTokens.ease.standard,
          },
          scrollTrigger: {
            trigger: sequence,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.85,
            pin: stage,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setStageFromProgress(self.progress),
          },
        });

        timeline
          .to(sequence, { "--emir-separation": 1, duration: 0.22 }, 0.15)
          .to(sequence, { "--emir-frame": 1, duration: 0.29 }, 0.34)
          .to(sequence, { "--emir-rail": 1, duration: 0.19 }, 0.62)
          .to(sequence, { "--emir-exit": 1, duration: 0.16 }, 0.84);

        return () => timeline.kill();
      });

      return () => media.revert();
    }, sequence);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const projectVisual = projectVisualRef.current;

    if (!stage || reducedMotion || isMobile) {
      return;
    }

    const surface = stage.querySelector<HTMLElement>("[data-pointer-surface]");
    const wordmark = stage.querySelector<SVGElement>("[data-wordmark]");
    if (!surface || !wordmark) {
      return;
    }

    const moveWordX = gsap.quickTo(wordmark, "x", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const moveWordY = gsap.quickTo(wordmark, "y", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const rotateWord = gsap.quickTo(wordmark, "rotation", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });

    const moveProjectX = projectVisual
      ? gsap.quickTo(projectVisual, "rotationX", {
          duration: motionTokens.pointer.duration,
          ease: motionTokens.ease.settle,
        })
      : null;
    const moveProjectY = projectVisual
      ? gsap.quickTo(projectVisual, "rotationY", {
          duration: motionTokens.pointer.duration,
          ease: motionTokens.ease.settle,
        })
      : null;

    const handleWordmarkMove = (event: PointerEvent) => {
      const bounds = surface.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      moveWordX(x * motionTokens.pointer.maxX);
      moveWordY(y * motionTokens.pointer.maxY);
      rotateWord(x * motionTokens.pointer.maxRotation);
    };

    const handleProjectMove = (event: PointerEvent) => {
      if (!projectVisual || !moveProjectX || !moveProjectY) {
        return;
      }

      const bounds = projectVisual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      moveProjectX(y * -motionTokens.pointer.projectTiltX);
      moveProjectY(x * motionTokens.pointer.projectTiltY);
    };

    const resetWordmark = () => {
      moveWordX(0);
      moveWordY(0);
      rotateWord(0);
    };

    const resetProject = () => {
      moveProjectX?.(0);
      moveProjectY?.(0);
    };

    surface.addEventListener("pointermove", handleWordmarkMove, { passive: true });
    surface.addEventListener("pointerleave", resetWordmark, { passive: true });
    projectVisual?.addEventListener("pointermove", handleProjectMove, { passive: true });
    projectVisual?.addEventListener("pointerleave", resetProject, { passive: true });

    return () => {
      surface.removeEventListener("pointermove", handleWordmarkMove);
      surface.removeEventListener("pointerleave", resetWordmark);
      projectVisual?.removeEventListener("pointermove", handleProjectMove);
      projectVisual?.removeEventListener("pointerleave", resetProject);
      resetWordmark();
      resetProject();
    };
  }, [isMobile, reducedMotion]);

  const visibleState: WordmarkState = reducedMotion || isMobile ? "framing" : wordmarkState;
  const visibleStageLabel = reducedMotion ? "STATIC EMIR FRAME" : isMobile ? "EMIR PROJECT FRAME" : stageLabel;
  const initialStyle: CSSVariableStyle = {
    "--emir-separation": reducedMotion || isMobile ? 1 : 0,
    "--emir-frame": reducedMotion || isMobile ? 1 : 0,
    "--emir-rail": reducedMotion || isMobile ? 1 : 0,
    "--emir-exit": 0,
  };

  return (
    <main
      className={styles.motionLab}
      data-reduced-motion={reducedMotion || undefined}
      data-mobile={isMobile || undefined}
      style={initialStyle}
    >
      <a className={styles.skipLink} href="#project-frame">
        Skip motion sequence
      </a>

      <header className={styles.labHeader}>
        <a className={styles.wordmark} href="/motion-lab" aria-label="EMIR Motion Lab home">
          EMIR
        </a>
        <div className={styles.labHeaderMeta}>
          <span>Kinetic System</span>
          <span>Prototype 02</span>
        </div>
        <a className={styles.headerLink} href="#project-frame">
          Jump to project
        </a>
      </header>

      <section ref={sequenceRef} className={styles.sequence} aria-labelledby="motion-lab-title">
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.stageGrid} aria-hidden="true" />
          <div className={styles.stageTopline}>
            <SectionMarker index="00 / 05" label={visibleStageLabel} className={styles.marker} />
            <span className={styles.sequenceHint}>
              {reducedMotion ? "Static motion fallback" : isMobile ? "Tap-friendly frame" : "Scroll controls system"}
            </span>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>EMIR — KINETIC SYSTEM</p>
            <h1 id="motion-lab-title">Interfaces that behave like systems.</h1>
            <p className={styles.heroRole}>CREATIVE DEVELOPER / ISTANBUL</p>
          </div>

          <div className={styles.artifactInteraction} data-pointer-surface>
            <EMIRWordmark state={visibleState} className={styles.artifact} />
          </div>

          <div className={styles.locationNote}>
            <span>EMİR ŞEREN</span>
            <span>2026 — MOTION LAB</span>
          </div>

          <div id="project-frame" className={styles.projectFrame} data-frame-state={visibleState}>
            <div
              ref={projectVisualRef}
              className={styles.projectVisual}
              data-project-surface
              aria-label="Temporary Devflow project visual"
            >
              <span className={styles.projectSignal} aria-hidden="true" />
              <div className={styles.projectVisualTopline}>
                <span>01 / 05</span>
                <span>WORK / SYSTEMS</span>
              </div>
              <div className={styles.projectVisualCore}>
                <span className={styles.projectVisualIndex}>01</span>
                <span className={styles.projectVisualName}>DEVFLOW</span>
                <span className={styles.projectVisualDescription}>WEB APPLICATION</span>
              </div>
              <div className={styles.projectVisualRule} aria-hidden="true" />
            </div>

            <aside className={styles.metadataRail} aria-label="Project metadata">
              <span className={styles.metadataIndex}>01</span>
              <strong>DEVFLOW</strong>
              <span>WEB APPLICATION</span>
              <a className={styles.inlineAction} href="#project-frame">
                <span>VIEW PROJECT</span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 13 13 3M5 3h8v8" />
                </svg>
              </a>
            </aside>
          </div>

          <div className={styles.exitMarker} aria-hidden="true">
            <span />
            <span>FORWARD / PROJECT 02</span>
          </div>
          <p className={styles.screenReaderStatus} aria-live="polite">
            Current EMIR state: {visibleStageLabel.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className={styles.afterSequence} aria-labelledby="prototype-note-title">
        <SectionMarker index="—" label="SYSTEM NOTE" className={styles.marker} />
        <div>
          <h2 id="prototype-note-title">EMIR changes function, not identity.</h2>
          <p>Scroll back to watch the wordmark return to its assembled index.</p>
        </div>
      </section>
    </main>
  );
}
