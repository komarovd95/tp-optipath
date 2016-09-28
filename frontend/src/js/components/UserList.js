import React from 'react';
import ReactPaginate from 'react-paginate';
import shortid from 'shortid';

export default class UserList extends React.Component {
    constructor() {
        super();
        this.request = this.request.bind(this);
    }

    request({ selected: page }) {
        const { requestList, user: { pageable } } = this.props;

        const height = jQuery('#user-panel').height();
        const pageSize = Math.floor((height - 153) / 37);

        requestList({ ...pageable, number: page, size: pageSize });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { user: { users, isFetching, pageable } } = this.props;

        console.log(isFetching);

        return (
            <div className="user-list">
                <div id="user-panel" className="panel panel-default">
                    <div className="panel-heading">Пользователи OptiPath</div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Имя пользователя</th>
                                <th>Последнее обновление</th>
                                <th>{ isFetching ? 'Роль ff' : 'Role'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            { !isFetching && users && users.map(renderListItem) }
                            { isFetching && (
                                <tr>
                                    <td colSpan="4">Загрузка данных...</td>
                                </tr>
                            ) }
                        </tbody>
                    </table>
                    <ReactPaginate previousLabel="назад"
                                   nextLabel="вперед"
                                   breakLabel={<a href="">...</a>}
                                   breakClassName="break-me"
                                   pageNum={pageable.totalPages}
                                   initialSelected={pageable.number}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   clickCallback={this.request}
                                   containerClassName="pagination"
                                   subContainerClassName="pages pagination"
                                   activeClassName="active" />
                </div>
            </div>
        )
    }
}

const renderListItem = (user) => {
    return (
        <tr key={shortid.generate()}>
            <td key={shortid.generate()}>1</td>
            <td key={shortid.generate()}>{user.username}</td>
            <td key={shortid.generate()}>
                {new Date(user.updatedAt).toLocaleDateString()}
            </td>
            <td key={shortid.generate()}>{createUserRole(user.roles)}</td>
        </tr>
    )
};

const createUserRole = (roles) => {
    return roles.find(r => r === 'ROLE_ADMIN') ? 'Администратор' : 'Пользователь'
};
