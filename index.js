const { Telegraf, Markup } = require('telegraf');
const comands = require('./comand');
const text = require('./comand');
// const news = require('./handlerStore');
const storeNews = require('./server/result.json');

require('dotenv').config();

const {parsePost, parseLinks, getPosts} = require("./server/dist/parsePost");
const iconv = ('iconv-lite');
const fs = ('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);
const urlPage = 'https://bk55.ru/';

// reply отправка сообщения

// не так
bot.hears('новости России', ctx => {
    // ctx.replyWithHTML(`${storeNews[0].title}\n${storeNews[0].text}\n${storeNews[0].image}`)
    parseLinks(urlPage, '.news-block h2 a', 1)
    .then(links => {
        getPosts(links)
            .then(posts => console.log(posts)
            // .then(posts => saveResult(JSON.stringify(posts, 0, 4))
            .catch(e => console.log(e)));
    }).catch(e => console.log(e))
})
// bot.hears('новости Омска', ctx => ctx.scene.enter('Omsk'))
// bot.hears('новости Мира', ctx => ctx.scene.enter('World'))

bot.start( async (ctx) => {
    try {
        await ctx.reply('Будешь в курсе', Markup.keyboard([
            [Markup.button.callback('новости России', 'btn_1')],
            // [Markup.button.callback('Новости Омска', 'btn_2')],
            // [Markup.button.callback('Новости Мира', 'btn_3')]
        ]))
    } catch(e) {
        console.log(e);
    }
}); // /start - starting bot, starating script

bot.help((ctx) => ctx.reply(comands.comands)); // /help -  starating script help

// bot.on('sticker', (ctx) => ctx.reply('👍')); // отслеживание какого либо сообщения

// bot.hears('hi', (ctx) => ctx.reply('Hey there')); // если пришло 'hi' в ответ придёт 'Hey there'

// функционал 'course'
// bot.command('course', async (ctx) => {
//     try {
//         await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('новости России', 'btn_1')],
//                 [Markup.button.callback('Новости Омска', 'btn_2')],
//                 [Markup.button.callback('Новости Мира', 'btn_3')]
//             ]
//         ))
//     } catch(e) {
//         console.error(e);
//     }
// })




// функционал кнопок
// function addActionBot(name, src, text) {
//     bot.action(name, async (ctx) => {
//         try {
//             await ctx.answerCbQuery() // убрать цифирблат отправки

//             if( src !== false ) { // проверка 
//                 await ctx.replyWithPhoto({
//                     source: src
//                 })
//             }

//             await ctx.replyWithHTML(text, {
//                 disable_web_page_preview: true // превью к ссылке 
//             })

//             // await ctx.reply(`${storeNews[0].title} ${storeNews[0].description} `)
//             ctx.reply(console.log(ctx))
//         }catch (e) {
//             console.error(e);
//         }   
//     })
// }
// addActionBot('btn_1', false, text.text)


bot.launch() // запуск бота

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));