import React from 'react';
import shortid from 'shortid';

export function validateField(value, options) {
    const errors = [];

    if (options.required && !value) {
        return [options.required.message];
    }

    if (options.minLength && value.length < options.minLength.val) {
        errors.push(options.minLength.message);
    }

    if (options.maxLength && value.length > options.maxLength.val) {
        errors.push(options.maxLength.message);
    }

    if (options.pattern && !value.match(options.pattern.val)) {
        errors.push(options.pattern.message);
    }

    if (options.equalValue && !(value === options.equalValue.val)) {
        errors.push(options.equalValue.message);
    }

    return errors.length > 0 ? errors : null;
}

export function renderField(field) {
    const { input, label, type, meta : { touched, error }, autoFocus } = field;

    const isError = touched && error;

    return (
        <div className={`form-group ${isError ? "has-error has-feedback" : ""}`}>
            <label className="sr-only">{label}</label>
            <input {...input} placeholder={label} type={type}
                   className="form-control" autoFocus={autoFocus}/>
            {isError && <span className="glyphicon glyphicon-remove form-control-feedback" />}
            {isError &&
            <ul className="alert alert-danger">
                { error.map(e => (<li key={shortid.generate()}>{e}</li>))}
            </ul>
            }
        </div>
    )
}