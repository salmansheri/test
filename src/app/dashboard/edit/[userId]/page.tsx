import { UpdateUserForm } from "@/components/forms/user-update-form";
import db from "@/lib/db";
interface UserIdPageProps {
  params: {
    userId: string;
  };
}

export default async function UserIdPage({ params }: UserIdPageProps) {
  const { userId } = params;
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return (
    <div>
      <UpdateUserForm data={user} userId={userId} />
    </div>
  );
}
