import apiCrud from './apiCrud.js';
import createTable from './createTable.js';
import contacts from './contacts.js';

debugger;
// const contactList = await contacts.refresh();
const contactList = [{
  id: 1,
  surname: "a",
}];

createTable(contactList);


