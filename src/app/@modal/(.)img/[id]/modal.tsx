"use client";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  const ModalPortal = () => {
    return (
      <dialog
        ref={dialogRef}
        onClose={onDismiss}
        className="h-screen w-screen bg-black/90 text-white"
      >
        {children}
      </dialog>
    );
  };

  return createPortal(<ModalPortal />, document.getElementById("modal-root")!);
}
