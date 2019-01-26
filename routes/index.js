const express = require('express');

const router = express.Router();
const { getLaunchData } = require('./../utilities/fetchData');

// Main index page route - Will display next {count} launches
// Refactor to named functions?
router.get('/', (req, res) => {
  const launchData = getLaunchData(20);
  launchData
    .then(data => {
      res.render('index/index', { data });
    })
    .catch(err => {
      throw new Error(err);
    });
});

router.get('/api/launches/:count', (req, res) => {
  const { count } = req.params;
  const launchData = getLaunchData(count);
  launchData
    .then(data => res.json({ data }))
    .catch(err => {
      throw new Error(err);
    });
});

module.exports = router;
