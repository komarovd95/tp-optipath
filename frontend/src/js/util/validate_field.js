export default function validateField(value, options) {
    const errors = [];

    if (options.required && !value) {
        return [options.required.message];
    }

    if (options.minLength && value.length < options.minLength.val) {
        errors.push(options.minLength.message);
    }

    if (options.maxLength && value.length > options.maxLength.val) {
        errors.push(options.maxLength.message);
    }

    if (options.pattern && !value.match(options.pattern.val)) {
        errors.push(options.pattern.message);
    }

    return errors.length > 0 ? errors : null;
}
