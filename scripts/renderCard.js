import db from "../db.json" assert { type: "json" };

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.id;

let myPerson = db.person.filter(el => el.id == value);

let nameText = document.createTextNode(
  `${myPerson[0].name} ${myPerson[0].surname}`
);
let cardName = document.getElementById("card__name");
cardName.appendChild(nameText);

let cardPicture = document.getElementById("card__pic--front");
let img = new Image();
img.src = myPerson[0].avatar;
img.alt = `Foto profilo di ${myPerson[0].name} ${myPerson[0].surname}`;
cardPicture.appendChild(img);
