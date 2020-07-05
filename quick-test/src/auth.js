const { group } = require('./config/group');

async function authorization() {
  if (ctx.message.from.is_bot) throw new Error("It is bot!");


}

module.exports = authorization;
