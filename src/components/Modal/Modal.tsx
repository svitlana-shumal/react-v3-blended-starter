import styled from "./Modal.module.css";
import { createPortal } from "react-dom";
import { ReactNode, useEffect } from "react";
import { Photo } from "../../types/photo";

interface ModalProps {
  onClose: () => void;
  photo: Photo;
  children: ReactNode;
}
export default function Modal({ onClose, children }: ModalProps) {
  const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styled.backdrop}
      onClick={handleBackDropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
