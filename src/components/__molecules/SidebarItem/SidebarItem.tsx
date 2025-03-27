import IconButton from "@/components/__atoms/IconButton/IconButton";
import { ReactNode } from "react";

type SidebarItemProps = {
  iconSrc: string | ReactNode;
  label: string;
  href?: string;
};

export default function SidebarItem({
  iconSrc,
  label,
  href,
}: SidebarItemProps) {
  return <IconButton iconSrc={iconSrc} label={label} href={href} />;
}
