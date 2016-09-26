import React from 'react';
import { Field } from 'redux-form';

import { renderField } from '../util/FormUtil';

export default class SignUpForm extends React.Component {
    render() {
        const { handleSubmit, submitting, error, signUpUser, auth } = this.props;

        return (
            <form onSubmit={handleSubmit(signUpUser.bind(this))}>
                <h2>Регистрация</h2>

                <Field name="username" type="text" component={renderField}
                       label="Ваше имя" autoFocus={true} />
                <Field name="password" type="password" component={renderField}
                       label="Пароль" />
                <Field name="passwordRepeat" type="password" component={renderField}
                       label="Повторите пароль" />

                { error && (
                    <div className="alert alert-danger">
                        <span className="glyphicon glyphicon-exclamation-sign" />
                        <span style={{ marginLeft : "10px" }}>{ error }</span>
                    </div>
                ) }

                <button className="btn btn-lg btn-success btn-block" type="submit"
                        disabled={submitting}>
                    { auth.isFetching && (
                        <span className="glyphicon glyphicon-repeat normal-right-spinner"
                              style={{ marginRight: '15px'}} />
                    ) }
                    Регистрация
                </button>
            </form>
        )
    }
}
