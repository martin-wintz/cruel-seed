'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var Schema = mongoose.Schema;

var schema = new Schema({
  email: { type: String, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String }
  },
  password: { type: String, select: false }
});



schema.path('email').index({ unique: true });
schema.path('accessToken').index({ unique: true });
schema.path('auth.local.username').index({ unique: true, sparse: true });
schema.path('auth.google.id').index({ unique: true, sparse: true });


schema.virtual('name.full')
  .get(function () {
    return this.name.first + ' ' + this.name.last;
  })
  .set(function (name) {
    name = name.split(' ');
    this.name.first = name.slice(0, Math.max(1, name.length - 1)).join(' ');
    this.name.last = name.slice(Math.max(1, name.length - 1)).join(' ');
  });



schema.pre('save', function (next) {
  var self = this;

  if (!self.isModified('auth.local.password')) { return next(); }

  bcrypt.genSalt(function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(self.auth.local.password, salt, function (err, hash) {
      if (err) { return next(err); }
      self.auth.local.password = hash;
      next();
    });
  });

});



schema.methods.validatePassword = function (candidatePassword, callback) {
  var self = this;

  bcrypt.compare(candidatePassword, self.auth.local.password, callback);

};

schema.methods.makeSafe = function () {
  var self = this;

  delete self.password;
  return self;

};


// Model
var model = mongoose.model('User', schema);

// Public API
exports = module.exports = model;
