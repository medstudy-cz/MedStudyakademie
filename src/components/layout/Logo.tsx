import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 sm:gap-3.5", className)}
    >
      <Image
        src="/logo.png"
        alt="MedStudyakademie z.s."
        width={64}
        height={64}
        className="h-11 w-11 shrink-0 rounded-lg object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
        priority
      />
      {showWordmark && (
        <span className="whitespace-nowrap text-base font-bold leading-tight text-primary sm:text-lg lg:text-xl">
          MedStudyakademie z.s.
        </span>
      )}
    </Link>
  );
}
