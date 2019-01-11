const sliceData = (data, start = 0, end = 1, options) => {
  let returnItem = '';
  data.slice(start, end).forEach(item => {
    returnItem += options.fn(item);
  });
  return returnItem;
};

module.exports = {
  sliceData,
};
