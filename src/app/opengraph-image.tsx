import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, React Native, Next.js and NestJS engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "radial-gradient(circle at 80% 0%, #3b2f8f 0%, #0c0c10 55%)",
        color: "#f4f4f6",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#f4f4f6",
            color: "#0c0c10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          SS
        </div>
        <div style={{ fontSize: 28, fontWeight: 600 }}>{profile.name}</div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 20,
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#c9c9d1",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#22c55e" }} />
          Open to contract projects · full-time roles
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
          Fast, native-feeling apps and APIs.
        </div>
        <div style={{ fontSize: 28, color: "#a9a9b6" }}>
          React Native · Expo · Next.js · NestJS · Kotlin & Swift
        </div>
      </div>
      <div style={{ display: "flex", gap: 40, fontSize: 22, color: "#c9c9d1" }}>
        <span>Infoniqa People</span>
        <span>Suiteify Orbit</span>
        <span>Furthr</span>
      </div>
    </div>,
    size,
  );
}
