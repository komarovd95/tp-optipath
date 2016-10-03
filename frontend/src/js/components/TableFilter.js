import React from 'react';

export default class TableFilter extends React.Component {
    handleChange(event) {
        this.props.changeFilter(event.target.value);
    }

    render() {
        const { actionsEnabled } = this.props;
        const changePassDisabled = !actionsEnabled.includes('changePass');
        const changeRoleDisabled = !actionsEnabled.includes('changeRole');
        const deleteDisabled = !actionsEnabled.includes('delete');

        return (
            <div className="filter-container">
                <input type="text" name="filter" className="form-control"
                       placeholder={this.props.placeholderText}
                       onChange={this.handleChange.bind(this)} />

                <div className="table-btn-group">
                    <button className="btn btn-default" disabled={changePassDisabled}>
                        Сменить пароль
                    </button>
                    <button className="btn btn-default" disabled={changeRoleDisabled}>
                        Изменить роль
                    </button>
                    <button className="btn btn-danger" disabled={deleteDisabled}>
                        Удалить
                    </button>
                </div>
            </div>
        )
    }
}