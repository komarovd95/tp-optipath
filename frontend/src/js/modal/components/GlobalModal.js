import React from 'react';
import Modal from 'react-modal';

import {MODAL_STYLES} from '../constants';


export default class GlobalModal extends React.Component {
    static checkProps({component, title, message}) {
        if (!(component || (title && message))) {
            throw new Error();
        }
    }

    constructor() {
        super();
        this.state = {
            pending: false
        };
        this.handleAccept = this.handleAccept.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleAccept() {
        return new Promise(resolve => {
            this.setState({pending: true});
            if (this.props.accept) {
                resolve(this.props.accept())
            } else {
                resolve();
            }
        }).then(() => {
            this.setState({
                pending: false
            });
            this.handleClose()
        });
    }

    handleClose() {
        this.props.close();
        this.setState({
            pending: false
        });
    }

    _render({title, message}) {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close"
                            aria-label="Close"
                            onClick={this.handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">
                        {title}
                    </h4>
                </div>
                <div className="modal-body">
                    {message}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default"
                            onClick={this.handleClose}>
                        Нет
                    </button>
                    <button type="button" className="btn btn-primary"
                            onClick={this.handleAccept}>
                        {this.state.pending && (
                            <span className="glyphicon glyphicon-repeat normal-right-spinner"
                                  style={{ marginRight: '15px'}} />
                        )}
                        Да
                    </button>
                </div>
            </div>
        )
    }

    render() {
        const {isOpen, component, ...props} = this.props;

        if (isOpen) {
            GlobalModal.checkProps(this.props);
            return (
                <Modal isOpen={true}
                       style={MODAL_STYLES}
                       onRequestClose={this.handleClose}>
                    {component
                        ? React.cloneElement(component, {...props})
                        : this._render(this.props)
                    }
                </Modal>
            )
        } else {
            return null;
        }
    }
}

GlobalModal.propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    component: React.PropTypes.element,
    title: React.PropTypes.node,
    message: React.PropTypes.node,
    accept: React.PropTypes.func,
    close: React.PropTypes.func.isRequired
};
