import { arrayOf, normalize } from 'normalizr';
import { PathUser, usersSchema } from '../model';
import _ from 'lodash';

export const getDataFromResponse = data => {
    const users = data['_embedded'] ? data['_embedded'] : {};

    const normalized = normalize(users, {
        users: arrayOf(usersSchema)
    });

    const entities = _.mapValues(normalized.entities.users, u => new PathUser(u));

    const result = normalized.result.users;

    return { entities, result }
};
