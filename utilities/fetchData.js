const fetch = require('node-fetch');

const getLaunchData = async (count = 10) => {
  const url = `https://launchlibrary.net/1.4/launch/next/${count}/?mode=verbose`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};


module.exports = {
  getLaunchData,
}