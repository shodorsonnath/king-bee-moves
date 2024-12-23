/* eslint-disable @typescript-eslint/no-explicit-any */
import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import downgraph from '../../../../../assets/downgraph.png'
import upgraph from '../../../../../assets/upgraph.png'

interface MetricCardProps {
    title: string;
    value: number;
    icon: LucideIcon | string | any;
    change: number;
    color: "blue";
}

export function MetricCard({
    title,
    value,
    icon: Icon,
    change,
}: MetricCardProps) {


    return (
        <Card>
            <CardContent className="pt-6 text-text_color">
                <div >
                    {/* first card */}
                    <div className=" mb-4 gap-3">
                        {/* card icon */}
                        <div className="flex items-center gap-4 mb-3">
                            <div className={`p-2 rounded-md bg-[#ECF5FA]`}>
                                <Image src={Icon} alt="icon" className="w-5 h-5" />
                            </div>
                            <p className="text-base lg:text-lg font-medium">{title}</p>
                        </div>

                        <div className="flex justify-between items-end">
                            {/* value text*/}
                            <div className="space-y-3">
                                <h2 className="text-xl lg:text-2xl font-extrabold text-heading_color">
                                    {value.toLocaleString()}
                                </h2>
                                <div className="space-y-2 mt-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center">
                                            <span
                                                className={`text-[12px] font-medium px-2 rounded-md text-[#1F3045] ${change >= 0 ? "bg-[#C4E6F8]" : "bg-red-100"
                                                    }`}
                                            >
                                                {change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                {change >= 0 ? " +" : " "}
                                                {change}%

                                            </span>
                                        </div>
                                        <p className="text-sm mt-1">from last month</p>
                                    </div>
                                </div>
                            </div>
                            {/* graph card */}

                            <div>
                                {change >= 0 ? <Image src={upgraph} alt="upgraph" className="w-40 h-20" /> : <Image src={downgraph} alt="downgraph" className="w-40 h-20" />}

                            </div>

                        </div>


                    </div>


                </div>
            </CardContent>
        </Card>
    );
}
