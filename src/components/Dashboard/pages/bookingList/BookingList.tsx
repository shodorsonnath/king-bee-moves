/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingTable from "@/components/ui/tables/BookingTable";
import { BookingCard } from "../../components/cards/bookingCard/BookingCard";
import { bookingCardData } from "@/constants/bookingCard";

export default function BookingList() {

 
  return (
    <div className="relative">
      <div className="overflow-x-hidden-hidden overflow-x-auto">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
          {bookingCardData.map((metric, index) => (
            <BookingCard color={"blue"} key={index} {...metric} />
          ))}
        </div>
      </div>

      <BookingTable></BookingTable>
     
    </div>
  );
}
