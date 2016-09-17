import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import validateField from '../util/validate_field';

import { signIn, signInSuccess, signInFailure } from '../actions/signin_actions';

import SignInForm from '../components/signin_form';

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


const validateAndSignIn = (values, dispatch) => {
    console.log('Login...');
    console.log(values);

    return new Promise((resolve, reject) => {
        dispatch(signIn(values))
            .then(response => {
                const data = response.payload.data;

                if (response.payload.status != 200) {
                    dispatch(signInFailure(response.payload));
                    reject(data);
                } else {
                    // session storage
                    dispatch(signInSuccess(response.payload));
                    resolve();
                }
            });
    })
};


const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: validateAndSignIn
    }
};

const SignInContainer = reduxForm({
    form: 'SignInForm',
    validate
});

function mapStateToProps(state) {
    return {
        user: state.signIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer(SignInForm));