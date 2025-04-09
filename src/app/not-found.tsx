// app/not-found.tsx or pages/404.tsx (depending on your Next.js version)
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { homePath } from "@/path";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "default" })}
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
