"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { devflowProject } from "@/data/projects";
import { EMIRWordmark } from "@/components/emir/EMIRWordmark";
import { SectionMarker } from "@/components/layout/SectionMarker";
import { ScoutLabSequence } from "@/components/home/ScoutLabSequence";
import { AnalyticsSequence } from "@/components/home/AnalyticsSequence";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SectionIndex } from "@/components/home/SectionIndex";
import { useReducedMotion } from "@/lib/a11y/use-reduced-motion";
import { motionTokens, type WordmarkState } from "@/lib/motion/tokens";
import styles from "./home.module.css";

gsap.registerPlugin(ScrollTrigger);

const PlaygroundSequence = dynamic(() => import("@/components/home/PlaygroundSequence"), {
  ssr: false,
});

const stageLabels = [
  { at: 0, label: "INDEX / EMIR", state: "assembled" as WordmarkState },
  { at: 0.2, label: "WORK / APERTURE", state: "separating" as WordmarkState },
  { at: 0.5, label: "WORK / DEVFLOW", state: "framing" as WordmarkState },
  { at: 0.78, label: "INDEX / 01", state: "rail" as WordmarkState },
  { at: 0.9, label: "PROJECT 02 / NEXT", state: "exit" as WordmarkState },
];

type CSSVariableStyle = React.CSSProperties & Record<`--${string}`, string | number>;

