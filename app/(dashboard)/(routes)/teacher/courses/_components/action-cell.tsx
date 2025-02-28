import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ActionCellProps {
  id: string;
}

export function ActionCell({ id }: ActionCellProps) {
  const [isLoading, setIsLoading] = useState();
  const onDelete = async () => {
    /*setIsLoading(true);
        try {
          await axios.delete(`/api/courses/${courseId}`);
          toast.success("Course deleted");
          router.refresh();
          router.push(`/teacher/courses`);
        } catch {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }*/
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-4 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/teacher/courses/${id}`} className="flex items-center gap-x-2 w-full">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Button variant="ghost" onClick={onDelete}>
              <Trash className="h-4 w-4 mr-2" />
              <span>Delete</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
