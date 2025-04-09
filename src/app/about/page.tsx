import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { imageIdentifierPath } from "@/path";

export default function AboutSayurApaPage() {
  return (
    <main className="container mx-auto px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Sayur
            <span className="text-green-500 font-bold">Apa</span> – Instantly
            Identify Vegetables with a Snap
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            SayurApa is an open-source image recognition tool that helps you
            identify vegetables using just a picture. Whether you're learning
            about local produce or need quick information, SayurApa makes it
            simple and accessible.
          </p>
          <Link
            href={imageIdentifierPath()}
            className={`${buttonVariants({
              variant: "default",
              size: "lg",
            })} mt-6 inline-block`}
          >
            Try It Now
          </Link>
        </div>
        <div>
          <Image
            src="/images/overall.png"
            alt="Vegetable Scan"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-10">
          How SayurApa Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              image: "/images/guide_1.png",
              title: "Upload an Image",
              description:
                "Choose or capture an image of a vegetable you want to identify.",
            },
            {
              image: "/images/guide_2.png",
              title: "AI Analyzes It",
              description:
                "Our model compares the image to a trained dataset of vegetables.",
            },
            {
              image: "/images/guide_3.png",
              title: "View Results",
              description:
                "Get the name of the vegetable with a confidence score instantly.",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                className="mx-auto mb-4 rounded-md"
              />
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 dark:bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          About SayurApa
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
          SayurApa was created by a passionate developer as part of{" "}
          <strong>#GodamSahur – Hackathon Maya Sepanjang Ramadan 2025</strong>.
          The project aims to help users recognize local vegetables with ease,
          whether for learning, cooking, or curiosity.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mt-4">
          Built with open-source tools and powered by AI, SayurApa invites the
          community to contribute and help improve the model, creating a smarter
          and more inclusive platform for everyone.
        </p>
      </section>

      {/* Future Plans */}
      <section className="p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          What’s Next for SayurApa?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
          We plan to expand SayurApa with exciting new features:
        </p>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300 mt-4 space-y-2 max-w-3xl mx-auto">
          <li>Text-based vegetable search using local names</li>
          <li>
            Educational info on each vegetable’s origin, use, and nutrition
          </li>
          <li>Gamification features for learning and contribution</li>
          <li>Mobile app version for offline identification</li>
        </ul>
      </section>
    </main>
  );
}
