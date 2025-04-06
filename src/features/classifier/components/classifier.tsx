"use client";

import ImageUpload from "./image-upload";
import Description from "./description";
import { useState } from "react";

type ClassifierProps = {};

export default function Classifier({}: ClassifierProps) {
  const [showModal, setShowModal] = useState(false);
  const [vegetable, setVegetable] = useState("");

  const handleImageUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowModal(true);
  };

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
