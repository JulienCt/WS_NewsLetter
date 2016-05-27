var NewsLetter = function (data) {
    this.data = data;
}

NewsLetter.prototype.data = {}

NewsLetter.prototype.get = function (nameProp) {
    return this.data[nameProp];
}

NewsLetter.prototype.set = function (nameProp, value) {
    this.data[nameProp] = value;
}

module.exports = NewsLetter;
