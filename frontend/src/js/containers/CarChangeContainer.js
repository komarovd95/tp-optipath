import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { validateField } from '../util/FormUtil';
import CarChangeForm from '../components/cars/CarChangeForm';
import { saveCar, closeCarChange, checkCarExists } from '../actions/CarActions';

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
    return dispatch(checkCarExists({
        brand: values.brand,
        name: values.name,
        fuelType: values.fuelType
    }, action))
}

function mapStateToProps(state) {
    const { action, car } = state.carChange;
    const { brands, fuelTypes } = state.carCache;

    const initialValues = { ... car };

    if (!initialValues.maxVelocity) {
        initialValues.maxVelocity = 50;
    }

    if (!initialValues.fuelConsumption) {
        initialValues.fuelConsumption = 5.0;
    }

    return {
        action,
        initialValues,
        brands,
        fuelTypes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveCar: (action, data) => dispatch(saveCar(action, data)),
        close: () => dispatch(closeCarChange())
    }
}

const Form = reduxForm({
    form: 'CarChangeForm',
    validate,
    asyncValidate,
    asyncBlurFields: ['brand', 'name', 'fuelType']
})(CarChangeForm);


export default connect(mapStateToProps, mapDispatchToProps)(Form);