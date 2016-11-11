export const GLOBAL_ERROR = 'GLOBAL_ERROR';

export function globalError(error = null, dismissible = true) {
    return {
        type: GLOBAL_ERROR,
        payload: dismissible,
        globalError: true,
        error: error
    }
}