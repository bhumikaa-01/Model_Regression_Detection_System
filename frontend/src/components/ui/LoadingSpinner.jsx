import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-10">
      <LoaderCircle
        className="animate-spin text-blue-500"
        size={35}
      />
    </div>
  );
}