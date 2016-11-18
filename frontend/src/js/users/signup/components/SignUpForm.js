import React from 'react';
import {Field} from 'redux-form';
import FormField from '../../auth/components/FormField';


export default class SignUpForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        return this.props.signUp(values);
    }

    render() {
        console.log('props', this.props);
        const {handleSubmit, submitting, asyncValidating, error} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <img src="./img/logo.png" className="hidden-xs hidden-sm" />
                <h2>Регистрация</h2>

                <Field name="username" type="text" component={FormField}
                       label="Ваше имя" autoFocus={true} />
                <Field name="password" type="password" component={FormField}
                       label="Пароль" />
                <Field name="passwordRepeat" type="password"
                       component={FormField}
                       label="Повторите пароль" />

                {error && (
                    <div className="alert alert-danger">
                        <span className="glyphicon glyphicon-exclamation-sign" />
                        <span style={{ marginLeft : "10px" }}>{error}</span>
                    </div>
                )}

                <button className="btn btn-lg btn-success btn-block" type="submit"
                        disabled={submitting || asyncValidating}>
                    {(submitting || asyncValidating) && (
                        <span className="glyphicon glyphicon-repeat normal-right-spinner"
                              style={{marginRight: '15px'}} />
                    )}
                    Регистрация
                </button>
            </form>
        )
    }
}

SignUpForm.propTypes = {
    signUp: React.PropTypes.func.isRequired
};