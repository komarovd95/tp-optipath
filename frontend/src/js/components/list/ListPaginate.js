import React from 'react';
import ReactPaginate from 'react-paginate';

export default class ListPaginate extends React.Component {
    handleClick({ selected }) {
        this.props.setPage(selected);
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <ReactPaginate previousLabel="назад"
                               nextLabel="вперед"
                               breakLabel={<span>...</span>}
                               breakClassName="break-me"
                               pageNum={this.props.maxPage}
                               forceSelected={this.props.currentPage}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               clickCallback={this.handleClick.bind(this)}
                               containerClassName="pagination"
                               subContainerClassName="pages pagination"
                               activeClassName="active" />
            </div>
        )
    }
}


ListPaginate.propTypes = {
    maxPage: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    setPage: React.PropTypes.func.isRequired
};