'use client'

import { CheckCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, Table } from 'antd'
import type { TableProps } from 'antd'
import { useState } from 'react'
import { TripData, tripData } from '@/constants/completedTrip'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const columns: TableProps<TripData>['columns'] = [
    {
        title: 'Trip ID',
        dataIndex: 'tripId',
        key: 'tripId',
        sorter: (a, b) => a.tripId.localeCompare(b.tripId),
    },
    {
        title: 'Trip Date',
        dataIndex: 'tripDate',
        key: 'tripDate',
        sorter: (a, b) => new Date(a.tripDate).getTime() - new Date(b.tripDate).getTime(),
    },
    {
        title: 'Pickup Location',
        dataIndex: 'pickupLocation',
        key: 'pickupLocation',
        sorter: (a, b) => a.pickupLocation.localeCompare(b.pickupLocation),
    },
    {
        title: 'Dropoff Location',
        dataIndex: 'dropoffLocation',
        key: 'dropoffLocation',
        sorter: (a, b) => a.dropoffLocation.localeCompare(b.dropoffLocation),
    },
    {
        title: 'Total Payment',
        dataIndex: 'totalPayment',
        key: 'totalPayment',
        sorter: (a, b) => a.totalPayment - b.totalPayment,
        render: (value) => `$${value.toFixed(2)}`,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: () => (
            <span className="px-3 py-1 text-sm text-[#C4E6F8] bg-slate-600 rounded-md">
                <CheckCircleOutlined className='w-3 mr-1' />Completed
            </span>
        ),
    },
]

export default function CompletedTrip() {
    const [searchText, setSearchText] = useState('')

    const filteredData = tripData.filter((item) =>
        Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    )

    return (
       
            <Card className="w-full">
                <CardContent>
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row justify-between items-start sm:items-center mb-6 gap-4 mt-3">
                            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2">
                                <div className="text-xl font-bold text-neutral-700 -ml-5">
                                    Completed Trip
                                </div>
                            </CardHeader>
                            <Input
                                placeholder="Search client name, ID, etc"
                                prefix={<SearchOutlined className="text-gray-400" />}
                                className="w-full bg-gray-100"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="overflow-x-auto lg:-mt-4">
                            <Table
                                columns={columns}
                                dataSource={filteredData}
                                pagination={false}
                                className="bg-white rounded-lg shadow"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
    )
}
