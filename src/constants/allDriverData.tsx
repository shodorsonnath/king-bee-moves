// driverData.tsx

export interface Driver {
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
  
  export const driversData: Driver[] = [
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
  ];
  