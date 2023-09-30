export interface IFlightSearchParams {
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureDate: string;
  returnDate?: string;
  numberOfPassengers: number;
}