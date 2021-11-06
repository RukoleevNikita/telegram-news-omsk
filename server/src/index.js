// import {parsePost, parseLinks, getPosts} from "./parsePost";
// import iconv from 'iconv-lite';
// import fs from 'fs';
// import { elems  } from "./configs";

// const urlPage = 'https://bk55.ru/';

// const saveResult = (json) => {
//     json = iconv.decode(Buffer.from(json), 'utf8');
//     fs.writeFile('result.json', json, (err)=> {
//         if(err) console.log('Not saved');
//     });
// };

// parseLinks(urlPage, '.news-block h2 a', 5)
//     .then(links => {
//         getPosts(links)
//             .then(posts => saveResult(JSON.stringify(posts, 0, 4))
//             .catch(e => console.log(e)));
// }).catch(e => console.log(e))

