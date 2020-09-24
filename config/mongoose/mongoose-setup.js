const mongoose = require('mongoose');

const aggregatePaginate = require('./plugins/aggregate-paginate');
const paginate = require('./plugins/paginate');

mongoose.plugin(aggregatePaginate);
mongoose.plugin(paginate);

module.exports = mongoose;
