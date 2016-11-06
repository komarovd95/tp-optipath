import { CAR_CHANGE_TRANSITION, CAR_CHANGE_CLOSE } from '../constants/CarActionTypes';

const INITIAL_STATE = {
    action: null,
    car: null,
    transitState: null
};

export default function carChangeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CAR_CHANGE_TRANSITION:
            const { action : openAction, car, ...transitState } = action.payload;

            return {
                ...state,
                action: openAction,
                car,
                transitState
            };

        case CAR_CHANGE_CLOSE:
            return INITIAL_STATE;

        default:
            return state;
    }
}