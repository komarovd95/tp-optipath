import { createAction } from 'redux-actions';
import { createSelector } from 'reselect';

import { CallApi } from '../../util/APIUtil';

import { brandsListFetch } from './BrandsListFetchActions';
import * as actionTypes from '../../constants/BrandsActionTypes';


const DELETE_ERROR_MESSAGE = 'Произошла ошибка при удалении автомобиля. ' +
    'Повторите запрос позже';

const brandsListDeleteBrandRequest = createAction(actionTypes.BRANDS_LIST_DELETE_REQUEST);
const brandsListDeleteBrandSuccess = createAction(actionTypes.BRANDS_LIST_DELETE_SUCCESS);
const brandsListDeleteBrandFailure = createAction(actionTypes.BRANDS_LIST_DELETE_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

const getBrands = (state) => state.brands.list.data.brands;
const getSelectedIndex = (state) => state.brands.list.data.selectedIndex;

const getSelectedBrand = createSelector(getBrands, getSelectedIndex,
    (brands, selectedIndex) => {
        if (selectedIndex === -1) {
            return null;
        } else {
            return brands[selectedIndex];
        }
    });

export const brandsListDeleteBrand = () => (dispatch, getState) => {
    const brand = getSelectedBrand(getState());

    if (!brand) {
        return new Promise(resolve => resolve());
    }

    dispatch(brandsListDeleteBrandRequest());

    return CallApi.remove(`/api/carBrands/${brand.id}`).then(response => {
        if (response.status === 204) {
            dispatch(brandsListDeleteBrandSuccess());

            const { data: { brands }, pageable } = getState().brands.list;

            if (brands.length === 1) {
                const newPageable = { ...pageable };
                newPageable.number = Math.max(0, newPageable.number - 1);
                return dispatch(brandsListFetch(newPageable))
            }

            return dispatch(brandsListFetch())
        } else {
            dispatch(brandsListDeleteBrandFailure(DELETE_ERROR_MESSAGE));
            return Promise.reject(response);
        }
    }, error => {
        dispatch(brandsListDeleteBrandFailure(DELETE_ERROR_MESSAGE));
        return Promise.reject(error.response);
    }).then(() => {
        dispatch(brandsListModalClose())
    }, () => {
        dispatch(brandsListModalClose())
    })
};

export const brandsListModalShow = createAction(actionTypes.BRANDS_LIST_MODAL_SHOW);
export const brandsListModalClose = createAction(actionTypes.BRANDS_LIST_MODAL_CLOSE);