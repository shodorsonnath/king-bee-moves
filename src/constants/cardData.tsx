import Car from "@/assets/dashboardCardIcon/Car.svg";
import earth from "@/assets/dashboardCardIcon/SteeringWheel.svg";
import coin from "@/assets/dashboardCardIcon/dollarSign.svg";
import check from "@/assets/dashboardCardIcon/CalendarCheck.svg";


export const metricsData = [
  {
    title: "Total Revenue",
    value: 28612,
    icon: coin,
    change: +2.86,
  },
  {
    title: "Total Trip",
    value: 3867,
    icon: check,
    change: +1.73,
  },
  {
    title: "Trip Request (Pending)",
    value: 214,
    icon: earth,
    change: +58,
  },
  {
    title: "Trip Confirmed",
    value: 89,
    icon: Car,
    change: -2.86,
  },
];
