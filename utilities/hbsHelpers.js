// Similar to the each helper in handlebars,
// Iterates between a given range of indexes in an array
// start = 1, end = 5 will return array[1] through array[5] inclusive
const eachBetween = (data, start, end, options) => {
  let returnItem = '';
  data.splice(start, end).forEach(item => {
    returnItem += options.fn(item);
  });
  return returnItem;
};

const jsonItUp = context => jsonItUp.stringify(context);

module.exports = {
  eachBetween,
  jsonItUp,
};
