'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useAppSelector } from "@/redux/hooks"
import { getTopBarTitle } from "@/utils/getTopBarTitle"
import { Bell, Menu, Search, X } from 'lucide-react'
import { usePathname } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

export default function TopBar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const user = useAppSelector(selectCurrentUser)
  const pathname = usePathname()
  const title = getTopBarTitle(pathname)

  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between px-8 py-3 w-full">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="lg:flex items-center gap-2 hidden">
          <span className="hidden sm:inline text-[22px] font-bold">
            {title}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 ">
          <Button variant="ghost" size="icon" className="hidden lg:flex bg-gray-100 hover:bg-blue-50">
            <Search className="h-5 w-5 " />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="flex bg-gray-100 hover:bg-blue-50">
                <Bell className="h-5 w-5" />
              
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <p>You have no new notifications.</p>
              </div>
            </SheetContent>
            
          </Sheet>
          {/* avater section */}
          <div className="flex items-center justify-center gap-3">
            <Avatar>
              <AvatarImage
                src={user?.profilePic || "/placeholder-avatar.png"}
                alt={user?.firstName || "User avatar"}
              />
              <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="font-semibold text-sm">{user?.firstName || "Abram Schleifer"}</p>
              <p className="text-gray-400 text-sm">{user?.role || "Admin"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

