"use client";

import TopBar from "@/components/Dashboard/components/navigationBar/TopBar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "./components/navigationBar/SiderBar";
import payment from "@/assets/NavIcons/payment.svg"
import driver from "@/assets/NavIcons/drivers.svg"
import booking from "@/assets/NavIcons/Check.svg"
import dashboardicon from "@/assets/NavIcons/dashboard.svg"


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  const navLink = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: dashboardicon,
    },
    {
      name: "Booking",
      href: "/booking-list",
      icon: booking ,
    },
    {
      name: "Drives",
      href: "/total-driver",
      icon: driver,
    },

    {
      name: "Payments",
      href: "/payment",
      icon: payment,
    },

  ];

  return (
    <div className="flex">
      <div className="max-h-screen h-full sticky top-0 z-50">
        <SideBar
          navLink={navLink}
          isOpen={isOpen}
          user={user}
          navRef={navRef}
        />
      </div>
      <div className="w-full">
        <div className="sticky top-0 z-40">
          <TopBar setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div className="bg-[#F6F6F6] min-h-screen"> {children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
