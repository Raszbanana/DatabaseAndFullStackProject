import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import './tabs.css';
import FlightSearchForm from '../../flight-search/flight-search-form/feature/flight-search-form';

export default function HomeTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab className="tabs__labels" label="Book" value="1" />
            <Tab className="tabs__labels" label="Check-in" value="2" />
            <Tab className="tabs__labels" label="Flight Status" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <FlightSearchForm />
        </TabPanel>
        <TabPanel value="2">Check-in option not available yet</TabPanel>
        <TabPanel value="3">Flight Status option not available yet</TabPanel>
      </TabContext>
    </Box>
  );
}