export function ProductionHome() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [wordmarkState, setWordmarkState] = useState<WordmarkState>("assembled");
  const [stageLabel, setStageLabel] = useState("INDEX / EMIR");
  const sequenceRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const projectMediaRef = useRef<HTMLDivElement>(null);
  const projectImageRef = useRef<HTMLImageElement>(null);
  const stageLabelRef = useRef("INDEX / EMIR");
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
          defaults: { ease: motionTokens.ease.standard },
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
          .to(sequence, { "--emir-separation": 1, duration: 0.16 }, 0.14)
          .to(sequence, { "--emir-frame": 1, duration: 0.17 }, 0.3)
          .to(sequence, { "--emir-takeover": 1, duration: 0.24 }, 0.5)
          .to(sequence, { "--emir-rail": 1, duration: 0.12 }, 0.76)
          .to(sequence, { "--emir-exit": 1, duration: 0.12 }, 0.88);

        return () => timeline.kill();
      });

      return () => media.revert();
    }, sequence);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const projectMedia = projectMediaRef.current;
    const projectImage = projectImageRef.current;

    if (!stage || !projectMedia || !projectImage || reducedMotion || isMobile) {
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
    const tiltMediaX = gsap.quickTo(projectMedia, "rotationX", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const tiltMediaY = gsap.quickTo(projectMedia, "rotationY", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const moveImageX = gsap.quickTo(projectImage, "x", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });
    const moveImageY = gsap.quickTo(projectImage, "y", {
      duration: motionTokens.pointer.duration,
      ease: motionTokens.ease.settle,
    });

    let surfaceBounds = surface.getBoundingClientRect();
    let projectMediaBounds = projectMedia.getBoundingClientRect();
    const refreshBounds = () => {
      surfaceBounds = surface.getBoundingClientRect();
      projectMediaBounds = projectMedia.getBoundingClientRect();
    };

    const handleWordmarkMove = (event: PointerEvent) => {
      const x = (event.clientX - surfaceBounds.left) / surfaceBounds.width - 0.5;
      const y = (event.clientY - surfaceBounds.top) / surfaceBounds.height - 0.5;

      moveWordX(x * motionTokens.pointer.maxX);
      moveWordY(y * motionTokens.pointer.maxY);
      rotateWord(x * motionTokens.pointer.maxRotation);
    };

    const handleMediaMove = (event: PointerEvent) => {
      const x = (event.clientX - projectMediaBounds.left) / projectMediaBounds.width - 0.5;
      const y = (event.clientY - projectMediaBounds.top) / projectMediaBounds.height - 0.5;

      tiltMediaX(y * -motionTokens.pointer.projectTiltX);
      tiltMediaY(x * motionTokens.pointer.projectTiltY);
      moveImageX(x * 8);
      moveImageY(y * 6);
    };

    const resetWordmark = () => {
      moveWordX(0);
      moveWordY(0);
      rotateWord(0);
    };

    const resetMedia = () => {
      tiltMediaX(0);
      tiltMediaY(0);
      moveImageX(0);
      moveImageY(0);
    };

    const surfaceResizeObserver = new ResizeObserver(refreshBounds);
    const mediaResizeObserver = new ResizeObserver(refreshBounds);
    surfaceResizeObserver.observe(surface);
    mediaResizeObserver.observe(projectMedia);
    window.addEventListener("resize", refreshBounds, { passive: true });

    surface.addEventListener("pointerenter", refreshBounds, { passive: true });
    surface.addEventListener("pointermove", handleWordmarkMove, { passive: true });
    surface.addEventListener("pointerleave", resetWordmark, { passive: true });
    projectMedia.addEventListener("pointerenter", refreshBounds, { passive: true });
    projectMedia.addEventListener("pointermove", handleMediaMove, { passive: true });
    projectMedia.addEventListener("pointerleave", resetMedia, { passive: true });

    return () => {
      surfaceResizeObserver.disconnect();
      mediaResizeObserver.disconnect();
      window.removeEventListener("resize", refreshBounds);
      surface.removeEventListener("pointerenter", refreshBounds);
      surface.removeEventListener("pointermove", handleWordmarkMove);
      surface.removeEventListener("pointerleave", resetWordmark);
      projectMedia.removeEventListener("pointerenter", refreshBounds);
      projectMedia.removeEventListener("pointermove", handleMediaMove);
      projectMedia.removeEventListener("pointerleave", resetMedia);
      resetWordmark();
      resetMedia();
    };
  }, [isMobile, reducedMotion]);

  const visibleState: WordmarkState = reducedMotion ? "framing" : isMobile ? "assembled" : wordmarkState;
  const homeIndexPhase =
    !isMobile &&
    (reducedMotion || wordmarkState === "framing" || wordmarkState === "rail" || wordmarkState === "exit")
      ? "devflow"
      : "index";
  const visibleStageLabel = reducedMotion ? "WORK / DEVFLOW" : isMobile ? "DEVFLOW / 01" : stageLabel;
  const sequenceHint = reducedMotion
    ? "Static project view"
    : isMobile
      ? "Tap to open DevFlow"
      : wordmarkState === "framing" || wordmarkState === "rail" || wordmarkState === "exit"
        ? "DevFlow media active"
        : "Scroll to enter work";
  const initialStyle: CSSVariableStyle = {
    "--emir-separation": reducedMotion || isMobile ? 1 : 0,
    "--emir-frame": reducedMotion || isMobile ? 1 : 0,
    "--emir-takeover": reducedMotion || isMobile ? 0 : 0,
    "--emir-rail": reducedMotion || isMobile ? 1 : 0,
    "--emir-exit": 0,
  };

  return (
    <main
      id="top"
      className={styles.homeShell}
      data-reduced-motion={reducedMotion || undefined}
      data-mobile={isMobile || undefined}
      style={initialStyle}
    >
      <a className={styles.skipLink} href="#selected-work">
        Skip to selected work
      </a>

      <header className={styles.globalNav}>
        <Link className={styles.navIdentity} href="/" aria-label="Emir Şeren home">
          EMIR
        </Link>
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="#selected-work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#playground">PLAYGROUND</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <SectionIndex homePhase={homeIndexPhase} />
      </header>

      <section ref={sequenceRef} id="index" className={styles.homeSequence} aria-labelledby="home-title">
        <div ref={stageRef} className={styles.homeStage}>
          <div className={styles.stageGrid} aria-hidden="true" />
          <div className={styles.takeoverSurface} aria-hidden="true" />
          <div className={styles.stageTopline}>
            <SectionMarker index="INDEX" label={visibleStageLabel} className={styles.marker} />
            <span className={styles.sequenceHint}>{sequenceHint}</span>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>EMİR ŞEREN</p>
            <h1 id="home-title">Interfaces that behave like systems.</h1>
            <p className={styles.heroRole}>CREATIVE DEVELOPER / ISTANBUL</p>
          </div>

          <div className={styles.artifactInteraction} data-pointer-surface>
            <EMIRWordmark state={visibleState} className={styles.artifact} />
          </div>

          <div className={styles.locationNote}>
            <span>EMİR ŞEREN</span>
            <span>CREATIVE DEVELOPMENT</span>
          </div>

          <div
            id="devflow"
            className={styles.projectFrame}
            data-frame-state={visibleState}
          >
            <div className={styles.mobileProjectIndex} aria-hidden="true">
              <span>PROJECT / 01</span>
              <strong>DEVFLOW</strong>
            </div>
            <div ref={projectMediaRef} className={styles.projectMedia} data-project-media>
              <a
                className={styles.projectMediaLink}
                href={devflowProject.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  ref={projectImageRef}
                  className={styles.projectImage}
                  src={devflowProject.media.src}
                  alt={devflowProject.media.alt}
                  fill
                  priority
                  sizes="(max-width: 767px) 94vw, 62vw"
                />
                <span className={styles.mediaScrim} aria-hidden="true" />
                <span className={styles.mediaLabel}>OPEN LIVE PROJECT ↗</span>
              </a>
              <span className={styles.mediaRule} aria-hidden="true" />
              <span className={styles.mediaIndex}>01 / DEVFLOW</span>
            </div>

            <aside className={styles.metadataRail} aria-label="DevFlow project metadata">
              <span className={styles.metadataIndex}>{devflowProject.index}</span>
              <strong>{devflowProject.title}</strong>
              <span>{devflowProject.category}</span>
              <a className={styles.inlineAction} href={devflowProject.liveUrl} target="_blank" rel="noreferrer">
                <span>OPEN LIVE PROJECT ↗</span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 13 13 3M5 3h8v8" />
                </svg>
              </a>
            </aside>
          </div>

          <div className={styles.exitMarker} aria-hidden="true">
            <span>01 → 02</span>
            <span>PROJECT 02 / NEXT</span>
          </div>
          <p className={styles.screenReaderStatus} aria-live="polite">
            Current home state: {visibleStageLabel.toLowerCase()}.
          </p>
        </div>
      </section>

      <section id="selected-work" className={styles.selectedWork} aria-labelledby="selected-work-title">
        <div className={styles.sectionLabel}>
          <SectionMarker index="01 / 02" label="SELECTED WORK" className={styles.marker} />
          <span>THE INDEX OPENS</span>
        </div>
        <div className={styles.selectedWorkMain}>
          <p className={styles.selectedEyebrow}>PROJECT / {devflowProject.index}</p>
          <h2 id="selected-work-title">{devflowProject.title}</h2>
          <p className={styles.selectedCategory}>{devflowProject.category}</p>
          <p className={styles.selectedDescription}>{devflowProject.description}</p>
        </div>
        <ul className={styles.projectHighlights}>
          {devflowProject.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className={styles.projectHandoff} aria-labelledby="project-handoff-title">
        <div className={styles.sectionLabel}>
          <SectionMarker index="01 → 02" label="SCOUTLAB" className={styles.marker} />
          <span>AXIS ESTABLISHED</span>
        </div>
        <div className={styles.handoffMain}>
          <p className={styles.handoffIndex}>01 → 02</p>
          <h2 id="project-handoff-title">The next axis opens.</h2>
          <p>DevFlow releases the viewport. ScoutLab opens as a wider system.</p>
        </div>
      </section>

      <ScoutLabSequence />
      <AnalyticsSequence />
      <PlaygroundSequence />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
