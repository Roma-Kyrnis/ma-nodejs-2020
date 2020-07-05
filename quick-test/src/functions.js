const { group } = require('./config/group');

async function addStudentToGroup(ctx) {
  group.ID = ctx.message.from.id;
  group.Name = ctx.message.from.first_name;

  console.log(`Student is added!`);
  console.log(group);

  ctx.reply(`Спасибо. Вы подключены к группе: ${group.NameGroup}`);
}

module.exports = {
  addStudentToGroup
}
