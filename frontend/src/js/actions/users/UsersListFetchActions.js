import { createAction } from 'redux-actions';

import { CallApi } from '../../util/APIUtil';

import * as actionTypes from '../../constants/UsersActionTypes';


const FETCH_ERROR_MESSAGE = 'Произошла ошибка при загрузке данных. ' +
    'Повторите запрос позже';

const usersListRequest = createAction(actionTypes.USERS_LIST_FETCH_REQUEST);
const usersListSuccess = createAction(actionTypes.USERS_LIST_FETCH_SUCCESS);
const usersListFailure = createAction(actionTypes.USERS_LIST_FETCH_FAILURE,
    errorMessage => ({
        error: errorMessage,
        globalError: !!errorMessage
    }));

export const usersListFetch = (pageable, sort, filter) => (dispatch, getState) => {
    const { pageable: p, sort: s, filter: f } = getState().users.list;

    dispatch(usersListRequest({
        pageable: pageable || p,
        sort: sort || s,
        filter: filter || f
    }));

    return CallApi.fetchList('/api/pathUsers/search/filter', pageable || p, sort || s, filter || f)
        .then(response => {
            if (response.status === 200) {
                const { data } = response;
                const users = data['_embedded'] ? data['_embedded'].pathUsers : [];

                dispatch(usersListSuccess({
                    data: users,
                    pageable: data.page
                }));

                return Promise.resolve(users);
            } else {
                dispatch(usersListFailure(FETCH_ERROR_MESSAGE));
                return Promise.reject(response);
            }
        }, error => {
            dispatch(usersListFailure(FETCH_ERROR_MESSAGE));
            return Promise.reject(error.response);
        })
};

export const usersListReset = createAction(actionTypes.USERS_LIST_RESET);
export const usersListRowSelect = createAction(actionTypes.USERS_LIST_ROW_SELECT);
