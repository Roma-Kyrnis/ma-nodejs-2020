class CRUDTable {
  constructor(clientName, nameTable = 'users') {
    this.clientName = clientName;
    this.nameTable = nameTable;
  }

  create(user) {
    this.clientName(this.nameTable)
      .insert(user, ['id'])
      .then(res => {
        console.log('Added user ', user);
        console.log(res);
      })
      .catch(err => console.log('Error in create with ', err));
  }

  read(field) {
    this.clientName(this.nameTable)
      .select(field)
      .then(res => console.log(res))
      .catch(err => console.log('Error in create with ', err));
  }

  readByKeyWithValue(key, value) {
    this.clientName(this.nameTable)
      .where(key, value)
      .then(res => console.log(res))
      .catch(err => console.log('Error in create with ', err));
  }

  update(id, newUser) {
    this.clientName(this.nameTable)
      .where('id', id)
      .update(newUser)
      .catch(err => console.log('Error in create with ', err));
  }

  delete(id) {
    this.clientName(this.nameTable)
      .where('id', id)
      .delete()
      .catch(err => console.log('Error in create with ', err));
  }

  destroyConnection() {
    this.clientName(this.nameTable).finally(() => this.clientName.destroy());
  }
}
const client = require('./knexClient');

const user = { login: 'ma', password: 'Ivan', token: 'CoraZon' };

const cRUDTable = new CRUDTable(client, 'users');

cRUDTable.delete(4);

cRUDTable.destroyConnection();
