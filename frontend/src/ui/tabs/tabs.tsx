import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import './tabs.css';
import FlightSearchTabs from '../../flight-search/flight-search-tabs/flight-search-tabs';

export default function HomeTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: '100%', typography: 'body1' }}
      className="tabs__container"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            scrollButtons="auto"
          >
            <Tab
              className={
                value === '1'
                  ? 'tabs__labels-selected tabs__text'
                  : 'tabs__labels tabs__text'
              }
              label="Book"
              value="1"
            />
            <Tab
              className={
                value === '2'
                  ? 'tabs__labels-selected tabs__text'
                  : 'tabs__labels tabs__text'
              }
              label="Check-in"
              value="2"
            />
            <Tab
              className={
                value === '3'
                  ? 'tabs__labels-selected tabs__text'
                  : 'tabs__labels tabs__text'
              }
              label="Flight Status"
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <FlightSearchTabs />
        </TabPanel>
        <TabPanel value="2">Check-in option not available yet</TabPanel>
        <TabPanel value="3">Flight Status option not available yet</TabPanel>
      </TabContext>
    </Box>
  );
}
