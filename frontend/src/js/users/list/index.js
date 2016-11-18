import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import container from './container';

export const UsersListReducer = reducer;
export const UsersListActions = actions;
export const UsersListSelectors = selectors;

export default container;