import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionCellProps {
  id: string;
}

export function ActionCell({ id }: ActionCellProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Course",
    "Are you sure you want to delete this course? This cannot be undone."
  );
  const router = useRouter();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    console.log("deleting");
    setIsLoading(true);
    try {
      await axios.delete(`/api/courses/${id}`);
      toast.success("Course deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <div className="flex items-center justify-end gap-x-2 w-full">
        <Link href={`/teacher/courses/${id}`}>
          <Hint label="Edit course">
            <Button variant="ghost">
              <Pencil className="h-4 w-4" />
            </Button>
          </Hint>
        </Link>
        <Hint label="Delete course">
          <Button variant="ghost" onClick={onDelete} title="Delete course" disabled={isLoading}>
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
        </Hint>
      </div>
    </>
  );
}
