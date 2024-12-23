/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BookingListTable from "@/components/ui/tables/BookingListTable";
import TablePagination from "@/components/ui/tables/TablePagination";
import {
  bookingData,
  bookingListTableHeaders,
} from "@/constants/vehicleLiveData";
import { useState } from "react";

import { MetricCard } from "../../components/cards/bookingCard/BookingCard";
import { bookingCardData } from "@/constants/bookingCard";

export default function BookingList() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(bookingData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = bookingData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div className="relative">
      <div className="overflow-x-hidden-hidden overflow-x-auto">

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
          {bookingCardData.map((metric, index) => (
            <MetricCard color={"blue"} key={index} {...metric} />
          ))}
        </div>


        <BookingListTable
          tableHeader={bookingListTableHeaders}
          tableData={paginatedData}
        />
        
      </div>
      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
