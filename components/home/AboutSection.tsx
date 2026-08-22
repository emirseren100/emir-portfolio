"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/a11y/use-reduced-motion";
import styles from "./about.module.css";

const focusAreas = [
  {
    title: "Product interfaces",
    detail: "Workflows, hierarchy and states that stay legible as a product grows.",
  },
  {
    title: "Frontend systems",
    detail: "Responsive structure, routes and interaction that remain useful without the effect.",
  },
  {
    title: "Interactive development",
    detail: "Motion, geometry and touch used to make a system easier to read.",
  },
];

const principles = [
  {
    title: "Structure first",
    detail: "Decoration follows the decision, not the other way around.",
  },
  {
    title: "Motion with a job",
    detail: "Movement should clarify state, direction or focus.",
  },
  {
    title: "Real states",
    detail: "A real product view is more useful than a fabricated case study.",
  },
  {
    title: "Usable by default",
    detail: "Interaction is an enhancement, never a prerequisite for understanding.",
  },
];

const practices = [
  ["01", "Frontend", "Responsive interface systems"],
  ["02", "Product UI", "Workflows and information hierarchy"],
  ["03", "Creative development", "Layout, motion and interaction"],
  ["04", "Interactive prototyping", "Pointer, touch and Canvas experiments"],
  ["05", "Game / real-time experiments", "Penalty Game / Phaser 3"],
];

export function AboutSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    if (reducedMotion) {
      delete section.dataset.motionReady;
      return;
    }

    section.dataset.motionReady = "true";

    const targets = section.querySelectorAll<HTMLElement>("[data-about-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.dataset.visible = "true";
            observer.unobserve(target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      delete section.dataset.motionReady;
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.aboutSection}
      data-reduced-motion={reducedMotion || undefined}
      aria-labelledby="about-title"
    >
      <div className={styles.aboutTransition} aria-hidden="true">
        <span>PLAYGROUND → ABOUT</span>
        <span>SYSTEM / PERSON</span>
      </div>

      <div className={styles.aboutIntro} data-about-reveal>
        <div className={styles.aboutIndex}>
          <span>ABOUT / HUMAN LAYER</span>
          <strong>THE FIELD SETTLES</strong>
        </div>
        <div className={styles.aboutIntroNote}>
          <span>LESS MOTION</span>
          <span>MORE ATTENTION</span>
        </div>
      </div>

      <div className={styles.aboutStatement} data-about-reveal>
        <div className={styles.aboutStatementMarker} aria-hidden="true">
          <span>PERSON</span>
          <span>01</span>
        </div>
        <div className={styles.aboutStatementCopy}>
          <h2 id="about-title">I build interfaces that stay clear while they change.</h2>
          <p>
            I work across product interfaces, frontend systems and interactive experiments. I care about making
            complex states readable, then using motion only when it helps people understand what changed.
          </p>
        </div>
      </div>

      <div className={styles.aboutFocus} data-about-reveal>
        <div className={styles.aboutBlockLabel}>
          <span>CURRENT FOCUS</span>
          <span>WHAT I AM BUILDING TOWARD</span>
        </div>
        <div className={styles.focusList}>
          {focusAreas.map((area) => (
            <div className={styles.focusItem} key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.aboutPrinciples} data-about-reveal>
        <div className={styles.aboutBlockLabel}>
          <span>WORKING PRINCIPLES</span>
          <span>THE SYSTEM BEHIND THE WORK</span>
        </div>
        <ol className={styles.principleList}>
          {principles.map((principle, index) => (
            <li className={styles.principleItem} key={principle.title}>
              <span className={styles.principleNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.detail}</p>
              </div>
              <span className={styles.principleSignal} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.aboutPractice} data-about-reveal>
        <div className={styles.aboutBlockLabel}>
          <span>PRACTICE INDEX</span>
          <span>THE AREAS MEETING HERE</span>
        </div>
        <div className={styles.practiceList}>
          {practices.map(([index, title, detail]) => (
            <div className={styles.practiceItem} key={index}>
              <span>{index}</span>
              <strong>{title}</strong>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="contact-handoff" className={styles.aboutContact} data-about-reveal aria-labelledby="contact-handoff-title">
        <div className={styles.contactAxis} aria-hidden="true">
          <span>ABOUT → CONTACT</span>
          <span>PERSON / SIGNAL</span>
        </div>
        <div className={styles.contactCopy}>
          <p>THE NEXT OPEN SYSTEM</p>
          <h2 id="contact-handoff-title">The work can become a signal.</h2>
        </div>
        <span className={styles.contactNote}>CONTACT / NEXT</span>
      </section>
    </section>
  );
}
