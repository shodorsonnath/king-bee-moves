/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { metricsData } from "@/constants/cardData";
import { MetricCard } from "../../components/cards/metricCard/MetricCard";
import {
  monthlyData,
  quarterlyData,
  yearlyData,
} from "@/constants/bookingData";
import { useState } from "react";
import { PurchaseHistoryChart } from "../../components/charts/PurchaseHistoryChart";
import {
  purchaseMonthlyData,
  purchaseQuarterlyData,
  purchaseYearlyData,
} from "@/constants/purchaseHistoryData";
import CompletedTrip from "../../components/completedTrip/CompletedTrip";


export default function Dashboard() {
  const [data, setData] = useState(monthlyData);
  const [filter, setFilter] = useState("Monthly"); // Default filter
  const [pdata, setPdata] = useState(purchaseMonthlyData);

  const handleFilterChange = (filter: string) => {
    if (filter === "Monthly") {
      setData(monthlyData);
    } else if (filter === "Quarterly") {
      setData(quarterlyData);
    } else if (filter === "Yearly") {
      setData(yearlyData);
    }
  };

  const handlePurchaseFilterChange = (newFilter: string) => {
    setFilter(newFilter);

    // Update data based on filter
    switch (newFilter) {
      case "Monthly":
        setPdata(purchaseMonthlyData);
        break;
      case "Quarterly":
        setPdata(purchaseQuarterlyData);
        break;
      case "Yearly":
        setPdata(purchaseYearlyData);
        break;
      default:
        setPdata(purchaseMonthlyData);
    }
  };

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metricsData.map((metric, index) => (
          <MetricCard  color={"blue"} key={index} {...metric} />
        ))}
      </div>
      <div className="gap-5 mt-8">
        <div className=" col-span-4 lg:col-span-3 gap-5">
          
          <div className="mt-5 w-full">
            <PurchaseHistoryChart
              heading="Purchase History"
              data={pdata}
              filters={["Monthly", "Quarterly", "Yearly"]}
              onFilterChange={handlePurchaseFilterChange}
            />
          </div>
          <div className="mt-7 w-full">
            <CompletedTrip></CompletedTrip>
          </div>
        </div>
      </div>
    </div>
  );
}
