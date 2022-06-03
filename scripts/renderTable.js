const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let db;
let tableRef = document.getElementById("address__table");
let searchBar = document.getElementById("search__bar");
let searchInput = document.getElementById("search__input");

let getAddressBook = async query => {
  let pre = !!query ? "?name_like=" : "";
  try {
    let res = await fetch(`http://localhost:3000/person${pre}${query}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    if (res.ok) {
      //handling in case of null/empty db
      if (typeof data === "undefined" || data.length === 0) {
        let newRow = tableRef.insertRow();
        let avatarCell = newRow.insertCell(0);
        avatarCell.setAttribute("colspan", 3);
        let message = document.createTextNode("Nobody in your address book.");
        avatarCell.appendChild(message);
      } else {
        data.forEach(el => {
          //insert new row
          let newRow = tableRef.insertRow();

          //insert new cells
          let avatarCell = newRow.insertCell(0);
          let nameCell = newRow.insertCell(1);
          let surnameCell = newRow.insertCell(2);
          let modCell = newRow.insertCell(3);
          let delCell = newRow.insertCell(4);

          // construct and set Profile image obj
          let prof_img = new Image();
          prof_img.src = el.avatar;
          prof_img.alt = `Foto profilo di ${el.name} ${el.surname}`;

          // construct and set Modify image obj
          let mod_img = new Image();
          mod_img.src = "/assets/icons/gear.svg";
          mod_img.alt = "Modify";

          // construct and set Delete image obj
          let del_img = new Image();
          del_img.src = "/assets/icons/trash.svg";
          del_img.alt = "Delete";

          // create name and surname nodes
          let nameText = document.createTextNode(el.name);
          let surnameText = document.createTextNode(el.surname);

          // create, set and append Profile mage
          let anchorImg = document.createElement("a");
          anchorImg.setAttribute("href", `./contacts/contact.html?id=${el.id}`);
          anchorImg.appendChild(prof_img);

          // create, set and append Modify image
          let modImg = document.createElement("a");
          modImg.setAttribute(
            "href",
            `./contacts/create_contact.html?id=${el.id}`
          );
          modImg.appendChild(mod_img);

          // create, set and append Delete image
          let delImg = document.createElement("a");
          delImg.addEventListener("click", deleteItem.bind(null, el.id));
          delImg.appendChild(del_img);

          // create, set and append name
          let anchorName = document.createElement("a");
          anchorName.setAttribute(
            "href",
            `./contacts/contact.html?id=${el.id}`
          );
          anchorName.appendChild(nameText);

          // create, set and append surname
          let anchorSurname = document.createElement("a");
          anchorSurname.setAttribute(
            "href",
            `./contacts/contact.html?id=${el.id}`
          );
          anchorSurname.appendChild(surnameText);

          //append everything
          avatarCell.append(anchorImg);
          nameCell.append(anchorName);
          surnameCell.appendChild(anchorSurname);
          modCell.append(modImg);
          delCell.append(delImg);
        });
      }
    } else {
      throw new Error("Sorry, impossible to access the database.");
    }
  } catch (err) {
    console.error(err);
  }
};

let searchPerson = e => {
  e.preventDefault();
  window.location.replace(
    `http://localhost:5500/index.html?q=${searchInput.value}`
  );
};
let deleteItem = async id => {
  try {
    let res = await fetch(`http://localhost:3000/person/${id}`, {
      header: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    if (res.ok) {
      window.location.href("http://localhost:5500/");
    } else {
      throw new Error("Sorry. Couldn't delete.");
    }
  } catch (err) {
    console.error(err);
  }
};
searchBar.onsubmit = searchPerson;
getAddressBook(params.q);
