'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, Search, Truck, ArrowUp, ArrowDown } from 'lucide-react';
import { Dropdown, MenuProps, Modal, Space, Table } from 'antd';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import paymentTrack from "@/assets/payment-truck.png"
import paymentMoney from "@/assets/paymentmoney.png"
import Image from "next/image"




interface Trip {
    tripId: string;
    date: string;
    pickupLocation: string;
    dropoffLocation: string;
    totalPayment: number;
    status: 'Pending' | 'Assigned' | 'Cancelled' | 'Confirmed' | 'Completed';
}

export default function BookingTable() {
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'recent' | 'history'>('recent');

    const recentTrips: Trip[] = [
        {
            tripId: '#TRP1023',
            date: 'Aug 1, 2028',
            pickupLocation: 'Boston, MA',
            dropoffLocation: 'New York, NY',
            totalPayment: 1250.00,
            status: 'Pending',
        },
        {
            tripId: '#TRP1047',
            date: 'Aug 1, 2028',
            pickupLocation: 'Los Angeles',
            dropoffLocation: 'Chicago, IL',
            totalPayment: 7258.80,
            status: 'Pending',
        },
        {
            tripId: '#TRP1095',
            date: 'Aug 2, 2028',
            pickupLocation: 'Detroit, MI',
            dropoffLocation: 'Dallas, TX',
            totalPayment: 1395.00,
            status: 'Assigned',
        },
    ];

    const historyTrips: Trip[] = [
        {
            tripId: '#TRP1023',
            date: 'Aug 1, 2028',
            pickupLocation: 'New York, NY',
            dropoffLocation: 'Boston, MA',
            totalPayment: 1250.00,
            status: 'Completed',
        },
        {
            tripId: '#TRP1047',
            date: 'Aug 1, 2028',
            pickupLocation: 'Los Angeles, CA',
            dropoffLocation: 'Chicago, IL',
            totalPayment: 758.80,
            status: 'Completed',
        },
        {
            tripId: '#TRP1095',
            date: 'Aug 2, 2028',
            pickupLocation: 'Detroit, MI',
            dropoffLocation: 'Dallas, TX',
            totalPayment: 1395.00,
            status: 'Completed',
        },
        {
            tripId: '#TRP1123',
            date: 'Aug 2, 2028',
            pickupLocation: 'Austin, TX',
            dropoffLocation: 'Miami, FL',
            totalPayment: 5587.36,
            status: 'Completed',
        },
        {
            tripId: '#TRP1168',
            date: 'Aug 3, 2028',
            pickupLocation: 'Orlando, FL',
            dropoffLocation: 'Seattle, WA',
            totalPayment: 1250.00,
            status: 'Completed',
        },
        {
            tripId: '#TRP1199',
            date: 'Aug 3, 2028',
            pickupLocation: 'Atlanta, GA',
            dropoffLocation: 'Denver, CO',
            totalPayment: 1250.00,
            status: 'Completed',
        },
        {
            tripId: '#TRP1250',
            date: 'Aug 3, 2028',
            pickupLocation: 'Denver, CO',
            dropoffLocation: 'Atlanta, GA',
            totalPayment: 1250.00,
            status: 'Completed',
        },
    ];

    const showDetails = (trip: Trip) => {
        setSelectedTrip(trip);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTrip(null);
    };

    const items: MenuProps['items'] = [
        {
            key: 'recent',
            label: 'Recent Trip',
        },
        {
            key: 'history',
            label: 'Trip History',
        },
    ];

    const handleMenuClick = (key: string) => {
        setViewMode(key as 'recent' | 'history');
    };

    const columns = [
        {
            title: <span className="text-gray-400">Trip ID</span>,
            dataIndex: 'tripId',
            key: 'tripId',
            sorter: (a: Trip, b: Trip) => a.tripId.localeCompare(b.tripId),
        },
        {
            title: <span className="text-gray-400">Trip Date</span>,
            dataIndex: 'date',
            key: 'date',
            sorter: (a: Trip, b: Trip) => a.date.localeCompare(b.date),
        },
        {
            title: <span className="text-gray-400">Pickup Location</span>,
            dataIndex: 'pickupLocation',
            key: 'pickupLocation',
            sorter: (a: Trip, b: Trip) => a.pickupLocation.localeCompare(b.pickupLocation),
        },
        {
            title: <span className="text-gray-400">Dropoff Location</span>,
            dataIndex: 'dropoffLocation',
            key: 'dropoffLocation',
            sorter: (a: Trip, b: Trip) => a.dropoffLocation.localeCompare(b.dropoffLocation),
        },
        {
            title: <span className="text-gray-400">Total Payment</span>,
            dataIndex: 'totalPayment',
            key: 'totalPayment',
            render: (payment: number) => `$${payment.toFixed(2)}`,
            sorter: (a: Trip, b: Trip) => a.totalPayment - b.totalPayment,
        },
        {
            title: <span className="text-gray-400">Status</span>,
            key: 'status',
            dataIndex: 'status',
            render: (status: Trip['status']) => (
                <span
                    className={`px-3 py-1 text-white rounded-md inline-block text-center ${status === 'Completed' ? 'bg-[#001F54]' :
                        status === 'Assigned' ? 'bg-[#001F54]' :
                            status === 'Pending' ? 'bg-[#FF6F00]' :
                                status === 'Cancelled' ? 'bg-red-500' :
                                    'bg-green-500'
                        }`}
                >
                    {status}
                </span>
            ),
        },
        {
            title: <span className="text-gray-400">Action</span>,
            key: 'action',
            render: (_: unknown, record: Trip) => (
                <Button
                    variant="link"
                    className="p-0 h-auto font-normal text-blue-500"
                    onClick={() => showDetails(record)}
                >
                    View Details
                </Button>
            ),
        },
    ];

    return (
        <Card className="w-full -mt-2">
            <CardContent>
                <div className="w-full">
                    <div className="flex flex-col lg:flex-row justify-between items-start sm:items-center gap-4 mt-3">
                        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2">
                            <div className="text-xl font-bold text-neutral-700 -ml-5">
                                {viewMode === 'recent' ? 'Requested Trip' : 'Trip History'}
                            </div>
                            <div className="mb-6 flex items-center gap-4 flex-wrap">
                                <div className="relative flex-1 max-w-full md:max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 text-gray-500" />
                                    <input
                                        className="pl-9 pr-4 py-2 w-full border rounded-md"
                                        placeholder="Search Booking ID"
                                        type="search"
                                    />
                                </div>
                                <Button variant="outline" className="w-full md:w-auto">
                                    <Dropdown
                                        menu={{
                                            items,
                                            onClick: ({ key }) => handleMenuClick(key)
                                        }}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space className='flex items-center justify-center'>
                                                <Filter className='text-gray-500' />
                                                <span className='text-gray-500 font-medium'>
                                                    {viewMode === 'recent' ? 'Recent Trip' : 'Trip History'}
                                                </span>
                                                <ChevronDown className='text-gray-500' />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </Button>
                            </div>
                        </CardHeader>
                    </div>
                    <div className="flex flex-col md:flex-row -mt-4">
                        <div className="p-6 flex-1">
                            <div className="rounded-md border overflow-x-auto">
                                <Table
                                    columns={columns}
                                    dataSource={
                                        viewMode === 'recent'
                                            ? recentTrips.map(trip => ({ ...trip, key: trip.tripId }))
                                            : historyTrips.map(trip => ({ ...trip, key: trip.tripId }))
                                    }
                                    pagination={{ pageSize: 5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            {selectedTrip && (
                <Modal
                    open={isModalOpen}
                    onCancel={closeModal}
                    footer={[
                        <Button key="close" onClick={closeModal}>
                            Close
                        </Button>,
                    ]}
                    width={1000}
                >
                    <div>
                        <div className="mx-auto p-4">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Trip Details Section */}
                                <div className='md:border-r lg:border-r pr-5 border-gray-200'>
                                    <p className="text-lg font-bold mb-6">
                                        Trip Details
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded-md">
                                                <Truck className="w-6 h-6 lg:w-10 lg:h-10" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-base lg:text-lg">Box Trucks (Light)</h3>
                                            </div>
                                        </div>
                                        <div className="border"></div>

                                        <div>
                                            <h3 className="font-medium text-base lg:text-lg">Box Trucks (Light)</h3>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    12 December, 06 AM
                                                </div>
                                                <div className="mt-5 space-y-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                                                            <ArrowUp strokeWidth={3} className="w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-base">Caltrain Station</div>
                                                            <div className="text-sm text-muted-foreground">San Francisco, California, USA</div>
                                                        </div>
                                                    </div>
                                                    <div className="border border-[#9CA3AF] rotate-90 relative z-1 opacity-30 right-7 w-20"></div>
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                                                            <ArrowDown strokeWidth={3} className="w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-base">California Science Center</div>
                                                            <div className="text-sm text-muted-foreground">Los Angeles, California, USA</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border border-gray-100"></div>

                                            <div className="flex flex-col gap-3">
                                                <span className="border border-gray-400 px-3 py-1 w-fit rounded-full text-sm text-gray-600 mt-4">
                                                    Home Shifting / Office Shifting
                                                </span>
                                                <span className="bg-gray-100 px-4 py-2 w-fit rounded-md text-sm flex items-center gap-2">
                                                    <Image src={paymentTrack} alt="Truck" width={20} height={20}></Image>
                                                    Up Down Trip
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between pt-4">
                                                <div className="font-medium flex text-lg items-center gap-3">
                                                    <Image src={paymentMoney} alt="Truck" width={20} height={20}></Image>
                                                    Price
                                                </div>
                                                <div className="text-xl font-bold text-[#001F54]">$1500</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Driver application section */}
                                <div>
                                    <p className="text-lg font-bold mb-5">
                                        Driver Application
                                    </p>

                                    {/* Driver Table */}
                                    <div className="rounded-md border overflow-x-auto">
                                        <Table
                                            columns={[
                                                {
                                                    title: <span className="text-sm text-[#433333]">Driver ID</span>,
                                                    dataIndex: 'driverId',
                                                    key: 'driverId',
                                                },
                                                {
                                                    title: <span className="text-sm text-[#433333]">Distance to Pick-Up</span>,
                                                    dataIndex: 'distance',
                                                    key: 'distance',
                                                },
                                                {
                                                    title: <span className="text-sm text-[#433333]">Status</span>,
                                                    key: 'status',

                                                },
                                            ]}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </Card>
    );
}

