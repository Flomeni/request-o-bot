exports.assertNotNull = (value, name) => {
    if (!value) {
        throw new Error(`[Assertion error]: ${name} is null.`);
    }
};
