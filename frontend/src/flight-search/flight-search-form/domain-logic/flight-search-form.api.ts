import axios from 'axios';
import { IAirport } from '../../utils/common';

const BASE_URL = 'http://localhost:3000/api/airports/mysql';

export const getAirports = async (): Promise<IAirport[]> => {
  try {
    const response = await axios.get(BASE_URL);

    if (response.status !== 200) {
      throw new Error('Failed to fetch airports');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
