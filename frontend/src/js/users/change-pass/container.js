import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {changePass, reset} from './actions';
import {deactivateTab} from '../../profile/actions';
import ChangePassFrom from './components/ChangePassForm';
import {validateField} from '../../util/FormUtil';


const validate = ({pass, passRepeat}) => {
    const errors = {};

    errors.pass = validateField(pass, {
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

    errors.passRepeat = validateField(passRepeat, {
        required: {
            message: 'Повторите пароль'
        },
        equalValue: {
            val: pass,
            message: 'Введенные пароли не совпадают'
        }
    });

    return errors;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    changePass: (value) => dispatch(changePass(value)),
    close: () => dispatch(deactivateTab()),
    reset: () => dispatch(reset())
});

const Form = reduxForm({
    form: 'ChangePassForm',
    validate
})(ChangePassFrom);

export default connect(mapStateToProps, mapDispatchToProps)(Form)