import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { carsListModalShow } from '../../actions/cars/CarsListModalActions';
import { carsFormOpen } from '../../actions/cars/CarsFormActions';

import CarsListFilter from '../../components/cars/list/CarsListFilter';


const getCars = (state) => state.cars.list.data.cars;
const getSelectedIndex = (state) => state.cars.list.data.selectedIndex;

const getActionsSelector = createSelector(getCars, getSelectedIndex,
    (cars, selectedIndex) => {
        const selectedCar = (selectedIndex === -1) ? null : cars[selectedIndex];

        if (!selectedCar) {
            return [];
        } else {
            return ['change', 'delete'];
        }
    });

const mapStateToProps = (state) => ({
    actionsEnabled: getActionsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    onChangeClick: (action) => dispatch(carsFormOpen(action)),
    onDeleteClick: () => dispatch(carsListModalShow())
});

export default connect(mapStateToProps, mapDispatchToProps)(CarsListFilter)
