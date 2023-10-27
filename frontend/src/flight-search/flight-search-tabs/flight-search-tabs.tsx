import React from 'react';
import Radio from '@mui/material/Radio';
import { FormControl, RadioGroup, FormControlLabel } from '@mui/material';

import FlightSearchForm from '../flight-search-form/feature/flight-search-form';
import './flight-search-tabs.css';

const FlightSearchTabs = () => {
  const [isReturnTrip, setIsReturnTrip] = React.useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setIsReturnTrip(newValue === 'true');
  };

  return (
    <div>
      <FormControl className="flight-search__selector">
        <RadioGroup
          row
          aria-labelledby="type-of-trip"
          name="type-of-trip"
          value={isReturnTrip.toString()}
          onChange={handleChange}
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Return-flight trip"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="One-way flight"
          />
        </RadioGroup>
      </FormControl>

      <FlightSearchForm isReturnTrip={isReturnTrip} />
    </div>
  );
};

export default FlightSearchTabs;
