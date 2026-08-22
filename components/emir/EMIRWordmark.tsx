import type { WordmarkState } from "@/lib/motion/tokens";
import styles from "./emir-wordmark.module.css";

type EMIRWordmarkProps = {
  state: WordmarkState;
  className?: string;
};

export function EMIRWordmark({ state, className = "" }: EMIRWordmarkProps) {
  return (
    <svg
      className={`${styles.wordmark} ${className}`}
      data-wordmark
      data-state={state}
      viewBox="0 0 1120 420"
      role="img"
      aria-label="EMIR kinetic wordmark"
      focusable="false"
    >
      <g className={`${styles.piece} ${styles.eStem}`} data-role="frame">
        <rect x="40" y="70" width="32" height="280" />
      </g>
      <g className={`${styles.piece} ${styles.eTop}`} data-role="frame">
        <rect x="72" y="70" width="180" height="32" />
      </g>
      <g className={`${styles.piece} ${styles.eMiddle}`} data-role="frame">
        <rect x="72" y="194" width="144" height="32" />
      </g>
      <g className={`${styles.piece} ${styles.eBottom}`} data-role="frame">
        <rect x="72" y="318" width="180" height="32" />
      </g>

      <g className={`${styles.piece} ${styles.mLeft}`} data-role="direction">
        <path d="M300 350V70h32l78 116v56l-78-116v224z" />
      </g>
      <g className={`${styles.piece} ${styles.mRight}`} data-role="direction">
        <path d="m410 186 78-116h32v280h-32V144l-78 116z" />
      </g>

      <g className={`${styles.piece} ${styles.iStem}`} data-role="index">
        <rect x="570" y="70" width="34" height="280" />
      </g>
      <g className={`${styles.piece} ${styles.iCap}`} data-role="index">
        <rect x="542" y="70" width="90" height="32" />
      </g>
      <g className={`${styles.piece} ${styles.iFoot}`} data-role="index">
        <rect x="542" y="318" width="90" height="32" />
      </g>

      <g className={`${styles.piece} ${styles.rStem}`} data-role="mask">
        <rect x="730" y="70" width="34" height="280" />
      </g>
      <g className={`${styles.piece} ${styles.rBowl}`} data-role="mask">
        <path d="M764 70h104a70 70 0 0 1 0 140H764v-32h95a38 38 0 0 0 0-76h-95z" />
      </g>
      <g className={`${styles.piece} ${styles.rLeg}`} data-role="mask">
        <path d="m814 208 130 142h-45L780 220z" />
      </g>

      <path className={styles.registrationLine} d="M32 384H1088" aria-hidden="true" />
    </svg>
  );
}
