import { useEffect } from "react";

const CursorGlow = () => {
  useEffect(() => {
    const cursorGlow = document.createElement("div");
    cursorGlow.id = "cursor-glow";
    document.body.appendChild(cursorGlow);

    const handleMouseMove = (e: MouseEvent) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursorGlow.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursorGlow.style.opacity = "0";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cursorGlow.remove();
    };
  }, []);

  return null;
};

export default CursorGlow;
