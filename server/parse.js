const mysql = require('mysql');
const config = require('./config/config');

const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');
const url = 'https://www.cars.com/research/sedan/';



const db_config = config.db;


const client = mysql.createConnection({
  host: db_config.config.host,
  user: db_config.user,
  password: db_config.pass,
  database: db_config.database
});
client.connect();

const updatePath = (url) => {
  return /^http:\/\/|^https:\/\//.test(url) ? url : `https://www.cars.com${url}`;
}

const download = (uri, filename) => {
  return new Promise((resolve, reject) => {
    request.head(uri, (err, res, body) => {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', () => {
          const f = filename.split('/')
          resolve(f[f.length - 1]);
        })
    });
  })
};

function getBody(url) {
  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    request(url, (error, response, body) => {
      if (!error) {
        resolve(cheerio.load(body));
      } else {
        reject("Произошла ошибка: " + error);
      }
    });
  })
}

function getDescription(card) {
  return new Promise((resolve, reject) => {
    const descriptionLink = card.find('.card-link-section a').attr('href');
    getBody(updatePath(descriptionLink)).then($ => {
      const description = $('.cui-page-section.mmy-expert').html();
      resolve(description);
    })
  })
}


async function importTable() {
  const $ = await getBody(url);
  const cards = $('.listingCard');

  await Promise.all(cards.each(async (i, card) => {
    const title = $(card).find('.cui-delta').html();
    const price = $(card).find('.msrp').html();
    const description = await getDescription($(card));
    const imgPath = $(card).find('.card-image-container .card-image').attr('data-image-src');
    const fullPath = updatePath(imgPath);

    if (imgPath && title && price) {
      const image_name = await download(fullPath, `../images/car-${i}.png`);
      client.query(`
        insert into products(created_at, title, img, price, description)
        values(now(), '${title}', '${image_name}', '${price}', '${description}');
      `);
    }

  }));
}

importTable();




