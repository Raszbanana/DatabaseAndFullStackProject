import React, { useEffect, useState } from 'react';
import './seat-selector.css';
import { useDispatch, useSelector } from 'react-redux';

const SeatSelector: React.FC<{
  numberOfPassengers: number;
  isReturn?: boolean;
  flightRoute: string;
}> = ({ numberOfPassengers, isReturn, flightRoute }) => {
  const savedSeats = useSelector((state: any) => state.seats);

  const initialSelectedSeats = isReturn
    ? savedSeats.returnFlight
    : savedSeats.departureFlight;

  const [selectedSeats, setSelectedSeats] =
    useState<string[]>(initialSelectedSeats);

  useEffect(() => {
    setSelectedSeats(
      isReturn ? savedSeats.returnFlight : savedSeats.departureFlight
    );
  }, [isReturn, savedSeats.returnFlight, savedSeats.departureFlight]);

  const flightType = isReturn ? 'RETURN' : 'DEPARTURE';

  const handleSeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seatId = event.target.id;

    if (event.target.checked) {
      if (selectedSeats.length < numberOfPassengers) {
        setSelectedSeats([...selectedSeats, seatId]);
        dispatch({
          type: `ADD_SEAT_FOR_${flightType}_FLIGHT`,
          payload: { seatsNumber: seatId },
        });
      }
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      dispatch({
        type: `REMOVE_SEAT_FOR_${flightType}_FLIGHT`,
        payload: { seatsNumber: seatId },
      });
    }
  };

  const dispatch = useDispatch();

  const rows = Array.from({ length: 15 }, (_, index) => index + 1);

  const occupiedSeats = [
    '1A',
    '2B',
    '1C',
    '2D',
    '2E',
    '1F',
    '3A',
    '3B',
    '10A',
    '10B',
    '10C',
  ];

  return (
    <div className="plane">
      <div className="cockpit">
        <h2 className="seat-selector__text">{flightRoute}</h2>
      </div>
      <div className="exit exit--front fuselage"></div>
      <ol className="cabin fuselage">
        {rows.map((row) => (
          <li key={row} className={`row row--${row}`}>
            <ol className="seats" type="A">
              {['A', 'B', 'C', 'D', 'E', 'F'].map((seat) => (
                <li key={`${row}${seat}`} className="seat">
                  <input
                    disabled={occupiedSeats.includes(`${row}${seat}`)}
                    type="checkbox"
                    className="seat-selector__input"
                    id={`${row}${seat}`}
                    onChange={handleSeatChange}
                    checked={selectedSeats.includes(`${row}${seat}`)}
                  />
                  <label
                    className="seat-selector__label"
                    htmlFor={`${row}${seat}`}
                  >{`${row}${seat}`}</label>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <div className="exit exit--back fuselage"></div>
    </div>
  );
};

export default SeatSelector;
