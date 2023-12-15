import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useLocation } from 'react-router-dom';
import FlightSearchTable from '../flight-search/flight-search-table/feature/flight-search-table';
import { useDispatch, useSelector } from 'react-redux';
import PassengerInfo from '../passenger-info/feature/passenger-info';
import ItineraryConfirmation from '../itinerary-confirmation/feature/itinerary-confirmation';
import ChooseSeat from '../choose-seat/feature/choose-seat';

interface IStep {
  label: string;
  isOptional: boolean;
}

const steps: IStep[] = [
  { label: 'Choose flight', isOptional: false },
  { label: 'Provide your information', isOptional: false },
  { label: 'Choose the seat', isOptional: false },
  { label: 'Confirmation', isOptional: false },
];

const renderStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <FlightSearchTable />;
    case 1:
      return <PassengerInfo />;
    case 2:
      return <ChooseSeat />;
    case 3:
      return <ItineraryConfirmation />;
    default:
      return <div>Not Found</div>;
  }
};

const FlightBookingPage = () => {
  const activeStep = useSelector((state: any) => state.steps.currentStep);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const dispatch = useDispatch();

  const setActiveStep = (activeStep: Number) => {
    dispatch({
      type: 'UPDATE_CURRENT_STEP',
      payload: {
        currentStep: activeStep,
        isComplete: false,
      },
    });
  };

  const isStepOptional = (step: number) => {
    return steps[step].isOptional;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(activeStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped);
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const location = useLocation();

  if (!location.state?.fromApp) {
    window.location.replace('/');
  }

  return (
    <Box>
      <Stepper sx={{ flexWrap: 'wrap' }} activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps} sx={{ marginBottom: '6px' }}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default FlightBookingPage;
