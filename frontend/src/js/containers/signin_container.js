import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import validateField from '../util/validate_field';

import { signIn, signInSuccess, signInFailure, principalRequest } from '../actions/signin_actions';
import transformUrl from '../util/call_api';

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
    return dispatch(signIn(values))
        .then(response => {
            console.log("START");
            console.log(response);

            const status = response.error ? response.payload.response.status : response.payload.status;

            if (status === 200) {
                dispatch(principalRequest())
                    .then(principalResponse => {
                        if (principalResponse.payload.status === 200) {
                            dispatch(signInSuccess(principalResponse.payload.data));
                            const url = response.payload.request.responseURL;
                            browserHistory.push(transformUrl(url));
                        } else {
                            dispatch(signInFailure(principalResponse.payload));
                            alert('Не удалось войти в систему. Повторите запрос позже');
                        }
                    });
            } else {
                dispatch(signInFailure(response.payload));
                if (status === 401) {
                    throw new SubmissionError({ _error : response.payload.response.data.message });
                } else {
                    alert('Непредвиденная ошибка на сервере. Повторите запрос позже');
                }
            }
        });
};


function mapDispatchToProps() {
    return {
        signInUser: validateAndSignIn
    }
}

function mapStateToProps(state) {
    return {
        user: state.signIn
    }
}

const SignInContainer = reduxForm({
    form: 'SignInForm',
    validate
})(SignInForm);


export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);