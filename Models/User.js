var User = function (data) {
    this.data = data;
}

User.prototype.data = {}

User.prototype.get = function (nameProp) {
    return this.data[nameProp];
}

User.prototype.set = function (nameProp, value) {
    this.data[nameProp] = value;
}

module.exports = User;
