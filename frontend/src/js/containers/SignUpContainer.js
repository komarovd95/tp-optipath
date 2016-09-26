import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { validateField } from '../util/FormUtil';
import SignUpForm from '../components/SignUpForm';

import { signUp, checkUsername } from '../actions/AuthActions';

function validate(values) {
    const errors = {};

    const { username, password, passwordRepeat } = values;

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

    errors.passwordRepeat = validateField(passwordRepeat, {
        required: {
            message: 'Повторите пароль'
        },
        equalValue: {
            val: password,
            message: 'Введенные пароли не совпадают'
        }
    });

    return errors;
}

function asyncValidate(values, dispatch) {
    return checkUsername(values.username, dispatch);
}

function mapDispatchToProps() {
    return {
        signUpUser: signUp
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

const SignUpContainer = reduxForm({
    form: 'SignUpForm',
    validate,
    asyncValidate,
    asyncBlurFields: [ 'username' ]
})(SignUpForm);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);