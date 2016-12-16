import {Schema, arrayOf, normalize} from 'normalizr';
import mapValues from 'lodash/mapValues';
import {ADMIN, USER} from './constants';

export class PathUser {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.createdAt = new Date(data.createdAt).toLocaleString('ru');
        this.updatedAt = new Date(data.updatedAt).toLocaleString('ru');
        this.role = data.role ? data.role : rolesToString(data.roles);
        this.driveStyle = data.driveStyle ? data.driveStyle
            : driveStyleToString(data.driveStyleName);

        this.isAdmin = this.isAdmin.bind(this);
    }

    isAdmin() {
        return this.role === ADMIN;
    }
}

export const usersSchema = new Schema('users', {idAttribute: 'id'});

export const rolesToString = (roles) => roles.includes('ROLE_ADMIN') ? ADMIN : USER;

export const driveStyleToString = (driveStyle) => driveStyle === 'economy'
    ? 'Законопослушный' : 'Нарушитель';


export const getUsersFromResponseData = (data) => {
    const users = data['_embedded'] ? data['_embedded'] : {};

    const normalized = normalize(users, {
        users: arrayOf(usersSchema)
    });

    const entities = mapValues(normalized.entities.users, u => new PathUser(u));

    const result = normalized.result.users;

    return {entities, result}
};

