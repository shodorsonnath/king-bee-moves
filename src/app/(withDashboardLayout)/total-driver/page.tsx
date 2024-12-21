import TotalDriver from "@/components/Dashboard/pages/totalDriver/TotalDriver";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Total Driver",
};

export default function Page() {
  return (
    <div className="dashboard-containers relative min-h-screen">
      <TotalDriver />
    </div>
  );
}
