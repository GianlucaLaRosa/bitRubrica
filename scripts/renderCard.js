import db from "../db.json" assert { type: "json" };

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.id;

let myPerson = db.person.filter(el => el.id == value);

//title
let titleText = `${myPerson[0].name} ${myPerson[0].surname} | Address book`;
document.title = titleText;
//pageTitle.;

//name and surname
let nameText = document.createTextNode(
  `${myPerson[0].name} ${myPerson[0].surname}`
);
let cardName = document.getElementById("card__name");
cardName.appendChild(nameText);

//profile picture
let cardPicture = document.getElementById("card__pic--front");
let img = new Image();
img.src = myPerson[0].avatar;
img.alt = `Foto profilo di ${myPerson[0].name} ${myPerson[0].surname}`;
cardPicture.appendChild(img);

//hobbies
if (myPerson[0].hobbies.length != 0) {
  let hobbiesArr = myPerson[0].hobbies.split(",");
  let cardList = document.getElementById("card__body--info").lastElementChild;

  hobbiesArr.forEach(hobby => {
    let hobbyItem = document.createElement("li");
    hobbyItem.appendChild(document.createTextNode(hobby));
    cardList.appendChild(hobbyItem);
  });
}

//bio
let bioText = document.createTextNode(myPerson[0].short_desc);
let cardBio = document.getElementById("card__body__bio");
cardBio.appendChild(bioText);

//video
let video = document.getElementById("video__container").firstElementChild;
let source = document.createElement("source");
source.setAttribute("src", "../assets/videos/sample.mp4");
source.setAttribute("type", "video/mp4");
video.appendChild(source);

//video desc
let videoText = document.createTextNode(myPerson[0].long_desc);
let cardVideoDesc =
  document.getElementById("video__description").lastElementChild;
cardVideoDesc.appendChild(videoText);

//contacts
let cardMail = document.getElementById("card__footer--mail").firstElementChild;
cardMail.setAttribute("href", `mailto:${myPerson[0].email}`);
let cardTel = document.getElementById("card__footer--tel").firstElementChild;
cardTel.setAttribute(
  "href",
  `tel:${myPerson[0].tel_prefix}${myPerson[0].tel_number}`
);
let cardWebsite =
  document.getElementById("card__footer--link").firstElementChild;
cardWebsite.setAttribute("href", myPerson[0].website);
