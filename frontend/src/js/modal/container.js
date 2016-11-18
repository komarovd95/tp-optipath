import {connect} from 'react-redux';

import {closeModal} from './actions';
import GlobalModal from './components/GlobalModal';

const mapStateToProps = (state) => {
    const {isOpen, modalInfo} = state.modal;
    return {isOpen, ...modalInfo}
};

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalModal)