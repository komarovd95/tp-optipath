import { connect } from 'react-redux';

import CarListFilter from '../components/cars-list/CarListFilter';

function mapStateToProps(state) {
    return {
        actions: state.car.actions
    }
}

export default connect(mapStateToProps)(CarListFilter)