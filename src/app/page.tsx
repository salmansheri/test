import { CreateUserForm } from "@/components/forms/create-user-form";
import Image from "next/image";
import BoyImage from "@/assets/images/boy-removebg.png";

export default function Home() {
  console.log(process.env.DATABASE_URL);
  return (
    <div className="lg:flex min-h-screen">
      <CreateUserForm />
      <div className="relative flex-1 hidden lg:block">
        <Image src={BoyImage} alt="boy" fill className="object-cover" />
      </div>
    </div>
  );
}
