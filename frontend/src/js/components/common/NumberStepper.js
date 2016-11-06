import React from 'react';

export default class NumberStepper extends React.Component {
    static CHAR_PATTERN = /[\d+-.]/;

    handleClick(action) {
        const {
            input : { value, onChange }, hasError, min, max, step, fixed
        } = this.props;

        if (!hasError) {
            const number = Number.parseFloat(value);

            let result;
            if (action === 'ADD' && (number + step <= max)) {
                result = number + step;
            } else if (action === 'SUB' && (number - step >= min)) {
                result = number - step;
            }

            if (result || result == 0) {
                if (Number.isInteger(result)) {
                    onChange(result + '');
                } else {
                    onChange(result.toFixed(fixed) + '');
                }
            }
        }
    }

    handleMouseDown(action) {
        this.mouseTimeout = setTimeout(() => {
            this.mouseDown = setInterval(() => {
                this.handleClick(action);
            }, 50)
        }, 400);
    }

    handleMouseUp() {
        clearTimeout(this.mouseTimeout);
        clearInterval(this.mouseDown)
    }

    handleKeyPress(e) {
        if (!NumberStepper.CHAR_PATTERN.test(e.key)) {
            e.preventDefault();
        }
    }

    render() {
        const { name, input } = this.props;

        return (
            <div className="input-group spinner">
                <input type="text" {...input} name={name} className="form-control"
                       onKeyPress={this.handleKeyPress.bind(this)} />
                <div className="input-group-btn-vertical">
                    <button className="btn btn-default dropup" type="button"
                            onClick={this.handleClick.bind(this, 'ADD')}
                            onMouseDown={this.handleMouseDown.bind(this, 'ADD')}
                            onMouseUp={this.handleMouseUp.bind(this)}
                            onMouseLeave={this.handleMouseUp.bind(this)}>
                        <i className="caret" />
                    </button>
                    <button className="btn btn-default" type="button"
                            onClick={this.handleClick.bind(this, 'SUB')}
                            onMouseDown={this.handleMouseDown.bind(this, 'SUB')}
                            onMouseUp={this.handleMouseUp.bind(this)}
                            onMouseLeave={this.handleMouseUp.bind(this)}>
                        <i className="caret" />
                    </button>
                </div>
            </div>
        )
    }
}
