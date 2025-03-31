import IconButton from "@/components/__atoms/IconButton/IconButton";
import { ReactNode } from "react";

type SidebarItemProps = {
  iconSrc: string | ReactNode;
  label: string;
  href?: string;
  onClick?: () => void; 
};

export default function SidebarItem({
  iconSrc,
  label,
  href,
  onClick, // ✅ Receive it
}: SidebarItemProps) {
  return <IconButton iconSrc={iconSrc} label={label} href={href} onClick={onClick} />;
}
