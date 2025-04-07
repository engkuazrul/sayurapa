"use client";

import ImageUpload from "./image-upload";
import Description from "./description";
import { useState } from "react";
import { Spinner } from "@/components/spinner";

type ClassifierProps = {};

export default function Classifier({}: ClassifierProps) {
  const [showModal, setShowModal] = useState(false);
  const [vegetable, setVegetable] = useState("");
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
        const predictedLabel = data[0].label; // Adjust based on the actual response format
        setVegetable(predictedLabel);
        setShowModal(true); // Show modal with the result
      }
    } catch (error) {
      console.error("Error during image classification:", error);
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
    <main className="container flex justify-center items-center h-screen">
      <ImageUpload onSubmitImage={handleImageUpload} />

      <Description
        open={showModal}
        setOpen={setShowModal}
        vegetable={vegetable}
      />
    </main>
  );
}
