"use client";

import { NavLink } from "@/lib/types/type";
import { TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { logoutHandler } from "@/utils/handleLogout";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logoutIcon from "@/assets/logout.png";
import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

export default function MainNavLink({
  user,
  navLink,
}: {
  user: null | TUser;
  navLink: NavLink[];
}) {
  const isIconComponent = (
    icon: IconType | StaticImageData
  ): icon is IconType => {
    return typeof icon === "function";
  };
  const pathname = usePathname();
  console.log(user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isActive = (href: any) => {
    // Remove query parameters from href for comparison
    const cleanHref = href.split("?")[0];
    const cleanPathname = pathname.split("?")[0];

    // If href is exactly `/dashboard`, match it exactly
    if (cleanHref === "/") {
      return cleanPathname === "/";
    }

    // For other routes, match using startsWith
    return cleanPathname.startsWith(cleanHref);
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutHandler(dispatch, router);
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Link href={"/"} className="p-4">
        <div className="ml-4 mt-2">
         <h1 className="text-2xl font-extrabold text-[#001F54]">Kingbeemovers</h1>
        </div>
      </Link>
      <nav className="flex-1 p-4 text-text_color">
        <div className="space-y-1">
          {navLink?.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-md font-medium ${
                isActive(link.href)
                  ? "bg-blue-50 text-[#001F54] "
                  : "hover:bg-blue-50 hover:text-[#001F54] "
              }`}
            >
              <div className="rounded">
                {isIconComponent(link.icon) ? (
                  <link.icon className="min-w-6 min-h-6" />
                ) : (
                  <Image src={link.icon} alt={link.name} className="w-6" />
                )}
              </div>
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mt-auto p-4 space-y-1">
        <div
          onClick={() => handleLogout()}
          className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-text_color`}
        >
          <Image
            src={logoutIcon}
            alt="Logout Icon"
            className="min-w-6 min-h-6"
          />
          Log Out
        </div>
      </div>
    </div>
  );
}
