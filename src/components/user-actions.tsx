import { EditIcon, Loader2, MoreHorizontal, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { UsersType } from "@/app/dashboard/columns";
import { useDeleteUser } from "@/hooks/api/user-delete-user";
interface UserActionsProps {
  data: UsersType;
}
export const UserActions = ({ data }: UserActionsProps) => {
  const router = useRouter();
  const { mutate: deleteUser, isPending: isDeleteUserLoading } =
    useDeleteUser();

  if (isDeleteUserLoading) {
    return <Loader2 className="size-4 animate-spin" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/edit/${data.id}`)}
        >
          <EditIcon className="size-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-red-500 border" />
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => deleteUser({ id: data.id })}
        >
          <TrashIcon className="size-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
