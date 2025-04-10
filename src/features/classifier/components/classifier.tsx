"use client";

import { useState } from "react";
import { toast } from "sonner"; // Import Sonner for notifications

import { Vegetable } from "../types";
import Description from "./description";
import ImageUpload from "./image-upload";
import { Spinner } from "@/components/spinner";

export default function Classifier() {
  const [showModal, setShowModal] = useState(false);
  const [vegetable, setVegetable] = useState<Vegetable | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // Assuming the result has a 'label' field for the classification
      if (data && data[0]) {
        console.log(data);
        const predictedLabel = data[0]; // Adjust based on the actual response format
        setVegetable(predictedLabel);
        setShowModal(true); // Show modal with the result
      } else {
        toast.error("No vegetable identified. Please try again!"); // Toast error message
      }
    } catch (error) {
      console.error("Error during image classification:", error);
      toast.error("An error occurred during classification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex justify-center items-center w-full h-screen bg-gray-600 opacity-20">
        <Spinner size="lg" />
      </main>
    );
  }

  return (
    <main className="min-h-[90vh] flex justify-center items-center">
      <ImageUpload onSubmitImage={handleImageUpload} />

      <Description
        open={showModal}
        setOpen={setShowModal}
        vegetable={vegetable}
      />
    </main>
  );
}
