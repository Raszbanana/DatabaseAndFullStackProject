import { combineReducers } from 'redux';

import flightSearchReducer from '../flight-search/flight-search-form/domain-logic/state/flight-search-reducer';
import tripReducer from '../new-flight-search/flight-search-table/domain-logic/state/selected-flight-reducer';

const rootReducer = combineReducers({
  flightSearchParams: flightSearchReducer,
  trip: tripReducer,
});

export default rootReducer;
