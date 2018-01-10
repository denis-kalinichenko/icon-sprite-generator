module.exports = function globMock() {
    return new Promise(resolve => {
        resolve([
            "path/to/api.svg",
            "path/to/arrow_box.svg",
            "path/to/bin.svg",
            "path/to/calendar.svg",
            "path/to/cart_check.svg",
        ]);
    });
};