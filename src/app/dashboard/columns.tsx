"use client";

import { UserActions } from "@/components/user-actions";
import { ColumnDef } from "@tanstack/react-table";

export type UsersType = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
};

export const columns: ColumnDef<UsersType>[] = [
  {
    id: "Name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return <div>{`${user.firstName} ${user.lastName}`}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserActions data={user} />;
    },
  },
];
