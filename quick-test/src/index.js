require('dotenv').config();

const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const { addStudentToGroup } = require('./functions.js');
const auth = require('./auth');

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.start(async (ctx, next) => {

  ctx.reply("Привет! Введи код для подключения к группе.");

  await auth(ctx);

  await addStudent(ctx);

  await next();
});

bot.on('text', (ctx, next) => {
  console.log(ctx.message);
});

bot.launch();
