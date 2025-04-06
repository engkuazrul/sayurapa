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
  loading?: boolean;
  vegetable: string;
};

const Result = ({ vegetable }: { vegetable: string }) => {
  if (!vegetable) {
    return (
      <p className="text-muted-foreground text-base">No vegetables found</p>
    );
  }

  return (
    <div>
      <p className="text-lg">{`Your vegetables is ${(
        <span className="font-semibold">{vegetable}</span>
      )}`}</p>
    </div>
  );
};

export default function Description({
  open,
  setOpen,
  loading = false,
  vegetable,
}: DescriptionProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your vegetables is here</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {loading && <Spinner size="lg" className="my-6" />}

        {!loading && <Result vegetable={vegetable} />}
      </DialogContent>
    </Dialog>
  );
}
