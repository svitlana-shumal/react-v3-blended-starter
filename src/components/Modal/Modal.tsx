import { ReactNode } from "react";
import css from "./Modal.module.css";

interface ModalProp {
  children: ReactNode;
}
export default function Modal({ children }: ModalProp) {
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{children}</div>
    </div>
  );
}
