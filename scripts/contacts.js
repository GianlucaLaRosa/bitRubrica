import apiCrud from "./apiCrud.js";

const contacts = {
  stored: [],
  async refresh() {
    this.stored = await apiCrud.readContacts();
    return this.stored;
  },
};

await contacts.refresh();

export default contacts;
