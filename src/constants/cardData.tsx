import Car from "@/assets/car.png";
import earth from "@/assets/earth.png";
import coin from "@/assets/coin.png";
import check from "@/assets/chech.png";


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
