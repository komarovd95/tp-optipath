import React from 'react';
import shortid from 'shortid';

export default class AutoCompleteFilter extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: ''
        };
    }

    componentDidMount() {
        this.setState({
            selected: this.props.getValidFilterValues(this.props.column.key)[0]
        })
    }

    handleChange(e) {
        const value = e.target.value;

        this.setState({
            selected: value
        });

        this.props.onFilterChange({
            column: this.props.column,
            filterTerm: value
        });
    }

    render() {
        const options = this.props.getValidFilterValues(this.props.column.key)
            .map(v => {
                const value = (v === this.props.column.name) ? '' : v;
                return (
                    <option value={value} key={shortid.generate()}>{v}</option>
                )
            });

        return (
            <div className="custom-filter">
                <select className="form-control input-sm"
                        value={this.state.selected}
                        onChange={this.handleChange.bind(this)}>
                    {options}
                </select>
            </div>
        )
    }
}