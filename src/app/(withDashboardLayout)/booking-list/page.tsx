import BookingList from "@/components/Dashboard/pages/bookingList/BookingList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking list",
};

export default function Page() {
  return (
    <div className="dashboard-containers relative min-h-screen">
      <BookingList />
    </div>
  );
}
