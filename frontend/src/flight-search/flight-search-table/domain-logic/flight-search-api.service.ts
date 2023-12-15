import { IFlightSearchParams } from '../../../flight-search/utils/common/flight-search-params';
import { IFlight } from '../../../flight-search/utils/common/flight.interface';

const BASE_URL = 'http://localhost:8080/api/flights';

export const searchFlights = async (
  searchParams: IFlightSearchParams
): Promise<IFlight[]> => {
  console.log('here!');
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch flight data');
    }

    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
