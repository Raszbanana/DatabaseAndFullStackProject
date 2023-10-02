export interface IFlightSearchParams {
  departureAirportId: string;
  arrivalAirportId: string;
  departureDate: string;
  returnDate?: string;
  numberOfPassengers: number;
}
