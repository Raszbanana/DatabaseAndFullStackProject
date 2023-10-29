interface ISteps {
  currentStep: number;
  isComplete: boolean;
}

const initialState: ISteps = {
  currentStep: 0,
  isComplete: false,
};

export default function stepsReducer(
  state = initialState,
  action: { type: string; payload?: ISteps }
) {
  switch (action.type) {
    case 'UPDATE_CURRENT_STEP': {
      return {
        currentStep: action.payload?.currentStep,
        isComplete: action.payload?.isComplete,
      };
    }
    case 'GO_TO_NEXT_STEP': {
      return {
        currentStep: state.currentStep + 1,
        isComplete: false,
      };
    }
    case 'GO_TO_PREVIOUS_STEP': {
      return {
        currentStep: state.currentStep - 1,
        isComplete: false,
      };
    }
    case 'COMPLETE_STEP': {
      return {
        currentStep: state.currentStep,
        isComplete: true,
      };
    }
    case 'RESET_STEPS': {
      return {
        currentStep: 0,
        isComplete: false,
      };
    }
    default: {
      return state;
    }
  }
}
