import React from 'react';
import { Field } from 'redux-form';
import shortid from 'shortid';

import NumberStepper from '../common/NumberStepper';

export default class CarChangeForm extends React.Component {
    render() {
        const {
            handleSubmit, submitting, pristine, saveCar, action, close,
            brands, fuelTypes
        } = this.props;

        const isUpdate = action === 'update';
        const isAdd = action === 'add';

        const bs = brands && brands.map(b => b.brandName);
        const fs = fuelTypes && fuelTypes.map(f => f.fuelTypeName);

        return (
            <form onSubmit={handleSubmit(saveCar.bind(null, action))}
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
                                onClick={close}
                                disabled={submitting}>
                            Отмена
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

