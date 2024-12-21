/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BookingListTable from "@/components/ui/tables/BookingListTable";
import TablePagination from "@/components/ui/tables/TablePagination";
import {
  bookingData,
  bookingListTableHeaders,
} from "@/constants/vehicleLiveData";
import { useState } from "react";

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
    <div className="relative mt-8 ">
      <div className="overflow-x-hidden-hidden overflow-x-auto">
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
