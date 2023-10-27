import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import './newest-offer-card.css';

interface NewestOfferCardProps {
  trip: {
    departureAirport: string;
    departureAirportCode: string;
    arrivalAirport: string;
    arrivalAirportCode: string;
    startingPrice: number;
    departureDate: string;
    returnDate?: string;
    isReturnTrip: boolean;
  };
}

function NewestOfferCard({ trip }: NewestOfferCardProps) {
  const imageSrc = `/cities-photos/${trip.arrivalAirportCode.toLowerCase()}.jpg`;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={imageSrc}
        title={trip.arrivalAirport}
      />
      <CardContent>
        <p className="newest-offer__description">
          {trip.departureAirport} [{trip.departureAirportCode}] -{' '}
          {trip.arrivalAirport} [{trip.arrivalAirportCode}]
        </p>

        <div className="newest-offer__details">
          <CalendarTodayIcon></CalendarTodayIcon>
          <div className="newest-offer__dates">
            <p className="newest-offer__date">{trip.departureDate}</p>
            <p className="newest-offer__date">{trip.returnDate}</p>
          </div>
        </div>
        <p className="newest-offer__price">from {trip.startingPrice} DKK</p>
      </CardContent>

      <CardActions className="newest-offer__button">
        <Button size="medium" variant="contained">
          Book
        </Button>
      </CardActions>
    </Card>
  );
}

export default NewestOfferCard;
