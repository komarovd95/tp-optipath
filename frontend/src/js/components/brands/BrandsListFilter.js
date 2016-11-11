import React from 'react';
import shortid from 'shortid';

import { validateField } from '../../util/FormUtil';

export default class BrandsListFilter extends React.Component {
    static validate(brandName) {
        return validateField(brandName, {
            required: {
                message: 'Название марки не может быть пустым'
            },
            minLength: {
                val: 1,
                message: 'Название марки не может быть пустым'
            },
            maxLength: {
                val: 50,
                message: 'Название марки не может быть длиннее 50 символов'
            },
            pattern: {
                val: /^[а-яА-ЯЁёa-zA-Z\d\s]+$/,
                message: 'Название марки содержит недопустимые символы'
            }
        });
    }

    constructor() {
        super();
        this.state = {
            value: '',
            errors: null
        };
    }

    handleChange(e) {
        const value = e.target.value;
        const errors = BrandsListFilter.validate(value);

        this.setState({ value, errors });

        if (!errors || errors == 0 || value === '') {
            this.props.onFilterChange({ brandName: e.target.value });
        }
    }

    handleClick(action, brandName) {
        this.props.onAddClick(action, { brandName });
    }

    render() {
        const { actionsEnabled, onDeleteClick } = this.props;

        const addDisabled = !actionsEnabled.includes('add');
        const changeDisabled = !actionsEnabled.includes('save');
        const deleteDisabled = !actionsEnabled.includes('delete');

        const hasError = this.state.errors && this.state.errors.length > 0
            && !addDisabled;

        return (
            <div className="row filter-row">
                <div className="col-sm-12 col-md-6 col-lg-5">
                    <div className={`input-group ${hasError && 'has-error'}`}>
                        <input type="text" name="filter" className="form-control"
                               placeholder="Название марки"
                               onChange={this.handleChange.bind(this)} />

                        <span className="input-group-btn">
                            <button className="btn btn-success" type="button"
                                    onClick={this.handleClick.bind(this, 'add',
                                        this.state.value)}
                                    disabled={addDisabled || hasError}>
                                <span className="glyphicon glyphicon-plus"
                                      style={{ marginRight: '5px' }}/>
                                Добавить
                            </button>
                        </span>
                    </div>
                    {hasError &&
                    this.state.errors.map(e =>
                        <span className="help-block text-danger"
                              style={{ color: '#a94442' }}
                              key={shortid.generate()}>
                                {e}
                            </span>
                    )
                    }
                </div>
                <div className="col-sm-12 col-md-4 col-md-offset-2 col-lg-3 col-lg-offset-4">
                    <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-default"
                                    disabled={changeDisabled}
                                    onClick={this.handleClick.bind(this, 'save', null)}>
                                Сохранить
                            </button>
                        </div>
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-danger"
                                    disabled={deleteDisabled}
                                    onClick={onDeleteClick}>
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

BrandsListFilter.propTypes = {
    actionsEnabled: React.PropTypes.array.isRequired,
    onAddClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onFilterChange: React.PropTypes.func.isRequired
};
