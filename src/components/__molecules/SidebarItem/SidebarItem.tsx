import IconButton from "@/components/__atoms/IconButton/IconButton";
import { ReactNode } from "react";

type SidebarItemProps = {
  iconSrc: string | ReactNode;
  label: string;
};

export default function SidebarItem({ iconSrc, label }: SidebarItemProps) {
  return <IconButton iconSrc={iconSrc} label={label} />;
}
