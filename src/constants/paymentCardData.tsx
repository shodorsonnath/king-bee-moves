import Sealcheck from "@/assets/paymentDashboardIcon/SealCheck.svg";
import spinner from "@/assets/paymentDashboardIcon/SpinnerGap.svg";
import warnning from "@/assets/paymentDashboardIcon/WarningOctagon.svg";

export const PaymentCardData = [
  {
    title: "Completed Payment",
    value: 28612,
    icon: Sealcheck,
    invoice: 350,
    change: +2.86,
  },
  {
    title: "Pending Payments",
    value: 3867,
    icon: spinner,
    invoice: 350,
    change: +1.73,
  },
  {
    title: "Driver Payouts",
    value: 214,
    icon: warnning,
    invoice: 350,
    change: +58,
  },
  {
    title: "App Earnings",
    value: 89,
    icon: warnning,
    invoice: 350,
    change: -2.86,
  },
];
