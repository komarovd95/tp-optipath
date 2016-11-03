import React from 'react';
import Modal from 'react-modal';

export default class CarDeleteModal extends React.Component {
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

    handleClick() {
        this.props.modalAccept(this.props.selectedUser.id);
    }

    render() {
        const { modalClose: close, selectedCar, isFetching } = this.props;

        return (
            <Modal isOpen={this.props.isOpen}
                   style={CarDeleteModal.style}
                   onRequestClose={close}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" aria-label="Close"
                                onClick={close}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Удалить автомобиль</h4>
                    </div>
                    <div className="modal-body">
                        <p>
                            Вы уверены, что хотите удалить автомобиль
                            <b>
                                {selectedCar && ` ${selectedCar.brand} ${selectedCar.name} (${selectedCar.fuelType})`}
                            </b>?
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default"
                                onClick={close}>
                            Нет
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={this.handleClick.bind(this)}>
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

CarDeleteModal.propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    modalClose: React.PropTypes.func.isRequired,
    modalAccept: React.PropTypes.func.isRequired,
    selectedCar: React.PropTypes.object.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};