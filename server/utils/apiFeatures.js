const filterFields = require('./filterFields');

// Advanced API Filtering Features >> [sort, fields, limit, skip, pagination]
class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter(filterObj, ...allowedFields) {
    // Filtered query fields
    const queryStr = JSON.stringify(filterFields(filterObj, ...allowedFields));
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    );
    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    // Sort in ASC|DESC order >> sort('name -price')
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  fields() {
    // Selected fields >> select('name, price, category)
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate() {
    // Pagination
    const page = this.queryObj.page * 1 || 1;
    const resultPerPage = this.queryObj.limit * 1 || 100; // Result start from 0
    this.query = this.query
      .limit(resultPerPage)
      .skip((page - 1) * resultPerPage);

    return this;
  }
}

module.exports = APIFeatures;
