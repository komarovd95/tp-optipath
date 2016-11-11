const INITIAL_STATE = {
    error: null,
    dismissable: true
};

export default function errorReducer(state = INITIAL_STATE, action) {
    if (action.globalError || (action.payload && action.payload.globalError)) {
        console.log('Error', action.error);

        return {
            ...state,
            error: action.error || action.payload.error,
            dismissable: action.payload
        }
    }

    if (action.type === 'RESET_ERROR') {
        return INITIAL_STATE;
    }

    return state
}
