import React from 'react';
import ReactPaginate from 'react-paginate';

export default class GridPaginate extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.totalPages !== nextProps.totalPages
            || this.props.number !== nextProps.number;
    }

    handleClick({ selected }) {
        this.props.onPageChange(selected);
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <ReactPaginate previousLabel="назад"
                               nextLabel="вперед"
                               breakLabel={<span>...</span>}
                               breakClassName="break-me"
                               pageNum={this.props.totalPages}
                               forceSelected={this.props.number}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               clickCallback={this.handleClick}
                               containerClassName="pagination"
                               subContainerClassName="pages pagination"
                               activeClassName="active" />
            </div>
        )
    }
}

GridPaginate.propTypes = {
    totalPages: React.PropTypes.number.isRequired,
    number: React.PropTypes.number.isRequired,
    onPageChange: React.PropTypes.func.isRequired
};