var Link = function (data) {
    this.data = data;
}

Link.prototype.data = {}

Link.prototype.get = function (nameProp) {
    return this.data[nameProp];
}

Link.prototype.set = function (nameProp, value) {
    this.data[nameProp] = value;
}

module.exports = Link;
