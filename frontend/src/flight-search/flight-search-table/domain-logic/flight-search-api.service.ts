import axios from 'axios';

import { IFlightSearchParams } from '../../../flight-search/utils/common/flight-search-params';
import { IFoundFlights } from '../../../flight-search/utils/common/flight.interface';

const BASE_URL = 'http://localhost:8080/api/flight-search';

export const searchFlights = async (
  searchParams: IFlightSearchParams
): Promise<IFoundFlights> => {
  try {
    const response = await axios.get(BASE_URL, { params: searchParams });

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
