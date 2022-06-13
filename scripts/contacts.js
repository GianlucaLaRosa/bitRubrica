import apiCrud from "./apiCrud.js";

const contacts = {
  stored: [],
  async refresh() {
    this.stored = await apiCrud.readContacts();
    return this.stored;
  },
};

//console.log(contacts.stored);
await contacts.refresh();
console.log(contacts.stored[0]);

export default contacts;
