/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PaymentCard } from "../../components/cards/paymentCard/PaymentCard";
import { PaymentCardData } from "@/constants/paymentCardData";
import PaymentListTable from "@/components/ui/tables/PaymentlListTable";

export default function PaymentList() {


  return (
    <div className="relative">
      <div className="overflow-x-hidden-hidden overflow-x-auto">

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-4">
          {PaymentCardData.map((metric, index) => (
            <PaymentCard color={"blue"} key={index} {...metric} />
          ))}
        </div>

        <PaymentListTable />

      </div>

    </div>
  );
}
