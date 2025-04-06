import Link from "next/link";

export function Header() {
  return (
    <header className="fixed shadow flex w-full justify-between items-center px-6 py-4 md:px-8">
      <Link href={"/"} className="flex items-center gap-x-2">
        <h1 className="text-2xl font-semibold">SayurMana</h1>
      </Link>

      <nav>
        <ul>
          <li>About Us</li>
        </ul>
      </nav>
    </header>
  );
}
