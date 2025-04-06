import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ImageUploadProps = {
  onSubmitImage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ImageUpload({ onSubmitImage }: ImageUploadProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Find vegetables</CardTitle>
        <CardDescription>Insert a picture to find vegetables</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitImage} className="flex flex-col gap-4">
          <Input id="picture" type="file" />

          <div className="flex justify-between mt-4">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Deploy</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
