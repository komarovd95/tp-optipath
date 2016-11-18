import React from 'react';
import shortid from 'shortid';

export default class FormField extends React.Component {
    render() {
        const {
            input, label, type, meta: {touched, error, asyncValidating}, autoFocus
        } = this.props;

        const hasError = touched && error;

        return (
            <div className={`form-group ${hasError && 'has-error has-feedback'}`}>
                <label className="sr-only">{label}</label>
                <input {...input} placeholder={label} type={type}
                       className="form-control" autoFocus={autoFocus}/>
                {asyncValidating ? (
                    <span className="glyphicon glyphicon-repeat form-control-feedback normal-right-spinner"/>
                ) : (hasError &&
                    <span className="glyphicon glyphicon-remove form-control-feedback" />
                )}
                {hasError &&
                    <ul className="alert alert-danger">
                        { error.map(e => (<li key={shortid.generate()}>{e}</li>))}
                    </ul>
                }
            </div>
        )
    }
}
