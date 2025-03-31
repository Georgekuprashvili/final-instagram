import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type IconButtonProps = {
  iconSrc: string | ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
};

export default function IconButton({
  iconSrc,
  label,
  href,
  onClick,
}: IconButtonProps) {
  const content = (
    <div className="flex items-center gap-4 hover:bg-neutral-800 px-4 py-2 rounded-lg w-full">
      {typeof iconSrc === "string" ? (
        <Image
          src={iconSrc}
          alt={label}
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ) : (
        iconSrc
      )}
      <span className="text-white">{label}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
}
