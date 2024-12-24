import PaymentList from "@/components/Dashboard/pages/Payment/PaymentList";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicles Track list",
};

export default function Page() {
  return (
    <div className="dashboard-containers relative min-h-screen">
      <PaymentList />
    </div>
  );
}
