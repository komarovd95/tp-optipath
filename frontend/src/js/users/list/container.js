import {connect} from 'react-redux';

import {fetch, reset, select, seeProfile} from './actions';
import {getUsersArraySelector, getSelectedUserSelector} from './selectors';
import UsersList from './components/UsersList';


const mapStateToProps = (state) => {
    const {list: {data, pageable, sort, filter}} = state.users;

    return {
        ...data,
        users: getUsersArraySelector(state),
        selectedUser: getSelectedUserSelector(state),
        pageable: {
            ...pageable
        },
        sort: {
            ...sort
        },
        filter: {
            username: filter.username
        }
    }
};

const mapDispatchToProps = (dispatch) => ({
    requestData: (p, s, f) => dispatch(fetch(p, s, f)),
    resetData: () => dispatch(reset()),
    selectUser: (id) => dispatch(select(id)),
    seeProfile: () => dispatch(seeProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
