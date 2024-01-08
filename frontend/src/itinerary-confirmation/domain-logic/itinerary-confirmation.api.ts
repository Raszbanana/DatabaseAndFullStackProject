import axios from 'axios';
import { IFlightBookingParams } from '../../utils/common/flight-booking-params.interface';

const BASE_URL =
  'https://databaseandfullstack-backend.onrender.com/api/flight-booking/mysql';

export const postBooking = async (
  bookingParams: IFlightBookingParams
): Promise<IFlightBookingParams> => {
  try {
    const response = await axios.post(BASE_URL, bookingParams);

    if (response.status !== 201) {
      throw new Error('Failed to create the booking');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
