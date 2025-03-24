import Image from "next/image";
import { ReactNode } from "react";

type IconButtonProps = {
  iconSrc: string | ReactNode;
  label?: string;
};

export default function IconButton({ iconSrc, label }: IconButtonProps) {
  return (
    <button className="flex items-center space-x-4 hover:bg-zinc-800 px-4 py-2 rounded-xl transition-all w-full">
      {typeof iconSrc === "string" ? (
        <Image src={iconSrc} alt="icon" width={24} height={24} />
      ) : (
        iconSrc
      )}
      {label && <span className="hidden lg:inline text-sm">{label}</span>}
    </button>
  );
}
