module.exports = (fieldObj, ...allowedFields) => {
  let filteredFields = {};

  for (let field in fieldObj)
    if (allowedFields.includes(field)) filteredFields[field] = fieldObj[field];

  return filteredFields;
};
