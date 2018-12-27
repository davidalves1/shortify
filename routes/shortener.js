const Shortener = require('../models/shortener');
const randomHash = require('random-hash');
const db = require('../config/database');
const config = require('../config/index');
const helpers = require('../support/helpers');

module.exports = server => {
  server.get('/:hash', async (req, res, next) => {
    try{
      Shortener.findOne({code: req.params.hash}, (err, url) => {
        if (err || url === null) {
          console.error('api error', err, req.params.hash);
          res.redirect(301, `${config.base_url}?code=404`, next);
          return;
        }

        res.redirect(301, url.original, next);
      })
    } catch (err) {
      res.status(500);
      return res.json({ err });
    }
  });

  server.post('/shortener', async (req, res) => {
    try {
      const hash = randomHash.generateHash({ length: 6 });
      const shorten = `${config.base_url}/${hash}`;

      const found = await Shortener.findOne({ original: req.body.url });

      if (found) {
        return res.json(found);
      }

      const data = {
        code: hash,
        original: req.body.url,
        shorten
      };

      const shortener = new Shortener(data);
      shortener.save((err, id) => {
        if (err) {
          res.status(500);
          return res.json({ err });
        }

        return res.json({ ...data });
      });
    } catch (err) {
      res.status(500);
      return res.json({ err });
    }
  });

  server.get('/shortener', async (req, res) => {
    const url = req.params.url;

    const is_valid = helpers.checkUrl(url);

    if (!is_valid) {
      res.status(422);
      return res.json({ is_valid });
    }

    return res.json({is_valid});
  });
}


