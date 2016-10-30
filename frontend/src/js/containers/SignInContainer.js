import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { validateField } from '../util/FormUtil';
import SignInForm from '../components/auth/SignInForm';

import { signIn } from '../actions/AuthActions';

function validate(values) {
    const errors = {};

    const { username, password } = values;

    errors.username = validateField(username, {
        required: {
            message: 'Заполните имя'
        },
        minLength: {
            val: 4,
            message: 'Минимальная длина имени: 4 символа'
        },
        maxLength: {
            val: 20,
            message: 'Максимальная длина имени: 20 символов'
        },
        pattern: {
            val: /^[a-zA-Z0-9]+$/,
            message: 'Имя содержит недопустимые символы'
        }
    });

    errors.password = validateField(password, {
        required: {
            message: 'Заполните пароль'
        },
        minLength: {
            val: 4,
            message: 'Минимальная длина пароля: 4 символа'
        },
        maxLength: {
            val: 20,
            message: 'Максимальная длина пароля: 20 символов'
        },
        pattern: {
            val: /^[a-zA-Z0-9]+$/,
            message: 'Пароль содержит недопустимые символы'
        }
    });

    return errors;
}

function mapDispatchToProps(dispatch) {
    return {
        signInUser: (next, values) => dispatch(signIn(next, values))
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

const SignInContainer = reduxForm({
    form: 'SignInForm',
    validate
})(SignInForm);


export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);