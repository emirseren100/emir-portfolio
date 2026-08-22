"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { penaltyGameProject } from "@/data/projects";
import styles from "./playground.module.css";

function PlaygroundFieldLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [InteractiveField, setInteractiveField] = useState<ComponentType | null>(null);

  useEffect(() => {
    const host = loaderRef.current;
    if (!host) return;

    let cancelled = false;
    const loadField = () => {
      void import("./InteractiveField").then((module) => {
        if (!cancelled) setInteractiveField(() => module.default);
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        loadField();
      }
    }, { rootMargin: "900px" });

    observer.observe(host);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={loaderRef} className={styles.fieldSurface}>
      <div className={styles.fieldAxisLabel} aria-hidden="true">
        <span>EMIR / COORDINATE FIELD</span>
        <span>FIELD / AT REST</span>
      </div>
      {InteractiveField ? <InteractiveField /> : <div className={styles.fieldCanvas} aria-hidden="true" />}
      <p className={styles.fieldAccessibleNote}>
        The coordinate field is a visual enhancement. Its composed structure is static by default; the surrounding
        Playground content explains the experiment without requiring canvas interaction.
      </p>
      <div className={styles.fieldFooter} aria-hidden="true">
        <span>01 / 04 / 02 / 03</span>
        <span>STRUCTURE RETURNS TO REST</span>
      </div>
    </div>
  );
}

export default function PlaygroundSequence() {
  return (
    <section id="playground" className={styles.playgroundSequence} aria-labelledby="playground-title">
      <div className={styles.playgroundTransition} aria-hidden="true">
        <span>03 → PLAYGROUND</span>
        <span>AXIS / FIELD</span>
      </div>

      <div className={styles.playgroundIntro}>
        <div className={styles.playgroundIndex}>
          <span>EXPERIMENTAL DEVELOPMENT</span>
          <strong>FIELD / 00</strong>
        </div>
        <div className={styles.playgroundTitleBlock}>
          <h2 id="playground-title">PLAYGROUND</h2>
          <p>
            A small field for testing how the EMIR system responds when the interface becomes physical.
          </p>
        </div>
        <div className={styles.playgroundInstruction}>
          <span>POINTER / TOUCH</span>
          <span>DRAG TO BEND THE FIELD</span>
          <span>RELEASE TO SETTLE</span>
        </div>
      </div>

      <PlaygroundFieldLoader />

      <div className={styles.experimentIndexBlock}>
        <div className={styles.sectionLead}>
          <span>SMALL EXPERIMENT INDEX</span>
          <span>NO. 02</span>
        </div>
        <ul className={styles.experimentIndex}>
          <li>
            <span>EXP / 00</span>
            <strong>INTERACTIVE FIELD</strong>
            <em>ACTIVE</em>
          </li>
          <li>
            <span>{penaltyGameProject.index}</span>
            <strong>{penaltyGameProject.title.toUpperCase()}</strong>
            <em>REAL MEDIA</em>
          </li>
        </ul>
      </div>

      <article className={styles.penaltyExperiment} aria-labelledby="penalty-title">
        <div className={styles.penaltyHeader}>
          <span className={styles.penaltyIndex}>{penaltyGameProject.index}</span>
          <div>
            <p className={styles.penaltyEyebrow}>EXPERIMENT / PLAY</p>
            <h3 id="penalty-title">PENALTY</h3>
          </div>
          <span className={styles.penaltyRule}>FIELD → GAME</span>
        </div>

        <div className={styles.penaltyMediaStage}>
          <figure className={styles.penaltyPrimaryMedia}>
            <Image
              src={penaltyGameProject.media?.src ?? ""}
              alt={penaltyGameProject.media?.alt ?? "Penalty Shootout gameplay"}
              fill
              sizes="(max-width: 767px) 94vw, 68vw"
            />
            <figcaption>LIVE STATE / AIM + POWER</figcaption>
          </figure>
          {penaltyGameProject.secondaryMedia ? (
            <figure className={styles.penaltySecondaryMedia}>
              <Image
                src={penaltyGameProject.secondaryMedia.src}
                alt={penaltyGameProject.secondaryMedia.alt}
                fill
                sizes="(max-width: 767px) 84vw, 34vw"
              />
              <figcaption>RESULT STATE / GOAL</figcaption>
            </figure>
          ) : null}
        </div>

        <div className={styles.penaltyContext}>
          <div>
            <p className={styles.contextLabel}>PLAYABLE 2D FOOTBALL GAME EXPERIMENT</p>
            <p>{penaltyGameProject.description}</p>
          </div>
          <div className={styles.penaltyFacts}>
            <span>TECHNICAL CONTEXT</span>
            <strong>{penaltyGameProject.technologies.join(" / ")}</strong>
            <span>REAL GAMEPLAY MEDIA</span>
          </div>
        </div>
      </article>

      <div className={styles.playgroundExit} aria-labelledby="playground-exit-title">
        <span className={styles.exitAxis}>PLAYGROUND → ABOUT</span>
        <div>
          <p className={styles.exitEyebrow}>THE FIELD SETTLES</p>
          <h3 id="playground-exit-title">The next question is quieter.</h3>
        </div>
        <span className={styles.exitNote}>ABOUT / NEXT SYSTEM</span>
      </div>
    </section>
  );
}
