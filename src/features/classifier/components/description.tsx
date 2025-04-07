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
      <p className="text-lg">
        {`Your vegetable is `}
        <span className="font-semibold">{vegetable}</span>
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
          <DialogTitle>Your vegetable is here</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {<Result vegetable={vegetable} />}
      </DialogContent>
    </Dialog>
  );
}
