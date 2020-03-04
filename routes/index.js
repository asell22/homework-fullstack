const express = require('express');
const router = express.Router();
const axios = require('axios')
const SCPR_ARTICLES_URL = 'http://www.scpr.org/api/v3/articles';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api', function(req, res) {
  var query = req.query.search
  axios.get(`${SCPR_ARTICLES_URL}?query=${query}`)
    .then(function(response) {
      res.send({data: response.data, query: query})
    })
    .catch(function(err) {
      res.send(err)
    })
})

module.exports = router;
