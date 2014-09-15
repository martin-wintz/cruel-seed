'use strict';

var _ = require('lodash');


module.exports = _.extend(
  require('./common'),
  require('./' + process.env.NODE_ENV)
);

