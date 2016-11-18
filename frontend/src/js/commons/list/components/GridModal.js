import React from 'react';
import Modal from 'react-modal';
import {MODAL_STYLES} from '../constants';

export default class GridModal extends React.Component {
    constructor() {
        super();
        this.handleClose = this.handleClose.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.isOpen !== nextProps.isOpen;
    }

    handleClose() {
        this.props.onModalClose();
    }

    handleAccept() {
        this.props.onModalAccept(this.props.data);
    }

    render() {
        const {title, message, isOpen, isFetching} = this.props;

        return (
            <Modal isOpen={isOpen}
                   style={MODAL_STYLES}
                   onRequestClose={this.handleClose}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close"
                                aria-label="Close"
                                onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">{title}</h4>
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
                            {isFetching && (
                                <span className="glyphicon glyphicon-repeat normal-right-spinner"
                                      style={{ marginRight: '15px'}} />
                            )}
                            Да
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

GridModal.propTypes = {
    title: React.PropTypes.string.isRequired,
    message: React.PropTypes.element,
    isOpen: React.PropTypes.bool.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    onModalClose: React.PropTypes.func.isRequired,
    onModalAccept: React.PropTypes.func.isRequired
};
