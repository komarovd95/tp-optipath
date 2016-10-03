import React from 'react';

import ReactPaginate from 'react-paginate';

export default class ListPaginate extends React.Component {
    handleClick({ selected }) {
        this.props.setPage(selected);
    }

    render() {
        console.log(this.props);

        return (
            <ReactPaginate previousLabel="назад"
                           nextLabel="вперед"
                           breakLabel={<span>...</span>}
                           breakClassName="break-me"
                           pageNum={this.props.maxPage}
                           //initialSelected={0}
                           forceSelected={this.props.currentPage}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           clickCallback={this.handleClick.bind(this)}
                           containerClassName="pagination"
                           subContainerClassName="pages pagination"
                           activeClassName="active" />
        )
    }
}
