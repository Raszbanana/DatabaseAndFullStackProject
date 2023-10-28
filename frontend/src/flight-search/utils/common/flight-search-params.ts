export interface IFlightSearchParams {
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureDate: Date;
  returnDate?: Date;
  numberOfPassengers: number;
}
