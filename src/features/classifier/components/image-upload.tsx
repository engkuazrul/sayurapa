import { useRef, useState } from "react";
import Image from "next/image";
import { LucideTrash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ImageUploadProps = {
  onSubmitImage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ImageUpload({ onSubmitImage }: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identify a Vegetable</CardTitle>
        <CardDescription>
          Upload a photo, and we’ll try to recognize the vegetable in it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitImage} className="flex flex-col gap-4">
          <Input
            name="picture"
            type="file"
            accept="image/*"
            onChange={handleChange}
            ref={fileInputRef}
            required
          />

          {imagePreview && (
            <div className="border border-dashed border-spacing-4 rounded shadow w-full h-40 relative overflow-hidden">
              <Image
                src={imagePreview}
                alt="Uploaded preview"
                fill
                className="object-contain rounded"
                unoptimized
              />
              <Button
                className="absolute top-2 right-2"
                type="button"
                variant="destructive"
                size="icon"
                onClick={handleClearImage}
              >
                <LucideTrash />
              </Button>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Button type="submit">Analyze Image</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
