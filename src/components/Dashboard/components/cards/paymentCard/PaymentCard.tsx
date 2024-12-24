/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface PaymentCardProps {
    title: string;
    value: number;
    invoice: number;
    icon: LucideIcon | string | any;
    change: number;
    color: "blue";
}

export function PaymentCard({
    title,
    value,
    invoice,
    icon: Icon,
    change,
}: PaymentCardProps) {


    return (
        <Card>
            <CardContent className="pt-6 text-text_color">
                <div >
                    {/* first card */}
                    <div className=" mb-4 gap-3">
                        {/* card icon */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-md bg-[#1F3045]`}>
                                    <Image src={Icon} alt="icon" className="w-7 h-7" />
                                </div>
                                <p className="text-[17px] font-semibold tracking-wider text-[#4C596A]">
                                    {title.split(" ").map((word, index) => (
                                        <span key={index}>
                                            {word}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <h2 className="text-xl lg:text-2xl font-extrabold text-heading_color">
                                ${value.toLocaleString()}
                            </h2>
                        </div>
                        <div className="border border-gray-100 my-4"></div>

                        <div>
                            {/* value text*/}
                            <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between items-center">
                                <div className="bg-gray-100 px-2 rounded-md w-28 lg:w-fit text-center lg:text-start"><p className="text-sm lg:text-base font-medium text-[#1F3045]">{invoice} invoices</p></div>
                                <div className="flex gap-3">
                                    <div className="flex items-center">
                                        <span
                                            className={`text-sm font-medium px-3 flex items-center gap-1 rounded-full text-[#1F3045] ${change >= 0 ? "bg-[#C4E6F8]" : "bg-red-100"
                                                }`}
                                        >
                                            {change >= 0 ? <TrendingUp className="w-4" /> : <TrendingDown className="w-4" />}
                                            {change >= 0 ? " +" : " "}
                                            {change}%

                                        </span>
                                    </div>
                                    <p className="text-sm mt-1">from last month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
