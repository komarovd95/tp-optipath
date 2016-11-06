import * as actionTypes from '../constants/CarActionTypes';

const DEFAULT_FILTER = {
    brand: '',
    name: '',
    fuelType: '',
    fuelConsumption: '',
    maxVelocity: ''
};

const INITIAL_STATE = {
    isFetching: false,
    cars: [],
    pageable: {
        number: 0,
        size: 20,
        sort: {
            field: 'brand',
            isAscending: false
        },
        totalPages: 0
    },
    filter: DEFAULT_FILTER,
    selectedCar: null,
    actionsEnabled: [],
    deleteCarIsShown: false
};

export default function carReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.CAR_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.CAR_LIST_FAILURE:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.CAR_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                cars: action.payload.data,
                pageable: {
                    ...state.pageable,
                    ...action.payload.pageable
                },
                filter: {
                    ...state.filter,
                    ...action.payload.filter
                }
            };

        case actionTypes.CAR_LIST_FILTERS_RESET:
            return {
                ...state,
                filter: DEFAULT_FILTER
            };

        case actionTypes.CAR_LIST_RESET:
            return INITIAL_STATE;

        case actionTypes.CAR_LIST_ENABLE_ACTIONS:
            return {
                ...state,
                selectedCar: action.payload.selectedCar,
                actionsEnabled: action.payload.actions
            };

        case actionTypes.CAR_LIST_DELETE_SHOW:
            return {
                ...state,
                deleteCarIsShown: true
            };

        case actionTypes.CAR_LIST_DELETE_CLOSE:
            return {
                ...state,
                deleteCarIsShown: false,
                isFetching: false
            };

        case actionTypes.CAR_LIST_DELETE_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.CAR_LIST_DELETE_SUCCESS:
            return {
                ...state,
                deleteCarIsShown: false,
                isFetching: false
            };

        case actionTypes.CAR_LIST_DELETE_FAILURE:
            return {
                ...state,
                deleteCarIsShown: false,
                isFetching: false
            };

        case actionTypes.CAR_CHANGE_CLOSE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
