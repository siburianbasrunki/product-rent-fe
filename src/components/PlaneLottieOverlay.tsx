import React, { useEffect } from "react";
import Lottie from "lottie-react";
import planeAnim from "../assets/paper_plane.json";

type Props = {
  show: boolean;
  onDone?: () => void;
  loop?: boolean;
  durationMs?: number;
};

const PlaneLottieOverlay: React.FC<Props> = ({
  show,
  onDone,
  loop = false,
  durationMs = 1200,
}) => {
  useEffect(() => {
    if (!show || loop) return;
    const t = setTimeout(() => onDone?.(), durationMs);
    return () => clearTimeout(t);
  }, [show, loop, durationMs, onDone]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-auto" 
      aria-hidden={false}
      role="status"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md transition-opacity" />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-[60vw] max-w-[220px]">
          <Lottie animationData={planeAnim} loop={loop} autoplay />
        </div>
      </div>
    </div>
  );
};

export default PlaneLottieOverlay;
