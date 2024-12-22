export interface TripData {
    key: string
    tripId: string
    tripDate: string
    pickupLocation: string
    dropoffLocation: string
    totalPayment: number
    status: 'Completed'
  }
  
  export const tripData: TripData[] = [
    {
      key: '1',
      tripId: '#TRP1023',
      tripDate: 'Aug 1, 2028',
      pickupLocation: 'New York, NY',
      dropoffLocation: 'Boston, MA',
      totalPayment: 1250.00,
      status: 'Completed'
    },
    {
      key: '2',
      tripId: '#TRP1047',
      tripDate: 'Aug 1, 2028',
      pickupLocation: 'Los Angeles, CA',
      dropoffLocation: 'Chicago, IL',
      totalPayment: 758.80,
      status: 'Completed'
    },
    {
      key: '3',
      tripId: '#TRP1095',
      tripDate: 'Aug 2, 2028',
      pickupLocation: 'Detroit, MI',
      dropoffLocation: 'Dallas, TX',
      totalPayment: 1395.00,
      status: 'Completed'
    },
    {
      key: '4',
      tripId: '#TRP1123',
      tripDate: 'Aug 2, 2028',
      pickupLocation: 'Austin, TX',
      dropoffLocation: 'Miami, FL',
      totalPayment: 587.36,
      status: 'Completed'
    },
    {
      key: '5',
      tripId: '#TRP1168',
      tripDate: 'Aug 3, 2028',
      pickupLocation: 'Orlando, FL',
      dropoffLocation: 'Seattle, WA',
      totalPayment: 1250.00,
      status: 'Completed'
    },
    {
      key: '6',
      tripId: '#TRP1199',
      tripDate: 'Aug 3, 2028',
      pickupLocation: 'Atlanta, GA',
      dropoffLocation: 'Denver, CO',
      totalPayment: 1250.00,
      status: 'Completed'
    },
    {
      key: '7',
      tripId: '#TRP1250',
      tripDate: 'Aug 3, 2028',
      pickupLocation: 'Denver, CO',
      dropoffLocation: 'Atlanta, GA',
      totalPayment: 1250.00,
      status: 'Completed'
    }
  ]
  
  