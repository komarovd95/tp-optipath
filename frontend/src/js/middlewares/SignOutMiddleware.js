import { browserHistory } from 'react-router';

import {SIGNOUT_SUCCESS} from '../constants/AuthActionTypes';

export default function signOutMiddleware(store) {
    return next => action => {
        console.log('store');
        console.log(store.getState());

        if (action.type === SIGNOUT_SUCCESS) {
            browserHistory.push({
                state: {
                    isSignedOut: true
                }
            });
            console.log(browserHistory);
            const result = next(action);
            console.log('store1');
            console.log(store.getState());
            return result;
        }

        return next(action);
    };
}
