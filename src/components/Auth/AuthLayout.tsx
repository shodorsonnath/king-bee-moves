/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import auth1 from "@/assets/logo/logo.svg";
import Image from "next/image";
import React from "react";

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid md:grid-cols-2 w-full h-screen">
      <div className="hidden h-full md:flex justify-center items-center -mt-10">
        <div className="flex flex-col justify-center items-center text-center">
          <Image src={auth1} alt="image" className="md:w-[200px] lg:w-[250px] lg:h-[120px]" />
          <h1 className="font-extrabold md:text-5xl lg:text-7xl italic text-[#001F54]">KINGBEEMOVES</h1>
        </div>
      </div>
      <div className="flex justify-center items-center h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
