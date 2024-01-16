export interface IFlightSearchParams {
  departureAirport: number;
  arrivalAirport: number;
  departureDate: string;
  returnDate?: string;
  numberOfPassengers: number;
}
