import React from 'react';

export default class CarListFilter extends React.Component {
    render() {
        const { actions, onDeleteClick, onChangeClick } = this.props;

        const changeAllowed = actions.includes('change');
        const deleteAllowed = actions.includes('delete');

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

CarListFilter.propTypes = {
    actions: React.PropTypes.array.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onChangeClick: React.PropTypes.func.isRequired
};
