import React from 'react';
import Modal from 'react-modal';

export default class DeleteModal extends React.Component {
    static style = {
        overlay: {
            zIndex: 1030
        },
        content: {
            background: 'transparent',
            border: 'transparent',
            outline: 0,
            width: '300px',
            top: '30%',
            left: '50%',
            bottom: 0,
            right: 0,
            marginLeft: '-75px',
            marginRight: '-75px'
        }
    };

    render() {
        const {
            title, message, isOpen, onModalAccept, onModalClose, data, isFetching
        } = this.props;

        return (
            <Modal isOpen={isOpen} style={DeleteModal.style}
                   onRequestClose={onModalClose}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" aria-label="Close"
                                onClick={onModalClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="modal-body">
                        {message && message(data)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default"
                                onClick={onModalClose}>
                            Нет
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={onModalAccept.bind(null, data)}>
                            { isFetching && (
                                <span className="glyphicon glyphicon-repeat normal-right-spinner"
                                      style={{ marginRight: '15px'}} />
                            ) }
                            Да
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

DeleteModal.propTypes = {
    title: React.PropTypes.string.isRequired,
    data: React.PropTypes.object,
    message: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    onModalClose: React.PropTypes.func.isRequired,
    onModalAccept: React.PropTypes.func.isRequired
};