"use client";

import { useLayoutEffect, useRef, type MouseEvent } from "react";
import { EMIRWordmark } from "@/components/emir/EMIRWordmark";
import { contact } from "@/data/contact";
import { useReducedMotion } from "@/lib/a11y/use-reduced-motion";
import styles from "./contact.module.css";

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function ContactSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const signalRef = useRef<HTMLSpanElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const signal = signalRef.current;
    const wordmark = wordmarkRef.current;

    if (!section || !signal || !wordmark) {
      return;
    }

    section.dataset.motionReady = reducedMotion ? "false" : "true";

    if (reducedMotion) {
      section.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);

    const targets = section.querySelectorAll<HTMLElement>("[data-contact-target]");
    const resetSignal = () => {
      signal.style.setProperty("--contact-signal-y", "0px");
      signal.style.setProperty("--contact-signal-x", "0px");
      wordmark.style.setProperty("--contact-wordmark-x", "0px");
      wordmark.style.setProperty("--contact-wordmark-y", "0px");
    };
    const moveSignalToTarget = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const sectionBounds = section.getBoundingClientRect();
      const targetBounds = target.getBoundingClientRect();
      const targetY = targetBounds.top + targetBounds.height / 2 - sectionBounds.top;
      const targetX = targetBounds.left + targetBounds.width / 2 - sectionBounds.left;
      const signalDeltaY = Math.min(120, Math.max(-120, targetY - sectionBounds.height / 2));

      signal.style.setProperty("--contact-signal-y", `${signalDeltaY}px`);
      signal.style.setProperty("--contact-signal-x", `${Math.min(16, Math.max(-16, targetX / 120))}px`);
      wordmark.style.setProperty("--contact-wordmark-x", `${targetX > sectionBounds.width / 2 ? 3 : -3}px`);
      wordmark.style.setProperty("--contact-wordmark-y", `${targetY > sectionBounds.height / 2 ? 2 : -2}px`);
    };

    targets.forEach((target) => {
      target.addEventListener("pointerenter", moveSignalToTarget, { passive: true });
      target.addEventListener("focus", moveSignalToTarget);
      target.addEventListener("pointerleave", resetSignal, { passive: true });
      target.addEventListener("blur", resetSignal);
    });

    return () => {
      observer.disconnect();
      targets.forEach((target) => {
        target.removeEventListener("pointerenter", moveSignalToTarget);
        target.removeEventListener("focus", moveSignalToTarget);
        target.removeEventListener("pointerleave", resetSignal);
        target.removeEventListener("blur", resetSignal);
      });
      resetSignal();
      delete section.dataset.motionReady;
      delete section.dataset.visible;
    };
  }, [reducedMotion]);

  const handleBackToIndex = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.replaceState(null, "", "#top");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={styles.contactSection}
      data-reduced-motion={reducedMotion || undefined}
      aria-labelledby="contact-title"
    >
      <div className={styles.contactHeader}>
        <div className={styles.contactHeaderAxis} aria-hidden="true">
          <span>ABOUT → CONTACT</span>
          <span>PERSON / SIGNAL</span>
        </div>
        <div className={styles.contactHeaderCopy}>
          <p>THE NEXT OPEN SYSTEM</p>
          <p>The work can become a signal.</p>
        </div>
      </div>

      <div className={styles.contactMain}>
        <div className={styles.contactMainIndex}>
          <span>CONTACT / 06</span>
          <span>OPEN CHANNEL</span>
        </div>
        <div className={styles.contactStatement}>
          <p className={styles.contactEyebrow}>CONTACT</p>
          <h2 id="contact-title">OPEN CHANNEL.</h2>
          <p className={styles.contactSupport}>For work, collaboration or an interesting problem.</p>
        </div>
        <div className={styles.contactActions} aria-label="Contact links">
          {contact.links.map((link) => (
            <a
              key={link.label}
              className={styles.contactAction}
              data-contact-target
              href={link.href}
              target={isExternalLink(link.href) ? "_blank" : undefined}
              rel={isExternalLink(link.href) ? "noopener noreferrer" : undefined}
            >
              <span>{link.label}</span>
              <span className={styles.contactActionValue}>{link.value}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.contactResolve} aria-hidden="true">
        <span ref={signalRef} className={styles.contactSignal} />
        <span className={`${styles.contactFragment} ${styles.contactFragmentLeft}`} />
        <span className={`${styles.contactFragment} ${styles.contactFragmentRight}`} />
        <div ref={wordmarkRef} className={styles.contactWordmark}>
          <EMIRWordmark state="assembled" className={styles.contactWordmarkSvg} />
        </div>
        <div className={styles.contactResolveMeta}>
          <span>RESOLVED IDENTITY</span>
          <span>EMIR / STATIC SIGNAL</span>
        </div>
      </div>

      <div className={styles.contactFooter}>
        <div className={styles.contactIdentity}>
          <span data-contact-target>{contact.name}</span>
          <span data-contact-target>{contact.location}</span>
          <span data-contact-target>{contact.year}</span>
        </div>
        <a className={styles.backToIndex} href="#top" onClick={handleBackToIndex}>
          BACK TO INDEX <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  );
}
