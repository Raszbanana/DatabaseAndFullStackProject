import { IFlight, IFlightSearchParams } from "../../utils/common";

// const BASE_URL = '/api/flights'; // Adjust the base URL as needed
const testFlights: IFlight[] = [
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
  {
    id: 1,
    flightNumber: 'AA123',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 100,
  },
  {
    id: 2,
    flightNumber: 'BB234',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 24,
  },
  {
    id: 3,
    flightNumber: 'CC345',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 452,
  },
  {
    id: 4,
    flightNumber: 'DD424',
    departureTime: '2021-01-01 12:00',
    arrivalTime: '2021-01-01 14:00',
    price: 312,
  },
]
export const searchFlights = async (searchParams: IFlightSearchParams): Promise<IFlight[]> => {
  console.log('searchParams', searchParams)
  return testFlights; // Remove this line and implement the API call
  // try {
  //   const response = await fetch(BASE_URL, { 
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(searchParams),
  //   });

  //   if (!response.ok) {
  //     throw new Error('Failed to fetch flight data');
  //   }

  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }
};
