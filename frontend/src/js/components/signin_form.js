import React from 'react';
import { Field } from 'redux-form';
import shortid from 'shortid';


const renderInput = field => {
    const { input, label, type, meta : { touched, error }, autoFocus } = field;

    return (
        <div className={`form-group ${touched && error ? "has-error has-feedback" : ""}`}>
            <label className="sr-only">{label}</label>
            <input {...input} placeholder={label} type={type} className="form-control" autoFocus={!!autoFocus} />
            {touched && error && <span className="glyphicon glyphicon-remove form-control-feedback" />}
            {touched && error &&
                <ul className="alert alert-danger">{ error.map(e => (<li key={shortid.generate()}>{e}</li>))}</ul>
            }
        </div>
    )
};

export default class SignInForm extends React.Component {
    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.props.signInUser)}>
                <h2>Вход в учетную запись</h2>

                <Field name="username" type="text" component={renderInput} label="Ваше имя" autoFocus={true}/>
                <Field name="password" type="password" component={renderInput} label="Пароль" />

                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={submitting}>
                    Войти
                </button>
            </form>
        )
    }
}
