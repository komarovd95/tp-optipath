import React from 'react';

import { CHANGE_PASS, CHANGE_ROLE, DELETE_USER } from '../constants';

export default class UsersToolbar extends React.PureComponent {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePassClick = this.handleChangePassClick.bind(this);
        this.handleChangeRoleClick = this.handleChangeRoleClick.bind(this);
        this.handleDeleteUserClick = this.handleDeleteUserClick.bind(this);
    }

    handleChange(e) {
        this.props.onFilterChange(e.target.value);
    }

    handleChangePassClick() {
        this.props.onChangePassClick();
    }

    handleChangeRoleClick() {
        this.props.onChangeRoleClick();
    }

    handleDeleteUserClick() {
        this.props.onDeleteUserClick();
    }

    render() {
        const { filter, actionsEnabled } = this.props;

        const changePassDisabled = !actionsEnabled.includes(CHANGE_PASS);
        const changeRoleDisabled = !actionsEnabled.includes(CHANGE_ROLE);
        const deleteUserDisabled = !actionsEnabled.includes(DELETE_USER);

        return (
            <div className="row filter-row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <input type="text" name="filter"
                           className="form-control"
                           defaultValue={filter}
                           onChange={this.handleChange}
                           placeholder="Имя пользователя" />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 col-lg-offset-2">
                    <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-default"
                                    disabled={changePassDisabled}
                                    onClick={this.handleChangePassClick}>
                                Сменить пароль
                            </button>
                        </div>
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-default"
                                    disabled={changeRoleDisabled}
                                    onClick={this.handleChangeRoleClick}>
                                Сменить роль
                            </button>
                        </div>
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-danger"
                                    disabled={deleteUserDisabled}
                                    onClick={this.handleDeleteUserClick}>
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UsersToolbar.propTypes = {
    filter: React.PropTypes.string,
    actionsEnabled: React.PropTypes.array.isRequired,
    onFilterChange: React.PropTypes.func.isRequired,
    onChangePassClick: React.PropTypes.func.isRequired,
    onChangeRoleClick: React.PropTypes.func.isRequired,
    onDeleteUserClick: React.PropTypes.func.isRequired
};
