import Link from "next/link";

import { aboutPath, homePath, imageIdentifierPath } from "@/path";

export function Header() {
  return (
    <header className="fixed shadow flex w-full justify-between items-center px-6 py-4 md:px-8 bg-white">
      <Link href={homePath()} className="flex items-center gap-x-2">
        <h1 className="text-2xl font-semibold">
          Sayur
          <span className="text-green-500 font-bold">Apa</span>
        </h1>
      </Link>

      <nav className="font-semibold text-base">
        <ul className="flex items-center gap-x-6">
          <li>
            <Link
              href={imageIdentifierPath()}
              className="hover:underline"
            >
              Image Identifier
            </Link>
          </li>
          <li className="disabled cursor-not-allowed text-muted-foreground">
            Text Search
          </li>
          <li>
            <Link
              href={aboutPath()}
              className="hover:underline"
            >
              About SayurApa
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
