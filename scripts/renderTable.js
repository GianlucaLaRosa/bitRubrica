import db from "../db.json" assert { type: "json" };

let tableRef = document.getElementById("address__table");

//handling in case of null/empty db//
if (typeof db === "undefined" || db.person.length === 0) {
  let newRow = tableRef.insertRow(1);
  let avatarCell = newRow.insertCell(0);
  avatarCell.setAttribute("colspan", 3);
  let message = document.createTextNode("Nobody in your address book.");
  avatarCell.appendChild(message);
} else {
  db.person.forEach(el => {
    //insert new row
    let newRow = tableRef.insertRow(el.id + 1);

    //insert new cells
    let avatarCell = newRow.insertCell(0);
    let nameCell = newRow.insertCell(1);
    let surnameCell = newRow.insertCell(2);

    // construct and set Image obj
    let img = new Image();
    img.src = el.avatar;
    img.alt = `Foto profilo di ${el.name} ${el.surname}`;

    // create name and surname nodes
    let nameText = document.createTextNode(el.name);
    let surnameText = document.createTextNode(el.surname);

    // create, set and append Image
    let anchorImg = document.createElement("a");
    anchorImg.setAttribute("href", `./contacts/contact.html?id=${el.id}`);
    anchorImg.appendChild(img);

    // create, set and append name
    let anchorName = document.createElement("a");
    anchorName.setAttribute("href", `./contacts/contact.html?id=${el.id}`);
    anchorName.appendChild(nameText);

    // create, set and append surname
    let anchorSurname = document.createElement("a");
    anchorSurname.setAttribute("href", `./contacts/contact.html?id=${el.id}`);
    anchorSurname.appendChild(surnameText);

    //append everything
    avatarCell.append(anchorImg);
    nameCell.append(anchorName);
    surnameCell.appendChild(anchorSurname);
  });
}
