"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

const styleOne:any = {
  position: "fixed",
  zIndex: 10,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: "auto", // Note: Tailwind's mx-auto translates to auto margins on the x-axis
  backgroundColor: "rgba(0, 0, 0, 0.6)", // Tailwind's bg-black/60 translates to black with 60% opacity
  padding: "10px", // Tailwind's p-10 translates to 10 pixels of padding on all sides
};

const styleTwo:any = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Assuming full width minus some padding
  height: "90%", // Assuming full height minus some padding
  padding: "24px", // Equivalent to Tailwind's p-6
};

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className={styleOne}
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className={styleTwo}
      >
        {children}
      </div>
    </div>
  );
}
