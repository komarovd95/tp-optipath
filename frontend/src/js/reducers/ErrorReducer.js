const INITIAL_STATE = {
    error: null,
    dismissable: true
};

export default function errorReducer(state = INITIAL_STATE, action) {
    if (action.error && action.globalError) {
        console.log('Error', action.error);

        return {
            ...state,
            error: action.error,
            dismissable: action.payload
        }
    }

    if (action.type === 'RESET_ERROR') {
        return INITIAL_STATE;
    }

    return state
}
