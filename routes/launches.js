const express = require('express');

const router = express.Router();
const { getSingleLaunchData } = require('./../utilities/fetchData');

router.get('/:id', (req, res) => {
  const launchID = req.params.id;
  const launchData = getSingleLaunchData(launchID);
  launchData
    .then(data => {
      res.render('launches/launch', { data });
    })
    .catch(err => {
      throw new Error(err);
    });
});
module.exports = router;
