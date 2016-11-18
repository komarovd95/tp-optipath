import React from 'react';
import {Field} from 'redux-form';
import PasswordField from './PasswordField';

export default class ChangePassForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    handleSubmit(values) {
        return this.props.changePass(values);
    }

    handleClose() {
        this.props.close();
    }

    render() {
        const {handleSubmit, submitting, pristine} = this.props;

        return (
            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <form onSubmit={handleSubmit(this.handleSubmit)}>
                        <Field name="pass" label="Новый пароль"
                               component={PasswordField} />
                        <Field name="passRepeat" label="Повторите пароль"
                               component={PasswordField} />

                        <button type="submit" className="btn btn-primary"
                                style={{marginRight: "10px"}}
                                disabled={pristine || submitting}>
                            {submitting &&
                            <span className="glyphicon glyphicon-repeat normal-right-spinner"
                                  style={{ marginRight: '15px'}} />
                            }
                            Сохранить
                        </button>
                        <button type="button" className="btn btn-default"
                                disabled={submitting}
                                onClick={this.handleClose}>
                            Отмена
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

ChangePassForm.propTypes = {
    changePass: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired
};