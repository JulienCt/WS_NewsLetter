var Contact = function (data) {
    this.data = data;
}

Contact.prototype.data = {}

Contact.prototype.get = function (nameProp) {
    return this.data[nameProp];
}

Contact.prototype.set = function (nameProp, value) {
    this.data[nameProp] = value;
}

module.exports = Contact;
