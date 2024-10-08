"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ModeToggle } from "../ui/mode-toggle";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SubmitButton } from "../ui/submit-button";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

import { User } from "@prisma/client";
import { useUpdateUser } from "@/hooks/api/user-update-user";

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First Name must be atleast three letters " }),

  lastName: z
    .string()
    .min(3, { message: "Last Name must be atleast three letters " }),
  phoneNumber: z.string(),
  email: z.string().email(),
  address: z.string(),
});

type FormType = z.infer<typeof formSchema>;

interface UpdateUserFormProps {
  userId: string;
  data: User;
}

export const UpdateUserForm = ({ data, userId }: UpdateUserFormProps) => {
  const router = useRouter();
  const { mutate: updateUser, isPending: isUpdateUserLoading } =
    useUpdateUser(userId);

  const initialData = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    phoneNumber: data?.phoneNumber,
    email: data?.email,
    address: data?.address,
  };
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      phoneNumber: initialData.phoneNumber,
      email: initialData.email,
      address: initialData.address,
    },
  });

  const onSubmit = (values: FormType) => {
    console.log("values:", values);
    // @ts-ignore
    updateUser(values, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };
  return (
    <div className="flex-1 flex    mt-10  items-center justify-center">
      <Card className="w-[80%]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Update User</CardTitle>
            <ModeToggle />
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: John " {...field} />
                    </FormControl>
                    <FormDescription>Enter your First Name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: Doe" {...field} />
                    </FormControl>
                    <FormDescription>Enter your First Name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: johndoe@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Enter your Email </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: 9998338383" {...field} />
                    </FormControl>
                    <FormDescription>Enter your Phone Number </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Eg: 14th Street, New York"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your Address </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton disabled={isUpdateUserLoading}>Submit</SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
