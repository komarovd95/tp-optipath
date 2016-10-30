import React from 'react';

export default class TextFilter extends React.Component {
    handleChange(e) {
        this.props.onFilterChange({
            column: this.props.column,
            filterTerm: e.target.value.trim()
        })
    }

    render() {
        return (
            <div className="custom-filter">
                <input type="text" className="form-control input-sm"
                       placeholder={this.props.column.name}
                       onChange={this.handleChange.bind(this)} />
            </div>
        )
    }
}
