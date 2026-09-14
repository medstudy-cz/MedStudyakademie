"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

/** Lightweight top bar for quiz pages (avoids NextUI deps from original quiz navbar). */
export function QuizNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#f6fcff]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="MedStudy Akademie"
            width={28}
            height={28}
            priority
          />
          <span className="text-lg font-extrabold text-[#153060]">
            MedStudy Akademie
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold text-[#153060]/80 hover:text-[#153060]"
        >
          ←
        </Link>
      </div>
    </header>
  );
}

export { QuizNavbar as Navbar };
