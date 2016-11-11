import React from 'react';
import { Field } from 'redux-form';
import shortid from 'shortid';

import NumberStepper from '../../common/NumberStepper';

export default class CarsForm extends React.Component {
    render() {
        const {
            handleSubmit, submitting, pristine,
            action, onSaveClick, onCloseClick,
            brands, fuelTypes
        } = this.props;

        const isUpdate = action === 'update';
        const isAdd = action === 'add';

        const bs = brands && brands.map(b => b.brandName);
        const fs = fuelTypes && fuelTypes.map(f => f.fuelTypeName);

        return (
            <form onSubmit={handleSubmit(onSaveClick.bind(null, action))}
                  className="form-horizontal">
                <Field name="brand" label="Марка"
                       options={bs}
                       component={isAdd ? renderSelect : renderer}
                       placeholder="Выберите марку"
                       disabled={isUpdate} />
                <Field name="name" label="Модель" component={renderer}
                       disabled={isUpdate} />
                <Field name="fuelType" label="Тип топлива"
                       options={fs}
                       component={isAdd ? renderSelect : renderer}
                       placeholder="Выберите тип топлива"
                       disabled={isUpdate} />
                <Field name="fuelConsumption" label="Расход"
                       min={5.0} max={50.0} step={0.1} fixed={1}
                       component={renderNumber} />
                <Field name="maxVelocity" label="Макс. скорость"
                       min={50} max={500} step={1} fixed={1}
                       component={renderNumber} />

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-4">
                        <button type="submit" className="btn btn-primary"
                                style={{marginRight: "10px"}}
                                disabled={pristine || submitting}>
                            { submitting &&
                            <span className="glyphicon glyphicon-repeat normal-right-spinner"
                                  style={{ marginRight: '15px'}} />
                            }
                            Сохранить
                        </button>
                        <button type="button" className="btn btn-default"
                                onClick={onCloseClick}
                                disabled={submitting}>
                            Отмена
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

CarsForm.propTypes = {
    action: React.PropTypes.string,
    brands: React.PropTypes.array,
    fuelTypes: React.PropTypes.array,
    onSaveClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired
};

function renderer(field) {
    const { name, label, input, disabled, meta : { touched, error } } = field;

    const hasError = touched && error;

    return (
        <div className={`form-group ${hasError && 'has-error has-feedback'}`}>
            <label className="control-label col-sm-2" htmlFor={name}>
                {label}
            </label>
            <div className="col-sm-4">
                <input type="text" {...input} className="form-control" id={name}
                       disabled={disabled} />
                {hasError &&
                    error.map(e =>
                        <span className="help-inline text-danger"
                              key={shortid.generate()}>
                                {e}
                            </span>
                    )
                }
            </div>
        </div>
    )
}

function renderSelect(field) {
    const {
        name, label, input, options, placeholder, meta : { touched, error }
    } = field;

    const hasError = touched && error;

    return (
        <div className={`form-group ${hasError && 'has-error has-feedback'}`}>
            <label className="control-label col-sm-2" htmlFor={name}>
                {label}
            </label>
            <div className="col-sm-4">
                <select className="form-control" id={name} {...input}>
                    <option value="">{placeholder}</option>
                    {options && options.map(o =>
                        <option value={o} key={shortid.generate()}>{o}</option>)
                    }
                </select>
                {hasError &&
                error.map(e =>
                    <span className="help-inline text-danger"
                          key={shortid.generate()}>
                            {e}
                        </span>
                )
                }
            </div>
        </div>
    )
}

function renderNumber(field) {
    const { name, label, meta : { touched, error }, ...rest } = field;

    const hasError = touched && error;

    return (
        <div className={`form-group ${hasError && 'has-error has-feedback'}`}>
            <label className="control-label col-sm-2" htmlFor={name}>
                {label}
            </label>
            <div className="col-sm-4">
                <NumberStepper  name={name} hasError={hasError} {...rest} />
                {hasError &&
                error.map(e =>
                    <span className="help-inline text-danger"
                          key={shortid.generate()}>
                            {e}
                        </span>
                )
                }
            </div>
        </div>
    )
}
