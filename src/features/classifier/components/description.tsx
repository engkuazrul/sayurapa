import { useEffect, useState } from "react";
import Image from "next/image";
import { Veggies } from "@prisma/client";

import { getVeggie } from "../actions/get-veggie";
import { Vegetable } from "../types";
import { Spinner } from "@/components/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DescriptionProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  vegetable: Vegetable | null;
};

const Result = ({ vegetable }: { vegetable: Vegetable | null }) => {
  const [vegetableDetails, setVegetableDetails] = useState<Veggies | null>(
    null
  );
  const [infoLoading, setInfoLoading] = useState(false);

  useEffect(() => {
    setInfoLoading(true);
    const fetchVeggie = async () => {
      if (vegetable) {
        const veggie = await getVeggie(vegetable.label.toLowerCase().trim());
        setVegetableDetails(veggie);
        setInfoLoading(false);
      } else {
        setInfoLoading(false);
      }
    };

    fetchVeggie();

    return () => {
      setVegetableDetails(null);
      setInfoLoading(false);
    };
  }, [vegetable]);

  if (infoLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!vegetable) {
    return (
      <p className="text-muted-foreground text-base">
        Oops! We couldn’t identify any vegetable in the image. Try uploading a
        clearer photo.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-base">
        <p>
          We’ve recognized the vegetable as{" "}
          <span className="text-green-600 font-semibold uppercase">
            {vegetable.label}
          </span>
          .
        </p>
        <p className="mt-1">
          Confidence level:{" "}
          <span className="font-medium text-green-500">
            {Math.round(vegetable.score * 100)}%
          </span>
        </p>
      </div>

      {vegetableDetails && (
        <div className="space-y-4 mt-4">
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={vegetableDetails.imageUrl}
              alt={vegetableDetails.name}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg text-green-700 capitalize">
              {vegetableDetails.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {vegetableDetails.desc}
            </p>
          </div>

          {vegetableDetails.nameBm && (
            <div>
              <h3 className="font-semibold text-lg text-green-700 capitalize">
                {vegetableDetails.nameBm} (BM)
              </h3>
              <p className="text-sm text-muted-foreground">
                {vegetableDetails.descBm}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function Description({
  open,
  setOpen,
  vegetable,
}: DescriptionProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            🥬 Identification Result
          </DialogTitle>
          <DialogDescription>
            Here’s what we found based on the image you uploaded:
          </DialogDescription>
        </DialogHeader>

        <Result vegetable={vegetable} />
      </DialogContent>
    </Dialog>
  );
}
