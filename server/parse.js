const mysql = require('promise-mysql');
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
    if (descriptionLink) {
      getBody(updatePath(descriptionLink)).then($ => {
        const description = $('.cui-page-section.mmy-expert').html();
        resolve(description);
      })
    } else {
      resolve(null);
    }
  })
}

async function importTable() {
  const $ = await getBody(url);
  const cards = $('.listingCard');

  try {
    let arrayOfMakes = [];
    await Promise.resolve(cards.each((i, card) => {
      const title = $(card).find('.cui-delta').html();
      if (title) {
        const make_name = title.split(' ')[1];
        arrayOfMakes.push(make_name);
      }
    }));
    arrayOfMakes = arrayOfMakes.filter((m, i, arr) => arr.indexOf(m) === i);
    const makes = await Promise.all(arrayOfMakes.map(async (m) => {
      const res = await client.then(conn => conn.query(`insert into makes(title) values('${m}')`));
      return { id: res.insertId, title: m };
    }));

    await Promise.resolve(cards.each(async (i, card) => {
      const title = $(card).find('.cui-delta').html();
      let price = $(card).find('.msrp').html();
      const description = await getDescription($(card));
      const imgPath = $(card).find('.card-image-container .card-image').attr('data-image-src');
      const fullPath = updatePath(imgPath);

      if (imgPath && title && price) {
        price = price.replace('$', '').replace(',', '');
        const image_name = await download(fullPath, `../images/car-${i}.png`);

        const make_name = title.split(' ')[1];
        const makeId = makes.find(m => m.title === make_name).id;

        client.then(conn => conn.query(`
          insert into products(created_at, title, img, price, make_id, description)
          values(now(), '${title}', '${image_name}', '${price}', '${makeId}', '${description}');
        `));

      }

    }));
    console.log('finish');
  } catch (err) {
    console.log(err);
  }
}

importTable();




