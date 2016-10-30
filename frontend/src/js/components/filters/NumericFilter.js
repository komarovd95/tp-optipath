import React from 'react';

export default class NumericFilter extends React.Component {
    static PATTERN = /([+-]?\d+-[+-]?\d+)|((([<>]=?)|<>)?[+-]?\d+)/g;
    static CHAR_PATTERN = /[\d,-<>=]/;

    static handleKeyPress(e) {
        if (!NumericFilter.CHAR_PATTERN.test(e.key)) {
            e.preventDefault();
        }
    }

    handleChange(e) {
        const filterTerm = e.target.value.split(',')
            .map(v => v.match(NumericFilter.PATTERN)).join();

        console.log('term', filterTerm);

        this.props.onFilterChange({
            column: this.props.column,
            filterTerm
        });
    }

    render() {
        return (
            <div className="custom-filter">
                <input type="text" className="form-control input-sm"
                       placeholder="напр. 3,1-5,<15"
                       onChange={this.handleChange.bind(this)}
                       onKeyPress={NumericFilter.handleKeyPress}/>
            </div>
        )
    }
}