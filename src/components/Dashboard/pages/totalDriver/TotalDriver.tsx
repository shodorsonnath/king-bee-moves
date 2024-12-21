/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TablePagination from "@/components/ui/tables/TablePagination";
import TotalDriverTable from "@/components/ui/tables/TotalDriverTable";
import { driverData, driverTableHeaders } from "@/constants/totalDriverData";
import { useState } from "react";

export default function TotalDriver() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(driverData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = driverData.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="relative mt-8 ">
      <div className="overflow-x-hidden-hidden overflow-x-auto">
        <TotalDriverTable
          tableHeader={driverTableHeaders}
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
