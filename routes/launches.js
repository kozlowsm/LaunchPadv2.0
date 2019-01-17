const express = require('express');
const { getSingleLaunchData } = require('../utilities/fetchData');

const router = express.Router();

router.get('/:id', (req, res) => {
  const launchID = req.params.id;
  const launchData = getSingleLaunchData(launchID);

  // Use the data
  launchData
    .then(data => {
      res.render('launches/index', { data });
    })
    .catch(err => {
      throw new Error(err);
    });
});

module.exports = router;
