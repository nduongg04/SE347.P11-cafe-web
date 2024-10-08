import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { staff } from "@/constants";

const Profile = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex cursor-pointer items-center gap-2 text-black-purple">
                    Hello,{" "}
                    <span className="font-semibold">{staff.staffName}</span>
                    <div className="rounded-full bg-white p-1">
                        <Avatar>
                            <AvatarImage
                                src={staff.avatar}
                                alt={staff.staffName}
                            />
                            <AvatarFallback>...</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default Profile;
