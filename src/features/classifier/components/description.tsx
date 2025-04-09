import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Vegetable } from "../types";

type DescriptionProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  vegetable: Vegetable | null;
};

const Result = ({ vegetable }: { vegetable: Vegetable | null }) => {
  if (!vegetable) {
    return (
      <p className="text-muted-foreground text-base">
        Oops! We couldn’t identify any vegetable in the image. Try uploading a
        clearer photo.
      </p>
    );
  }

  return (
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
