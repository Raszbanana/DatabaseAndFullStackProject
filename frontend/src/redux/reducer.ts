import { combineReducers } from 'redux';
import flightSearchReducer from '../flight-search/flight-search-form/domain-logic/state/flight-search-reducer';

const rootReducer = combineReducers({
  flightSearchParams: flightSearchReducer,
});

export default rootReducer;
