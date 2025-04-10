"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  aboutPath,
  homePath,
  imageIdentifierPath,
  textSearchPath,
} from "@/path";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow z-10 px-6 py-4 flex justify-between items-center md:px-8">
      {/* Left Section */}
      <div className="flex flex-col xs:flex-row items-center gap-x-4">
        <Link href={homePath()} className="flex items-center gap-x-2">
          <h1 className="text-2xl font-semibold">
            Sayur
            <span className="text-green-500 font-bold">Apa</span>
          </h1>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Links */}
      <nav
        className={cn(
          "md:flex items-center gap-x-6 hidden",
          menuOpen &&
            "absolute top-20 sm:top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4"
        )}
      >
        <Link
          href={imageIdentifierPath()}
          className="hover:underline font-semibold"
          onClick={() => setMenuOpen(false)}
        >
          Image Identifier
        </Link>

        <Link
          href={textSearchPath()}
          className="hover:underline font-semibold"
          onClick={() => setMenuOpen(false)}
        >
          Text Search
        </Link>

        <Link
          href={aboutPath()}
          className="hover:underline font-semibold"
          onClick={() => setMenuOpen(false)}
        >
          Learn More
        </Link>
      </nav>
    </header>
  );
}
