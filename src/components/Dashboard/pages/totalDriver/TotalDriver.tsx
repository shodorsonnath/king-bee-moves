'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, X } from 'lucide-react';
import { Table } from 'antd';

interface Driver {
  id: string;
  name: string;
  driverId: string;
  phone: string;
  email: string;
  avatar: string;
  status: string;
  documents: {
    nationalId: string;
    license: string;
  };
}

export default function DriverList() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const drivers: Driver[] = [
    {
      id: '1',
      name: 'John Adams',
      driverId: '#D-10001',
      phone: '111-222-3333',
      email: 'john.adams@example.com',
      avatar: '/placeholder.svg',
      status: 'Verified',
      documents: {
        nationalId: '/placeholder.svg',
        license: '/placeholder.svg',
      },
    },
    {
      id: '2',
      name: 'Emily Brown',
      driverId: '#D-10002',
      phone: '222-333-4444',
      email: 'emily.brown@example.com',
      avatar: '/placeholder.svg',
      status: 'Pending',
      documents: {
        nationalId: '/placeholder.svg',
        license: '/placeholder.svg',
      },
    },
    {
      id: '3',
      name: 'Michael Clark',
      driverId: '#D-10003',
      phone: '333-444-5555',
      email: 'michael.clark@example.com',
      avatar: '/placeholder.svg',
      status: 'Processing',
      documents: {
        nationalId: '/placeholder.svg',
        license: '/placeholder.svg',
      },
    },
  ];

  const columns = [
    {
      title: <span className="text-gray-400">Name</span>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Driver, b: Driver) => a.name.localeCompare(b.name),
      render: (text: string, record: Driver) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={record.avatar} />
            <AvatarFallback>{record.name[0]}</AvatarFallback>
          </Avatar>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-400">Driver ID</span>,
      dataIndex: 'driverId',
      key: 'driverId',
      sorter: (a: Driver, b: Driver) => a.driverId.localeCompare(b.driverId),
    },
    {
      title: <span className="text-gray-400">Phone No.</span>,
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a: Driver, b: Driver) => a.phone.localeCompare(b.phone),
    },
    {
      title: <span className="text-gray-400">Status</span>,
      key: 'status',
      render: (text: string, record: Driver) => (
        <span
          className={`px-2 py-1 rounded-md text-white ${
            record.status === 'Verified'
              ? 'bg-[#001F54]'
              : record.status === 'Pending'
              ? 'bg-[#FF6F00]'
              : 'bg-[#228B22]'
          }`}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: <span className="text-gray-400">Driver Details</span>,
      key: 'details',
      render: (text: string, record: Driver) => (
        <Button
          variant="link"
          className="p-0 h-auto font-normal"
          onClick={() => setSelectedDriver(selectedDriver?.id === record.id ? null : record)}
        >
          {selectedDriver?.id === record.id ? 'Hide Details' : 'View Details'}
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 flex-1">
        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              className="pl-9 pr-4 py-2 w-full border rounded-md"
              placeholder="Search for driver"
              type="search"
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto">Verified Driver</Button>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table
            columns={columns}
            dataSource={drivers.map(driver => ({ ...driver, key: driver.id }))}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

      {selectedDriver && (
        <div
          className={`p-6 bg-white transition-all ${
            selectedDriver ? 'block' : 'hidden'
          } ${
            'fixed md:relative bottom-0 w-full md:w-[400px]'
          }`}
        >
          <div className="space-y-6 relative -mt-5">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-red-500"
              onClick={() => setSelectedDriver(null)}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Driver Information */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedDriver.avatar} />
                <AvatarFallback>{selectedDriver.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl font-semibold">{selectedDriver.name}</div>
                <div className="text-sm text-muted-foreground">{selectedDriver.driverId}</div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">{selectedDriver.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">{selectedDriver.phone}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Assigned Documents</div>
                <div className="grid gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">National ID Card Photo</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Commercial License</div>
                  </div>
                </div>
              </div>

              <Button className="w-full">Call For a Meeting</Button>
              <Button className="w-full">Verify Driver</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
