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
import { useCreateUser } from "@/hooks/api/use-create-user";
import { useRouter } from "next/navigation";

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

export const CreateUserForm = () => {
  const router = useRouter();
  const { mutate: createUser, isPending: isCreateUserLoading } =
    useCreateUser();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  const onSubmit = (values: FormType) => {
    createUser(values, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };
  return (
    <div className="flex-1 flex    mt-10  items-center justify-center py-10">
      <Card className="w-[80%]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create User</CardTitle>
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
              <SubmitButton disabled={isCreateUserLoading}>Submit</SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
