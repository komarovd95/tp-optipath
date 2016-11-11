import React from 'react';

export default class CarsListFilter extends React.Component {
    render() {
        const { actionsEnabled, onDeleteClick, onChangeClick } = this.props;

        const changeAllowed = actionsEnabled.includes('change');
        const deleteAllowed = actionsEnabled.includes('delete');

        return (
            <div className="row filter-row">
                <div className="col-sm-12 col-md-8 col-md-offset-4 col-lg-6 col-lg-offset-6">
                    <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                            <button type="button" className="btn btn-default"
                                    onClick={this.props.onToggleFilter}>
                                <span className="glyphicon glyphicon-filter"
                                      style={{ marginRight: '5px'}}/>
                                Фильтр
                            </button>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-default"
                                    onClick={onChangeClick.bind(null, 'add')}>
                                Добавить
                            </button>
                        </div>
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-default"
                                    disabled={!changeAllowed}
                                    onClick={onChangeClick.bind(null, 'update')}>
                                Изменить
                            </button>
                        </div>
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-danger"
                                    disabled={!deleteAllowed}
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

CarsListFilter.propTypes = {
    actionsEnabled: React.PropTypes.array.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onChangeClick: React.PropTypes.func.isRequired,
    onToggleFilter: React.PropTypes.func
};