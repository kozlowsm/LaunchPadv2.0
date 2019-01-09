const express = require('express');

const router = express.Router();
const { getLaunchData } = require('./../utilities/fetchData');

// Main index page route - Will display next {count} launches
// Refactor to named functions?
router.get('/', (req, res) => {
  const launchData = getLaunchData();
  launchData
    .then(data => {
      res.render('index/index', { data });
    })
    .catch(err => {
      throw new Error(err);
    });
});

module.exports = router;
