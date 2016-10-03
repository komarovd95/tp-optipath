import { connect } from 'react-redux';

import TableFilter from '../components/TableFilter';

function mapStateToProps(state) {
    const { user: { actionsEnabled } } = state;

    return {
        actionsEnabled
    }
}

export default connect(mapStateToProps)(TableFilter)