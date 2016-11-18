import {Schema} from 'normalizr';
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

