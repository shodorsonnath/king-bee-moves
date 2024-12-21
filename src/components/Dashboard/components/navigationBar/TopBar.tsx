import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { selectCurrentUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { getTopBarTitle } from "@/utils/getTopBarTitle";
import { Bell, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function TopBar({
  isOpen,
  setIsOpen,
}: {
  user: null | TUser;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //   const { data: user } = useUserDataQuery(undefined);
  const user = useAppSelector(selectCurrentUser);
  const pathname = usePathname();
  const title = getTopBarTitle(pathname);

  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between px-8 py-3 w-full">
        <button className="lg:hidden " onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>

        <div className="lg:flex items-center gap-2 hidden">
          <span className="hidden sm:inline text-[22px] font-bold">
            {title}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* search icon */}
          <div className="bg-zinc-100 w-10 h-10 rounded-lg lg:flex flex-col justify-center items-center hidden">
            <Search />
          </div>

          {/* bell icon */}
          <div className="bg-zinc-100 w-10 h-10 rounded-lg lg:flex flex-col justify-center items-center hidden">
            <Bell />
          </div>
          
          {/* avatar image */}
          <div className="flex items-center justify-center gap-3">
            {/* avatar image */}
            <div>
              <Avatar className=" object-contain">
                <AvatarImage
                  className=" object-cover"
                  src={user?.profilePic || "/placeholder-avatar.png"}
                  alt={user?.firstName || "User avatar"}
                />
                <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </div>
            {/* avater image person information */}
            <div className="hidden lg:block md:block">
              <p className="font-semibold text-sm">Abram Schleifer</p>
              <p className="text-text_color text-sm">Admin</p>
            </div>
          </div>










        </div>
      </div>
    </header>
  );
}
