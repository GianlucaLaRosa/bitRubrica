const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let searchBar = document.getElementById("search__bar");
let searchInput = document.getElementById("search__input");

if (window.localStorage.getItem("toggle") === null) {
  window.localStorage.setItem("toggle", true);
}

let fetchCard = async () => {
  try {
    let res = await fetch(`http://localhost:3000/person/${params.id}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      let data = await res.json();
      //title
      let titleText = `${data.name} ${data.surname} | Address book`;
      document.title = titleText;

      //name and surname
      let nameText = document.createTextNode(`${data.name} ${data.surname}`);
      let cardName = document.getElementById("card__name");
      cardName.appendChild(nameText);

      //profile picture
      let cardPicture = document.getElementById("card__pic--front");
      let img = new Image();
      img.src = data.avatar;
      img.alt = `Foto profilo di ${data.name} ${data.surname}`;
      cardPicture.appendChild(img);

      //hobbies
      if (data.hobbies.length != 0) {
        let hobbiesArr = data.hobbies.split(",");
        let cardList =
          document.getElementById("card__body--info").lastElementChild;

        hobbiesArr.forEach(hobby => {
          let hobbyItem = document.createElement("li");
          hobbyItem.appendChild(document.createTextNode(hobby));
          cardList.appendChild(hobbyItem);
        });
      }

      //bio
      let bioText = document.createTextNode(data.short_desc);
      let cardBio = document.getElementById("card__body__bio");
      cardBio.appendChild(bioText);

      //video
      let video = document.getElementById("video__container").firstElementChild;
      let source = document.createElement("source");
      source.setAttribute("src", "../assets/videos/sample.mp4");
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);

      //video desc
      let videoText = document.createTextNode(data.long_desc);
      let cardVideoDesc =
        document.getElementById("video__description").lastElementChild;
      cardVideoDesc.appendChild(videoText);

      //contacts
      let cardMail =
        document.getElementById("card__footer--mail").firstElementChild;
      cardMail.setAttribute("href", `mailto:${data.email}`);
      let cardTel =
        document.getElementById("card__footer--tel").firstElementChild;
      cardTel.setAttribute("href", `tel:${data.tel_prefix}${data.tel_number}`);
      let cardWebsite =
        document.getElementById("card__footer--link").firstElementChild;
      cardWebsite.setAttribute("href", data.website);
    } else {
      throw new Error("Impossible to fetch the card datas.");
    }
  } catch (err) {
    console.error(err);
  }
};

let searchPerson = e => {
  e.preventDefault();
  console.log(`http://localhost:5500/index.html?q=${searchInput[params.id]}`);
  window.location.replace(
    `http://localhost:5500/index.html?q=${searchInput.value}`
  );
};

fetchCard();
searchBar.onsubmit = searchPerson;
