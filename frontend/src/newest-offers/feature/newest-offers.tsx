import { Grid } from '@mui/material';
import NewestOfferCard from '../../ui/newest-offer-card/newest-offer-card';

const items = [
  {
    trip: {
      departureAirport: 'Copenhagen',
      departureAirportCode: 'CPH',
      arrivalAirport: 'Warsaw',
      arrivalAirportCode: 'WAW',
      startingPrice: 1500,
      departureDate: '28-10-2023',
      returnDate: '30-10-2023',
      isReturnTrip: true,
    },
  },
  {
    trip: {
      departureAirport: 'Copenhagen',
      departureAirportCode: 'CPH',
      arrivalAirport: 'Barcelona',
      arrivalAirportCode: 'BCN',
      startingPrice: 2500,
      departureDate: '30-10-2023',
      returnDate: '05-12-2023',
      isReturnTrip: true,
    },
  },
  {
    trip: {
      departureAirport: 'Copenhagen',
      departureAirportCode: 'CPH',
      arrivalAirport: 'Paris',
      arrivalAirportCode: 'CDG',
      startingPrice: 3000,
      departureDate: '30-10-2023',
      returnDate: '12-12-2023',
      isReturnTrip: true,
    },
  },
  {
    trip: {
      departureAirport: 'Copenhagen',
      departureAirportCode: 'CPH',
      arrivalAirport: 'New York',
      arrivalAirportCode: 'JFK',
      startingPrice: 10000,
      departureDate: '20-12-2023',
      returnDate: '10-01-2024',
      isReturnTrip: true,
    },
  },
  {
    trip: {
      departureAirport: 'Copenhagen',
      departureAirportCode: 'CPH',
      arrivalAirport: 'Tokyo',
      arrivalAirportCode: 'NRT',
      startingPrice: 14000,
      departureDate: '01-01-2024',
      returnDate: '30-01-2024',
      isReturnTrip: true,
    },
  },
];

const NewestOffers = () => {
  return (
    <div>
      <h2>Newest offers from Copenhagen</h2>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
      >
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <NewestOfferCard trip={item.trip} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default NewestOffers;
