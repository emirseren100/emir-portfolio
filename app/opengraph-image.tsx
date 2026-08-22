import { ImageResponse } from "next/og";

export const alt = "Emir Şeren — Creative Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          padding: "54px 64px 48px",
          background: "#f3f3ee",
          color: "#101010",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 32,
            display: "flex",
            border: "1px solid rgba(16, 16, 16, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 32,
            bottom: 32,
            left: 284,
            width: 1,
            display: "flex",
            background: "rgba(16, 16, 16, 0.16)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.16em",
          }}
        >
          <span>EMİR ŞEREN</span>
          <span style={{ color: "#002fa7" }}>CREATIVE DEVELOPER</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginLeft: 196,
            marginBottom: 12,
            fontSize: 222,
            lineHeight: 0.78,
            fontWeight: 800,
            letterSpacing: "-0.12em",
          }}
        >
          <span>EM</span>
          <span style={{ color: "#002fa7" }}>I</span>
          <span>R</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "0.12em",
          }}
        >
          <span>PRODUCT INTERFACES / FRONTEND SYSTEMS / INTERACTIVE EXPERIMENTS</span>
          <span style={{ color: "#002fa7" }}>ISTANBUL</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 32,
            right: 32,
            bottom: 176,
            height: 1,
            display: "flex",
            background: "#002fa7",
            opacity: 0.7,
          }}
        />
      </div>
    ),
    size,
  );
}
