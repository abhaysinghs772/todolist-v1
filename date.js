
// console.log(module);

// module.exports.getDate = function () {
exports.getDate = function () {         // exports short cut

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-us", options);

}

exports.getDay = function () {

    const today = new Date();

    const options = {
        weekday: "long",
    };

   return today.toLocaleDateString("en-us", options);

}