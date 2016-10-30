import * as actionTypes from '../constants/CarActionTypes';

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
    filter: {
        brand: '',
        name: '',
        fuelType: '',
        fuelConsumption: '',
        maxVelocity: ''
    },
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

        default:
            return state;
    }
}
