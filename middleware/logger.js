const os = require('os');
const fs = require('fs');
const path = require("path");

module.exports = (req, res, next) => {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const hours = now.getHours();

  const userAgent = req.headers['user-agent'];
  const {method, url} = req;

  const data = `${hours}:${minutes}:${seconds} | ${method} - ${url} | ${userAgent}`

  fs.appendFile(`${path.join(__dirname, '../log.txt')}`, data + os.EOL, (err) => {
    if (err) throw Error();
  })
  next();
}
