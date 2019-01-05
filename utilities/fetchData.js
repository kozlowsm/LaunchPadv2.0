const fetch = require('node-fetch');

/*******************************************************
 * Gets Data from LaunchLibrary API
 * Default number of launches is 10
 * To get more/less launches provide a count argument to the function
********************************************************/ 
const getLaunchData = async (count = 10) => {
  const url = `https://launchlibrary.net/1.4/launch/next/${count}/?mode=verbose`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};


module.exports = {
  getLaunchData,
}