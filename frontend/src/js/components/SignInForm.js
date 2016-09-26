import React from 'react';
import { Field } from 'redux-form';

import { renderField } from '../util/FormUtil';

export default class SignInForm extends React.Component {
    render() {
        const {
            handleSubmit, submitting, error, signInUser, location, auth
        } = this.props;

        const nextPath = location.state ? location.state.nextPathname : undefined;

        return (
            <form onSubmit={handleSubmit(signInUser.bind(this, nextPath))}>
                <h2>Вход в учетную запись</h2>

                <Field name="username" type="text" component={renderField}
                       label="Ваше имя" autoFocus={true} />
                <Field name="password" type="password" component={renderField}
                       label="Пароль" />

                { error && (
                    <div className="alert alert-danger">
                        <span className="glyphicon glyphicon-exclamation-sign" />
                        <span style={{ marginLeft : "10px" }}>{ error }</span>
                    </div>
                ) }

                <button className="btn btn-lg btn-primary btn-block" type="submit"
                        disabled={submitting}>
                    { auth.isFetching && (
                        <span className="glyphicon glyphicon-repeat normal-right-spinner"
                              style={{ marginRight: '15px'}} />
                    ) }
                    Войти
                </button>
            </form>
        )
    }
}
