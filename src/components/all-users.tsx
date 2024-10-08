"use client";
import { DataTable } from "@/app/dashboard/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { columns, UsersType } from "@/app/dashboard/columns";
import { useGetUsers } from "@/hooks/api/use-get-users";
import { Loader2, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const AllUsers = () => {
  const { data: users, isLoading: isUsersLoading } = useGetUsers();
  const router = useRouter();

  const userData = users?.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  });

  console.log(userData);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>All Users</CardTitle>
          <Button onClick={() => router.push("/")}>
            <PlusIcon className="size-4 mr-2" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isUsersLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="size-8 animate-spin" />
          </div>
        ) : (
          <DataTable data={userData!} columns={columns} />
        )}
      </CardContent>
    </Card>
  );
};
