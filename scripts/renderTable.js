const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let db;
let tableRef = document.getElementById("address__table");
let searchBar = document.getElementById("search__bar");
let searchInput = document.getElementById("search__input");
let gridRef = document.getElementById("grid__container");

let getAddressGrid = async query => {
  query ??= "";
  document.getElementById("address__table").style.display = "none";
  document.getElementById("grid__container").style.display = "grid";
  try {
    let res = await fetch(
      `http://localhost:3000/person?q=${query}&_page=${params._page}&_limit=12`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    if (res.ok) {
      let pageIndicator = (document.getElementById(
        "page"
      ).innerHTML = `${params._page}`);
      let longLinks = res.headers.get("Link").split(",");
      longLinks.forEach(link => {
        document
          .getElementById(link.split(";")[1].slice(6, -1))
          .setAttribute(
            "href",
            `/?_limit=12&_page=${
              link.split(";")[0].split("=")[2].split("&")[0]
            }`
          );
      });

      //handling in case of null/empty db
      if (typeof data === "undefined" || data.length === 0) {
        const newDiv = document.createElement("div");
        const newContent = document.createTextNode(
          "Nobody in your address book."
        );
        newDiv.appendChild(newContent);
        gridRef.appendChild(newDiv);
      } else if (data.length === 1) {
        window.location.href = `http://localhost:5500/contacts/contact.html?id=${data[0].id}`;
      } else {
        data.forEach(el => {
          const newAnchor = document.createElement("a");
          const newParagraph = document.createElement("p");
          let prof_img = new Image();
          prof_img.src = el.avatar;
          prof_img.alt = `Foto profilo di ${el.name} ${el.surname}`;
          const newContent = document.createTextNode(`CALL ${el.name}`);
          newAnchor.appendChild(prof_img);
          newParagraph.appendChild(newContent);
          newAnchor.appendChild(newParagraph);
          newAnchor.setAttribute(
            "href",
            `tel:${el.tel_prefix}${el.tel_number}`
          );
          newAnchor.setAttribute("id", "contact__cell");
          gridRef.appendChild(newAnchor);

          if (!res.headers.get("Link").includes("prev")) {
            document.getElementById("prev").style.backgroundColor =
              "var(--gray-transp)";
            document.getElementById("prev").onmouseover = function () {
              this.style.boxShadow = "none";
            };
          }

          if (!res.headers.get("Link").includes("next")) {
            document.getElementById("next").style.backgroundColor =
              "var(--gray-transp)";
            document.getElementById("next").onmouseover = function () {
              this.style.boxShadow = "none";
            };
          }
        });
      }
    } else {
      throw new Error("Sorry, impossible to access the database.");
    }
  } catch (err) {
    console.error(err);
  }
};

if (window.localStorage.getItem("toggle") === null) {
  window.localStorage.setItem("toggle", true);
}
if (window.localStorage.getItem("toggle") === "true") {
  document
    .getElementById("toggle")
    .setAttribute("src", "/assets/icons/list.svg");
  document.getElementById("toggle").addEventListener("click", () => {
    window.localStorage.setItem("toggle", false);
    window.location.replace("/");
  });
} else if (window.localStorage.getItem("toggle") === "false") {
  document
    .getElementById("toggle")
    .setAttribute("src", "/assets/icons/grid.svg");
  document.getElementById("toggle").addEventListener("click", () => {
    window.localStorage.setItem("toggle", true);
    window.location.replace("/");
  });
}

let deleteItem = async () => {
  try {
    debugger;
    let id = window.localStorage.getItem("deletingId");

    let res = await fetch(`http://localhost:3000/person/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    console.log("test", res);
    if (res.ok) {
      window.localStorage.removeItem("deletingId");
      window.location.href = "https://www.google.it/";
    } else {
      throw new Error("Sorry. Couldn't delete.");
    }
  } catch (err) {
    console.error(err);
  }
};

let getAddressTable = async query => {
  query ??= "";
  document.getElementById("address__table").style.display = "table";
  document.getElementById("grid__container").style.display = "none";
  try {
    let res = await fetch(`http://localhost:3000/person?q=${query}`, {
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
        avatarCell.setAttribute("colspan", 5);
        let message = document.createTextNode("Nobody in your address book.");
        avatarCell.appendChild(message);
      } else if (data.length === 1) {
        window.location.href = `http://localhost:5500/contacts/contact.html?id=${data[0].id}`;
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
          modImg.setAttribute("title", "Modify");
          modImg.setAttribute(
            "href",
            `./contacts/create_contact.html?id=${el.id}`
          );
          modImg.appendChild(mod_img);

          // create, set and append Delete image
          let delImg = document.createElement("a");
          delImg.setAttribute("title", "Delete");
          delImg.addEventListener("click", () => {
            openDeleteModal();
            window.localStorage.setItem("deletingId", el.id);
          });
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

let openDeleteModal = () => {
  document.getElementById("delete__modal").showModal();
};

document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("delete__modal").close();
  window.localStorage.removeItem("deletingId");
});

document
  .getElementById("delete__modal--form")
  .addEventListener("submit", () => {
    deleteItem();
  });

let searchPerson = e => {
  e.preventDefault();
  window.location.replace(
    `http://localhost:5500/index.html?q=${searchInput.value}`
  );
};

searchBar.onsubmit = searchPerson;
if (window.localStorage.getItem("toggle") === "true") {
  getAddressGrid(params.q);
}
if (window.localStorage.getItem("toggle") === "false") {
  getAddressTable(params.q);
}
