import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { validateField } from '../../util/FormUtil';
import {
    carsFormClose, carsFormCheck, carsFormSave
} from '../../actions/cars/CarsFormActions';

import CarsForm from '../../components/cars/form/CarsForm';


function validate(values) {
    const errors = {};

    errors.fuelConsumption = validateField(values.fuelConsumption, {
        required: {
            message: 'Введите расход топлива в литрах'
        },
        min: {
            val: 5.0,
            message: 'Минимальный расход: 5 литров'
        },
        max: {
            val: 50.0,
            message: 'Максимальная расход: 50 литров'
        },
        pattern: {
            val: /^[-+]?[0-9]*\.?[0-9]+$/,
            message: 'Число содержит недопустимые символы'
        }
    });

    errors.maxVelocity = validateField(values.maxVelocity, {
        required: {
            message: 'Введите максимальную скорость в км/ч'
        },
        min: {
            val: 50.0,
            message: 'Минимально допустимая скорость: 50 км/ч'
        },
        max: {
            val: 500.0,
            message: 'Максимально допустимая скорость: 500 км/ч'
        },
        pattern: {
            val: /^[-+]?[0-9]*\.?[0-9]+$/,
            message: 'Число содержит недопустимые символы'
        }
    });

    errors.brand = validateField(values.brand, {
        required: {
            message: 'Выберите марку'
        }
    });

    errors.fuelType = validateField(values.fuelType, {
        required: {
            message: 'Выберите тип топлива'
        }
    });

    errors.name = validateField(values.name, {
        required: {
            message: 'Введите название модели'
        },
        maxLength: {
            val: 50,
            message: 'Название модели не должно быть длиннее 50 символов'
        },
        pattern: {
            val: /[а-яА-ЯЁёa-zA-Z\d\s]+/,
            message: 'Название содержит недопустимые символы'
        }
    });

    return errors;
}

function asyncValidate(values, dispatch, { action }) {
    return dispatch(carsFormCheck({
        brand: values.brand,
        name: values.name,
        fuelType: values.fuelType
    }, action))
}

const mapStateToProps = (state) => {
    const { action, car: initialValues } = state.cars.form;
    const { brands, fuelTypes } = state.cars.cache;

    return {
        initialValues,
        action,
        brands,
        fuelTypes
    }
};

const mapDispatchToProps = (dispatch) => ({
    onSaveClick: (action, car) => dispatch(carsFormSave(car, action)),
    onCloseClick: () => dispatch(carsFormClose())
});

const Form = reduxForm({
    form: 'CarsEditForm',
    validate,
    asyncValidate,
    asyncBlurFields: ['brand', 'name', 'fuelType']
})(CarsForm);


export default connect(mapStateToProps, mapDispatchToProps)(Form);
