"use client";

import { useState } from "react";
import Image from "next/image";
import { Veggies } from "@prisma/client"; // Assuming you're using Prisma
import { toast } from "sonner";

import { getVeggies } from "./actions/get-veggies";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Vegetable Grid Item Component
const VeggieItem = ({ vegetable }: { vegetable: Veggies }) => {
  return (
    <Card className="p-4 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-200 w-full md:w-[400px]">
      <CardHeader>
        <div className="relative w-full h-40 sm:h-48 lg:h-56 mb-2 rounded-md overflow-hidden z-0">
          <Image
            src={vegetable.imageUrl}
            alt={vegetable.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <CardTitle className="text-lg font-semibold text-center">{vegetable.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          {/* English Description */}
          <CardDescription className="text-sm text-gray-600 mb-2">
            <strong>English:</strong> {vegetable.desc}
          </CardDescription>

          {/* Bahasa Malaysia Description */}
          <CardDescription className="text-sm text-gray-600">
            <strong>Bahasa Malaysia:</strong> {vegetable.descBm || "No description available in BM."}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SearchVegetables() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVeggies, setFilteredVeggies] = useState<Veggies[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const query = formData.get("query") as string;

    setSearchQuery(query);
    setLoading(true);

    try {
      const veggies = await getVeggies(query);
      setFilteredVeggies(veggies);

      if (veggies.length === 0) {
        toast.error("No results found for your search.");
      }
    } catch (error) {
      console.error("Error fetching veggies:", error);
      toast.error("Error fetching vegetable data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[90vh] container flex flex-col justify-center items-center py-8 px-4 pt-[100px]">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-[80%] md:w-[50%] mb-6">
        <Input
          name="query"
          type="text"
          placeholder="Search for vegetables..."
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <Button type="submit" className="w-auto text-white bg-green-700 hover:bg-green-600 focus:ring-green-700">
          Search
        </Button>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-6">
          <Spinner size="lg" />
        </div>
      )}

      {/* No results message */}
      {!loading && filteredVeggies.length === 0 && searchQuery && (
        <p className="text-center text-lg text-gray-500">
          No results found for <span className="font-semibold">{searchQuery}</span>. Try a different search term.
        </p>
      )}

      {/* Vegetable Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredVeggies.map((vegetable) => (
          <VeggieItem key={vegetable.id} vegetable={vegetable} />
        ))}
      </div>
    </main>
  );
}
