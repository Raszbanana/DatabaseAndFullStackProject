import axios from 'axios';

import { IFlightSearchParams } from '../../../flight-search/utils/common/flight-search-params';
import { IFlight } from '../../../flight-search/utils/common/flight.interface';

const BASE_URL = 'http://localhost:8080/api/flight-search';

export const searchFlights = async (
  searchParams: IFlightSearchParams
): Promise<IFlight[]> => {
  console.log('here!');

  try {
    const newSearchParmas = {
      departureAirport: 1,
      arrivalAirport: 2,
      departureDate: '20230916',
      numberOfPassengers: 1,
    };
    const response = await axios.get(BASE_URL, { params: newSearchParmas });

    if (response.status !== 200) {
      throw new Error('Failed to fetch flight data');
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
