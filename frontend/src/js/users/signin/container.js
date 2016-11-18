import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {validateField} from '../../util/FormUtil';
import SignInForm from './components/SignInForm';
import {signIn} from './actions';


const mapDispatchToProps = (dispatch) => ({
    signIn: (redirectUrl, credentials) => dispatch(signIn(redirectUrl, credentials))
});

const validate = ({username, password}) => {
    const errors = {};

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
            message: 'Имя содержит недопустимые символы (допустимы a-zA-Z0-9)'
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
            message: 'Пароль содержит недопустимые символы (допустимы a-zA-Z0-9)'
        }
    });

    return errors;
};

const Form = reduxForm({
    form: 'SignUpForm',
    validate
})(SignInForm);

export default connect(null, mapDispatchToProps)(Form)