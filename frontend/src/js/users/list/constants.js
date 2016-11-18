import UserLink from './components/UserLink';
import {RESOURCE_URL} from '../constants';


export const FETCH_ERROR_MESSAGE = 'Произошла ошибка при загрузке данных. ' +
    'Повторите запрос позже';
export const DELETE_ERROR_MESSAGE = 'Во время удаления пользователя произошла ошибка. ' +
    'Попробуйте позже';
export const DELETE_SUCCESS_MESSAGE = 'Пользователь успешно удален!';
export const CHANGE_ROLE_SUCCESS_MESSAGE = 'Пользователь стал администратором';
export const CHANGE_ROLE_ERROR_MESSAGE = 'Во время смены роли произошла ошибка';


export const FETCH_URL = RESOURCE_URL + '/search/filter';


export const EMPTY_LIST = [];
export const DEFAULT_SORT = {
    field: 'id',
    direction: 'asc'
};
export const COLUMNS = [
    {
        key: 'id',
        name: 'ID',
        width: 80,
        sortable: true
    },
    {
        key: 'username',
        name: 'Имя пользователя',
        sortable: true,
        formatter: UserLink
    },
    {
        key: 'updatedAt',
        name: 'Дата изменения',
        sortable: true
    },
    {
        key: 'driveStyle',
        name: 'Стиль вождения',
        sortable: false
    },
    {
        key: 'role',
        name: 'Роль пользователя',
        sortable: false
    }
];