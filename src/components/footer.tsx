// components/Footer.tsx
import Link from "next/link";
import { GithubIcon,LinkedinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-8 border-t bg-white text-center text-sm text-gray-600">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <p>
          Made with ❤️ by{" "}
          <span className="font-medium text-gray-800">EngkuAzrul</span>
        </p>
        <div className="flex items-center gap-3 text-gray-700">
          <Link
            href="https://github.com/engkuazrul"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-black"
          >
            <GithubIcon className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/engkuazrul"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-700"
          >
            <LinkedinIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
