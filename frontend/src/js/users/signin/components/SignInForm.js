import React from 'react';
import {Field} from 'redux-form';
import FormField from '../../auth/components/FormField';


export default class SignInForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const {location, signIn} = this.props;
        const nextPath = location.state ? location.state.nextPathname : undefined;

        return signIn(nextPath, values);
    }

    render() {
        const {handleSubmit, submitting, error} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <img src="./img/logo.png" className="hidden-xs hidden-sm"/>
                <h2>Вход в учетную запись</h2>

                <Field name="username" type="text" component={FormField}
                       label="Ваше имя" autoFocus={true} />
                <Field name="password" type="password" component={FormField}
                       label="Пароль" />

                {error && (
                    <div className="alert alert-danger">
                        <span className="glyphicon glyphicon-exclamation-sign" />
                        <span style={{marginLeft : "10px"}}>{error}</span>
                    </div>
                )}

                <button type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        disabled={submitting}>
                    {submitting && (
                        <span className="glyphicon glyphicon-repeat normal-right-spinner"
                              style={{marginRight: '15px'}} />
                    )}
                    Войти
                </button>
            </form>
        )
    }
}

SignInForm.propTypes = {
    signIn: React.PropTypes.func.isRequired
};