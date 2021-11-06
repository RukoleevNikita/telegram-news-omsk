// вспомогательные пакеты
// unirest
// cheerio

import unirest from 'unirest';
import cheerio from 'cheerio';

import { elems } from './configs';

const log = (i, count, ms) => {
    return new Promise( r => 
        setTimeout(() => {
            console.log(`
                Индекс: ${i};
                Всего записей: ${count};
            `);
        r();
    }, ms));
};



function parsePost(url, elems) {
  return new Promise((resolve, reject) => {

   unirest.get(url).end(({ body, error }) => {

      if (error) reject(error);

          const $ = cheerio.load(body);

          const domain = url.match(/\/\/(.*?)\//)[1];
          const title = $(elems.title).text(); // .trim() - убираем лишние отступы 
          // const articleDate = $('.article-date').text();
          let image =  'https:' + $(elems.image).attr('src'); // attr('src') берём атрибут у img и добовляем домен
          image = image.indexOf('http') >= 0 ? image : `http://${domain}${image}`;
          const text = $(elems.text).text().trim();
          // const view = $(viewClass).text().trim(); // не правильно считывает

          const post = {
              title: title,
              image: image,
              text: text
              // view: view
          }
          resolve(post);
      });
  });
};


// парсим все блоки с превью новости
function parseLinks(url, className, maxLinks = 5) {
  return new Promise((resolve, reject) => {
      
      let links = [];

      unirest.get(url).end(({ body, error }) => {
          if (error) reject(error);

          const $ = cheerio.load(body);

          const domain = url.match(/\/\/(.*?)\//)[1];
          $(className).each((i, e) => {
              if(i + 1 <= maxLinks){
                  let link = $(e).attr('href');

                  link = link.indexOf('https') >= 0 ? link : `http://${domain}${link}`;
                  links.push(link);
              }        
          });
          resolve(links);
          if (!links.length) reject({ error: 'empty links' });
      });
  });
};

async function getPosts(links) {
    
    const count = links.length;
    const posts = [];

    for(let i = 0; i < count; i++) {
        const post = await parsePost(links[i],elems.bk55).then(post => post);
        posts.push(post);
        await log(i + 1, count, 2000);
    }
    return new Promise((resolve, reject) => {
        if(!posts.length) reject({ empty: 'empty' });
        resolve(posts);
    });
};

export {
    parsePost,
    parseLinks,
    getPosts
};