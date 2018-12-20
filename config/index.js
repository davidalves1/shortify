require('dotenv').config();

module.exports = {
  name: 'Shortify',
  version: '1.0.0',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  base_url: process.env.BASE_URL || 'http://localhost:3001',
  db: {
    uri: process.env.MONGODB_URI
  }
}
