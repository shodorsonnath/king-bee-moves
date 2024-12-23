'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Filter, MailOpen, Phone, Search, X } from 'lucide-react';
import { Dropdown, MenuProps, Space, Table } from 'antd';

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
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Adams',
      driverId: '#D-10001',
      phone: '111-222-3333',
      email: 'john.adams@example.com',
      avatar: '/placeholder.svg',
      status: 'Verified',
      documents: {
        nationalId: 'nid1.png',
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
        nationalId: '',
        license: '/placeholder.svg',
      },
    },
  ]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Verify Application',
    },
    {
      key: '2',
      label: 'Verify Drivers',
    },
  ];
  const itemsDriver: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span className="px-4 py-1 block text-white bg-[#FF6F00] rounded-md w-24 text-center">
          Pending
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span className="px-4 py-1 block text-white bg-[#228B22] rounded-md w-24 text-center">
          Processing
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span className="px-4 py-1 block text-white bg-[#001F54] rounded-md w-24 text-center">
          Verified
        </span>
      ),
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
          <Avatar className="h-10 w-10 rounded-full">
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
          className={`px-3 py-1 block text-white rounded-md w-24 text-center ${record.status === 'Verified'
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
          className={`p-0 h-auto font-normal ${selectedDriver?.id === record.id ? 'text-black' : 'text-blue-500'}`}
          onClick={() => setSelectedDriver(selectedDriver?.id === record.id ? null : record)}
        >
          {selectedDriver?.id === record.id ? 'Hide Details' : 'View Details'}
        </Button>
      ),
    },
  ];

  const handleStatusChange = (key: string) => {
    if (selectedDriver) {
      const newStatus = key === '1' ? 'Pending' : key === '2' ? 'Processing' : 'Verified';

      // Update the drivers state
      const updatedDrivers = drivers.map((driver) =>
        driver.id === selectedDriver.id ? { ...driver, status: newStatus } : driver
      );
      setDrivers(updatedDrivers);

      // Update the selectedDriver state
      setSelectedDriver({
        ...selectedDriver,
        status: newStatus,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 flex-1">
        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 text-gray-500" />
            <input
              className="pl-9 pr-4 py-2 w-full border rounded-md"
              placeholder="Search for driver"
              type="search"
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className='flex items-center justify-center'>
                  <Filter className='text-gray-500' />
                  <span className='text-gray-500 font-medium'>Verify Application</span>
                  <ChevronDown className='text-gray-500' />
                </Space>
              </a>
            </Dropdown>
          </Button>
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
          className={`p-6 bg-white transition-all ${selectedDriver ? 'block' : 'hidden'
            } ${'fixed lg:relative bottom-0 w-full right-1 lg:w-[400px]'
            }`}
        >
          <div className="space-y-6 relative -mt-5">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-red-500"
              onClick={() => setSelectedDriver(null)}
            >
              <X className="h-6 w-6 lg:hidden" />
            </button>

            {/* Driver Information */}
            <div className='flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between'>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedDriver.avatar} />
                  <AvatarFallback>{selectedDriver.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-semibold mb-3">{selectedDriver.name}</div>
                  <div className="text-sm text-muted-foreground"><span
                    className={`px-2 py-1 rounded-md text-white text-center ${selectedDriver.status === 'Verified'
                      ? 'bg-[#001F54]'
                      : selectedDriver.status === 'Pending'
                        ? 'bg-[#FF6F00]'
                        : 'bg-[#228B22]'
                      }`}
                  >
                    {selectedDriver.status}
                  </span></div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-gray-100 w-14 text-center py-2 rounded-md text-gray-600'>Ban</div>
                <div className='bg-gray-100 w-14 text-center py-2 rounded-md text-gray-600'>
                  <Dropdown
                    menu={{ items: itemsDriver, onClick: ({ key }) => handleStatusChange(key) }}
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <a className='cursor-pointer' onClick={(e) => e.preventDefault()}>
                      <Space>
                        Edit
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-1 bg-gray-100 p-4 rounded-md">
                <div className='flex items-center gap-4'>
                  <div className="text-sm lg:text-base font-medium flex items-center gap-2 text-gray-500"><MailOpen className='w-4' /><p>Email</p> </div>
                  <div className="text-sm lg:text-base font-medium">{selectedDriver.email}</div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className="text-sm lg:text-base font-medium flex items-center gap-2 text-gray-500"><Phone className='w-4' /><p>Phone</p></div>
                  <div className="text-sm lg:text-base font-medium">{selectedDriver.phone}</div>
                </div>
              </div>
              <div className="text-base font-bold mb-2 bg-gray-100 py-2 px-5 rounded-md">Assigned Documents</div>

              <div>
                <div className="grid gap-4">
                  <div>
                    <div className="text-base font-medium mb-2">National ID Card Photo  </div>
                  </div>
                  <div>
                    <div className="text-base text-muted-foreground mb-2">Commercial Driver&#39;s License (CDL) Photo <span className='text-gray-500'>(Front & Back)</span></div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3'>
                <Button className="w-full bg-orange-600">Call For a Meeting</Button>
                <Button className="w-full bg-[#001F54]"
                  onClick={() => {
                    if (selectedDriver) {
                      const updatedDrivers = drivers.map((driver) =>
                        driver.id === selectedDriver.id ? { ...driver, status: 'Verified' } : driver
                      );
                      setDrivers(updatedDrivers);

                      setSelectedDriver({
                        ...selectedDriver,
                        status: 'Verified',
                      });
                    }
                  }}>Verify Driver</Button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

