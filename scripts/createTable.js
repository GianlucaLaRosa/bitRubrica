import contacts from "./contacts.js";
import apiCrud from "./apiCrud.js";

/* contacts.refresh();
console.log(contacts.stored); */

let createTable = () => {
  document.querySelector("main").innerHTML = `<table id="address__table">
  <caption></caption>
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Name</th>
      <th scope="col">Surname</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody></tbody>
</table>`;
};

export default createTable;
