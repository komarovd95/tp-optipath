import * as actionTypes from '../constants/CarActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    brands: [],
    pageable: {
        number: 0,
        size: 20,
        sort: {
            field: 'id',
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
        case actionTypes.CAR_BRAND_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.CAR_BRAND_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                brands: action.payload
            };

        case actionTypes.CAR_BRAND_LIST_FAILURE:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.CAR_BRAND_LIST_RESET:
            return INITIAL_STATE;

        case actionTypes.CAR_BRAND_ENABLE_ACTIONS:
            return {
                ...state,
                ...action.payload
            };

        case actionTypes.CAR_BRAND_DELETE_SHOW:
            return {
                ...state,
                deleteBrandIsShown: true
            };

        case actionTypes.CAR_BRAND_DELETE_CLOSE:
            return {
                ...state,
                deleteBrandIsShown: false,
                isFetching: false
            };

        case actionTypes.CAR_BRAND_DELETE_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.CAR_BRAND_DELETE_SUCCESS:
            return {
                ...state,
                deleteBrandIsShown: false,
                isFetching: false
            };

        case actionTypes.CAR_BRAND_DELETE_FAILURE:
            return {
                ...state,
                deleteBrandIsShown: false,
                isFetching: false
            };

        case actionTypes.CAR_BRAND_CHANGE_ROW:
            return {
                ...state,
                brands: action.payload
            };



        default:
            return state;
    }

}