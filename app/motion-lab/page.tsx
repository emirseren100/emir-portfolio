import type { Metadata } from "next";
import { MotionLab } from "@/components/motion-lab/MotionLab";

export const metadata: Metadata = {
  title: "Motion Lab — EMIR Kinetic System",
  description: "EMIR modular kinetic wordmark scroll prototype.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function MotionLabPage() {
  return <MotionLab />;
}
