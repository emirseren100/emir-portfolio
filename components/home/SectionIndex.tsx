"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./section-index.module.css";

const indexSections = [
  { id: "index", number: "00", label: "INDEX" },
  { id: "selected-work", number: "01", label: "DEVFLOW" },
  { id: "scoutlab", number: "02", label: "SCOUTLAB" },
  { id: "analytics", number: "03", label: "PULSEBOARD" },
  { id: "playground", number: "04", label: "PLAYGROUND" },
  { id: "about", number: "05", label: "ABOUT" },
  { id: "contact", number: "06", label: "CONTACT" },
] as const;

type IndexSectionId = (typeof indexSections)[number]["id"];
type HomeIndexPhase = "index" | "devflow";

type IndexRailStyle = CSSProperties & {
  "--index-progress": number;
};

type SectionIndexProps = {
  homePhase: HomeIndexPhase;
};

export function SectionIndex({ homePhase }: SectionIndexProps) {
  const [observedId, setObservedId] = useState<IndexSectionId>(indexSections[0].id);
  const observedIdRef = useRef(observedId);

  useEffect(() => {
    let trackedSections: HTMLElement[] = [];
    let resizeFrame = 0;

    const updateActiveSection = () => {
      if (!trackedSections.length) return;

      const viewportMidpoint = window.innerHeight / 2;
      const nearestSection = trackedSections
        .map((section) => {
          const bounds = section.getBoundingClientRect();
          const distance =
            bounds.top > viewportMidpoint
              ? bounds.top - viewportMidpoint
              : bounds.bottom < viewportMidpoint
                ? viewportMidpoint - bounds.bottom
                : 0;

          return { id: section.id as IndexSectionId, distance };
        })
        .sort((a, b) => a.distance - b.distance)[0];

      if (nearestSection && nearestSection.id !== observedIdRef.current) {
        observedIdRef.current = nearestSection.id;
        setObservedId(nearestSection.id);
      }
    };

    const sectionObserver = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-49% 0px -49% 0px",
      threshold: 0,
    });

    const connectSections = () => {
      const nextSections = indexSections
        .map(({ id }) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (nextSections.length !== indexSections.length) return false;

      trackedSections = nextSections;
      trackedSections.forEach((section) => sectionObserver.observe(section));
      updateActiveSection();
      return true;
    };

    const mutationObserver = new MutationObserver(() => {
      if (connectSections()) mutationObserver.disconnect();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    if (connectSections()) mutationObserver.disconnect();

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      mutationObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(resizeFrame);
    };
  }, []);

  const isDevFlowTakeover = observedId === "index" && homePhase === "devflow";
  const activeId: IndexSectionId = isDevFlowTakeover ? "selected-work" : observedId;
  const activeIndex = indexSections.findIndex((section) => section.id === activeId);
  const currentSection = indexSections[activeIndex === -1 ? 0 : activeIndex];
  const railStyle: IndexRailStyle = {
    "--index-progress": (activeIndex === -1 ? 0 : activeIndex) / (indexSections.length - 1),
  };

  return (
    <div
      className={styles.indexRail}
      style={railStyle}
      data-surface="navigation"
      aria-hidden="true"
    >
      <div className={`${styles.indexRailHeader} ${styles.indexRailText}`}>
        <span>INDEX</span>
        <span>EMIR / SYSTEM</span>
      </div>
      <div className={styles.indexRailBody}>
        <span className={styles.indexRailTrack} aria-hidden="true" />
        <span className={styles.indexRailProgress} aria-hidden="true" />
        <ol className={styles.indexRailList} aria-label="Portfolio sections">
          {indexSections.map((section) => {
            const isActive = section.id === activeId;

            return (
              <li
                key={section.id}
                className={`${styles.indexRailItem} ${styles.indexRailText}`}
                data-active={isActive || undefined}
              >
                <span className={styles.indexRailDot} aria-hidden="true" />
                <span className={styles.indexRailItemText}>
                  <span>{section.number}</span>
                  <span className={styles.indexRailItemLabel}>{section.label}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <p className={`${styles.indexRailCurrent} ${styles.indexRailText}`}>
        CURRENT / {currentSection.number} {currentSection.label}
      </p>
    </div>
  );
}
