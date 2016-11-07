import {
    CAR_BRAND_LIST_REQUEST, CAR_BRAND_LIST_SUCCESS, CAR_BRAND_LIST_FAILURE
} from '../constants/CarActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    brands: [],
    pageable: {
        number: 0,
        size: 20,
        sort: {
            field: 'brandName',
            isAscending: false
        },
        totalPages: 0
    },
    filter: {
        brandName: ''
    },
    selectedBrand: null,
    actionsEnabled: [],
    deleteBrandIsShown: false
};

export default function carBrandReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CAR_BRAND_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case CAR_BRAND_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                brands: action.payload
            };

        case CAR_BRAND_LIST_FAILURE:
            return {
                ...state,
                isFetching: false
            };

        default:
            return state;
    }

}