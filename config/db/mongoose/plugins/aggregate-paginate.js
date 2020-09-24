/**
 * Paginate Mongoose aggregate result
 * @param  {Aggregate} aggregate
 * @param  {any} options {
 *  page: number/string default 10,
 *  limit: number/string default 10,
 *  sort: any default null
 * }
 * @param  {function} [callback]
 * @returns {Promise}
 */
function aggregatePaginate(aggregate, options = {}, callback) {
  const page = parseInt(options.page || 1, 10);
  const limit = parseInt(options.limit || 10, 10);
  const skipDocuments = (page - 1) * limit;
  const { sort, collation } = options;

  const q = this.aggregate(aggregate._pipeline);
  const countQuery = this.aggregate(q._pipeline);
  if (q.hasOwnProperty('options')) {
    q.options = aggregate.options;
    countQuery.options = aggregate.options;
  }

  if (sort) {
    q.sort(sort).collation(collation);
  }
  return Promise.all([
    q.skip(skipDocuments).limit(limit).exec(),
    countQuery.group({ _id: null, count: { $sum: 1 } }).exec(),
  ])
    .then((values) => {
      const count = values[1][0] ? values[1][0].count : 0;
      if (typeof callback === 'function') {
        return callback(
          null,
          values[0],
          Math.ceil(count / limit) || 1,
          values[1][0] ? count : 0
        );
      }
      return Promise.resolve({
        docs: values[0],
        total: count,
        limit,
        page,
        pages: Math.ceil(count / limit) || 1,
      });
    })
    .catch((reject) => {
      if (typeof callback === 'function') {
        return callback(reject);
      }
      return Promise.reject(reject);
    });
}

module.exports = (schema) => {
  schema.statics.aggregatePaginate = aggregatePaginate;
};
module.exports.aggregatePaginate = aggregatePaginate;
