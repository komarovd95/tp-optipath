import React from 'react';
import shortid from 'shortid';

export default class PasswordField extends React.Component {
    render() {
        const {name, label, input, meta: {touched, error}} = this.props;

        const hasError = touched && error;

        return (
            <div className={`form-group ${hasError && 'has-error has-feedback'}`}>
                <label htmlFor={name}>{label}</label>
                <input id={name} type="password" {...input}
                       className="form-control"
                       placeholder={label} />
                {hasError &&
                    error.map(e =>
                        <span className="help-block text-danger"
                              key={shortid.generate()}>
                                    {e}
                        </span>
                    )
                }
            </div>
        )
    }
}