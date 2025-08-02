import { ReactNode } from "react";
import style from "./GridItem.module.css";

interface GridItemProps {
  children: ReactNode;
}
export default function GridItem({ children }: GridItemProps) {
  return <div className={style.item}>{children}</div>;
}
