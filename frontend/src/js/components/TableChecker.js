import React from 'react';

export default class TableChecker extends React.Component {
    handleClick() {
        const { userId, currentId, rowData } = this.props;

        if (currentId === rowData.id) {
            this.props.enableUserActions(null, []);
        } else if (userId === rowData.id) {
            this.props.enableUserActions(rowData.id, ['changePass']);
        } else if (rowData.roles !== 'Администратор') {
            this.props.enableUserActions(rowData.id,
                ['changePass', 'changeRole', 'delete']);
        } else {
            this.props.enableUserActions(rowData.id, []);
        }
    }

    render() {
        const { currentId, rowData } = this.props;
        const checkedClass = (currentId === rowData.id)
            ? 'btn-success active'
            : 'btn-default';

        return (
            <button id={'checker' + rowData.id}
                    className={"btn btn-xs " + checkedClass}
                    onClick={this.handleClick.bind(this)}
                    style={{ width: 'auto', margin: 'auto' }}>
                <span className="glyphicon glyphicon-none" />
            </button>
        )
    }
}