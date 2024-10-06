import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  };
  return (
    <div className="flex items-center gap-2 text-black-purple">
      Hello, <span className="font-bold">{user.name}</span>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
    </div>
  );
};
export default Profile;
