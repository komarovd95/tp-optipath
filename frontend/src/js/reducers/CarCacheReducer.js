import {
    CAR_CACHE_LOAD_REQUEST, CAR_CACHE_LOAD_SUCCESS, CAR_CACHE_LOAD_FAILURE
} from '../constants/CarActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    brands: null,
    fuelTypes: null
};

export default function carCacheReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CAR_CACHE_LOAD_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case CAR_CACHE_LOAD_SUCCESS:
            return {
                ...state,
                isFetching: false,
                brands: action.payload.brands,
                fuelTypes: action.payload.fuelTypes
            };

        case CAR_CACHE_LOAD_FAILURE:
            return {
                ...state,
                isFetching: false
            };

        default:
            return state;
    }
}
