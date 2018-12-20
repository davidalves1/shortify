const Shortener = require('../models/shortener');
const db = require('../config/database');

module.exports = server => {
  server.get('/:hash', async (req, res, next) => {
    try{
      Shortener.findOne({code: req.params.hash}, (err, url) => {
        if (err || url === null) {
          console.error('api error', err);
          res.send(err);
          return;
        }

        res.redirect(301, url.original, next);
      })
    } catch (err) {
      res.status(500);
      return res.json({error: 'Deu erro'});
    }
  });
}


