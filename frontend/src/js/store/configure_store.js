import { createStore, applyMiddleware, compose } from 'redux';
import Raven from 'raven-js';

import thunkMiddleware from 'redux-thunk';

import appReducer from '../reducers/AppReducer';

const store = createStore(appReducer, undefined, getMiddleware());

function ravenMiddleware(store) {
    return function(next) {
        return function(action) {
            try {
                if (action.logged) {
                    Raven.captureMessage('TP-OptiPath logged error', {
                        extra: {
                            action,
                            state: store.getState()
                        }
                    });
                }

                return next(action); // dispatch
            } catch (err) {
                Raven.captureException(err, { // send to crash reporting tool
                    extra: {
                        action,
                        state: store.getState() // dump application state
                    }
                });
                throw err;
            }
        }
    }
}

// const ravenMiddleware = (store) => (next) => (action) => {
//     try {
//         if (action.logged) {
//             Raven.captureMessage('TP-OptiPath logged error', {
//                 extra: {
//                     action,
//                     state: store.getState()
//                 }
//             });
//         }
//
//         return next(action); // dispatch
//     } catch (err) {
//         Raven.captureException(err, { // send to crash reporting tool
//             extra: {
//                 action,
//                 state: store.getState() // dump application state
//             }
//         });
//         throw err;
//     }
// };


function getMiddleware() {
    const middlewares = applyMiddleware(thunkMiddleware, ravenMiddleware);

    return (process.env.NODE_ENV === 'production')
        ? middlewares
        : compose(middlewares,
            window.devToolsExtension ? window.devToolsExtension() : f => f);
}
export default store;