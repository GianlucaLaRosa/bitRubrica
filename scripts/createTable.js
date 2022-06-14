let createTable = contacts => {
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
  <tbody id="address__table--body">
</tbody>
</table>`;

  const tableRef = document.querySelector("#address__table--body");

  if (contacts.length === 0 || contacts === "undefined") {
    const newRow = tableRef.insertRow();
    const messageCell = newRow.insertCell(0);
    messageCell.setAttribute("colspan", 3);
    const message = document.createTextNode("Nobody in your address book.");
    messageCell.appendChild(message);
  } else {
    contacts.forEach(contact => {
      const newRow = tableRef.insertRow();
      newRow.setAttribute("id", contact.id);
      newRow.addEventListener("click", () => {
        console.log(`open card ${contact.id}`);
      });

      // create cells
      let avatarCell = newRow.insertCell(0);
      let nameCell = newRow.insertCell(1);
      let surnameCell = newRow.insertCell(2);

      // create and set profile image
      const profImg = new Image();
      profImg.src = contact.avatar;
      profImg.alt = `Foto profilo di ${contact.name} ${contact.surname}`;

      // create and append name and surname
      const nameText = document.createTextNode(contact.name);
      const surnameText = document.createTextNode(contact.surname);

      const paragName = document.createElement("p");
      const paragSurname = document.createElement("p");

      paragName.appendChild(nameText);
      paragSurname.appendChild(surnameText);

      // appned all infos
      avatarCell.appendChild(profImg);
      nameCell.appendChild(paragName);
      surnameCell.appendChild(surnameText);
    });
  }
};

export default createTable;
