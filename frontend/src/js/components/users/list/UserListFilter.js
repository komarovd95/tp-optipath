import React from 'react';

export default class UserListFilter extends React.Component {
    handleChange(e) {
        this.props.onFilterChange(e.target.value);
    }

    render() {
        const { actionsEnabled, onDeleteClick, placeholder } = this.props;

        const changePassDisabled = !actionsEnabled.includes('changePass');
        const changeRoleDisabled = !actionsEnabled.includes('changeRole');
        const deleteDisabled = !actionsEnabled.includes('delete');

        return (
            <div className="row filter-row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <input type="text" name="filter" className="form-control"
                           placeholder={placeholder}
                           onChange={this.handleChange.bind(this)} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 col-lg-offset-2">
                    <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-default"
                                    disabled={changePassDisabled}>
                                Сменить пароль
                            </button>
                        </div>
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-default"
                                    disabled={changeRoleDisabled}>
                                Сменить роль
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

UserListFilter.propTypes = {
    actionsEnabled: React.PropTypes.array.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onFilterChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string
};