export interface IFlightSearchParams {
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: string;
  returnDate?: string;
  numberOfPassengers: number;
}
