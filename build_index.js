const path = require('path');
const pug = require('pug');
const glob = require('glob');
const fs = require('fs');
const {
  URL
} = require('url');


glob.glob("news/*.html", function (err, matches) {
  if (err) throw err;
  matches = matches
    .map(match => path.relative(__dirname, match).replace('\\', '/'))
    .map(match => {
      return {
        href: match,
        name: match.match(/\d{10}/)[0]
      }
    });
  fs.writeFileSync('index.html',
    pug.render(
      fs.readFileSync('index.pug', 'utf8'), {
        links: matches,
        doctype: 'html'
      }
    ), 'utf8')
  console.log('Done')
  // use matches
});