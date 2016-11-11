import { createAction } from 'redux-actions';
import { createSelector } from 'reselect';

import { CallApi } from '../../util/APIUtil';

import { carsCacheLoad } from '../cars/CarsCacheActions';
import * as actionTypes from '../../constants/BrandsActionTypes';


const FETCH_ERROR_MESSAGE = 'Произошла ошибка при загрузке данных. ' +
    'Повторите запрос позже';
const SAVE_ERROR_MESSAGE = 'Во время сохранения произошла ошибка. ' +
    'Попробуйте позже';

const brandsListFetchRequest = createAction(actionTypes.BRANDS_LIST_FETCH_REQUEST);
const brandsListFetchSuccess = createAction(actionTypes.BRANDS_LIST_FETCH_SUCCESS);
const brandsListFetchFailure = createAction(actionTypes.BRANDS_LIST_FETCH_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

export const brandsListFetch = (pageable, sort, filter) => (dispatch, getState) => {
    const { pageable: p, sort: s, filter: f } = getState().brands.list;

    dispatch(brandsListFetchRequest({
        pageable: pageable || p,
        sort: sort || s,
        filter: filter || f
    }));

    return CallApi.fetchList('/api/carBrands/search/findAllByBrandNameContainingIgnoreCase',
        pageable || p, sort || s, filter || f, true)
        .then(response => {
            if (response.status === 200) {
                const { data } = response;
                const brands = data['_embedded'] ? data['_embedded'].carBrands : [];

                dispatch(brandsListFetchSuccess({
                    data: brands,
                    pageable: data.page
                }));

                return Promise.resolve(brands);
            } else {
                dispatch(brandsListFetchFailure(FETCH_ERROR_MESSAGE));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(brandsListFetchFailure(FETCH_ERROR_MESSAGE));
            return Promise.reject(error.response);
        })
};

export const brandsListReset = createAction(actionTypes.BRANDS_LIST_RESET);
export const brandsListRowSelect = createAction(actionTypes.BRANDS_LIST_ROW_SELECT);


const brandsListSaveRequest = createAction(actionTypes.BRANDS_LIST_SAVE_REQUEST);
const brandsListSaveSuccess = createAction(actionTypes.BRANDS_LIST_SAVE_SUCCESS);
const brandsListSaveFailure = createAction(actionTypes.BRANDS_LIST_SAVE_FAILURE,
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

export const brandsListSave = (brand, action) => (dispatch, getState) => {
    console.log('b', brand, action);
    dispatch(brandsListSaveRequest());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const requestData = {
        brandName: brand.brandName
    };

    if (action === 'save') {
        const selectedBrand = getSelectedBrand(getState());

        requestData.id = selectedBrand.id;
        requestData.brandName = selectedBrand.brandName;
    }

    const call = (action ==='add')
        ? CallApi.post('/api/carBrands', JSON.stringify(requestData), config)
        : CallApi.patch(`/api/carBrands/${requestData.id}`, JSON.stringify(requestData), config);

    const successStatus = (action === 'add') ? 201 : 200;

    return call.then(response => {
        if (response.status === successStatus) {
            dispatch(brandsListSaveSuccess());
            return dispatch(carsCacheLoad(true));
        } else {
            dispatch(brandsListSaveFailure(SAVE_ERROR_MESSAGE));
            return Promise.reject(response);
        }
    }, error => {
        if (error.response.status === 500) {
            dispatch(brandsListSaveFailure());
            return Promise.reject({
                error: 'Такая марка уже существует'
            });
        } else {
            dispatch(brandsListSaveFailure(SAVE_ERROR_MESSAGE));
            return Promise.reject(error.response);
        }
    }).then(() => {
        dispatch(brandsListFetch(null, null, { brandName: '' }));
    })
};


const brandsListRowUpdated = createAction(actionTypes.BRANDS_LIST_ROW_UPDATE);

export const brandsListRowUpdate = (index, { brandName }) => (dispatch, getState) => {
    if (brandName && brandName.length < 50 && brandName.match(/^[а-яА-ЯЁёa-zA-Z\d\s]+$/)) {
        const brands = getBrands(getState());

        const oldValue = brands[index];

        if (oldValue.brandName !== brandName) {
            const newValue = { ...oldValue };

            if (newValue.touched) {
                if (newValue.updated.brandName === brandName) {
                    delete newValue.touched;
                    delete newValue.updated;
                }

                newValue.brandName = brandName;
            } else {
                newValue.touched = true;
                newValue.updated = {
                    brandName: newValue.brandName
                };
                newValue.brandName = brandName;
            }

            const newBrands = brands.slice(0, index);
            newBrands.push(newValue);
            dispatch(brandsListRowUpdated(newBrands.concat(brands.slice(index + 1))));
        }
    }
};