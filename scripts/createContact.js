let form = document.querySelectorAll("form")[1];
let searchBar = document.getElementById("search__bar");
let searchInput = document.getElementById("search__input");
let verb = document.getElementById("verb");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

if (window.localStorage.getItem("toggle") === null) {
  window.localStorage.setItem("toggle", true);
}

let [
  name,
  surname,
  avatar,
  hobbies,
  fav_video,
  email,
  pre,
  tel,
  web_site,
  bio,
  desc,
] = form;

let openModal = e => {
  e.preventDefault();
  document.getElementById("submit__modal").showModal();
};

let fillForm = async () => {
  try {
    let res = await fetch(`http://localhost:3000/person/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    let data = await res.json();
    if (res.ok) {
      form.name.value = data.name;
      form.surname.value = data.surname;
      form.avatar.value = data.avatar;
      form.hobbies.value = data.hobbies;
      form.fav_video.value = data.fav_video;
      form.email.value = data.email;
      form.pre.value = data.tel_prefix;
      form.tel.value = data.tel_number;
      form.web_site.value = data.website;
      form.bio.value = data.short_desc;
      form.desc.value = data.long_desc;
    } else {
      if (+params.id > +window.localStorage.getItem("last_id")) {
        throw new Error(
          "Sorry, the person you are looking for doesn't exists."
        );
      } else {
        throw new Error("Sorry, it occurred a problem.");
      }
    }
  } catch (err) {
    console.error(err);
    history.back();
  }
};

let storeLastId = async () => {
  try {
    let res = await fetch(
      "http://localhost:3000/person?_sort=id&_order=desc&_limit=1",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    let data = await res.json();

    if (!res.ok) {
      throw new Error("It wasn't possible to store last ID.");
    } else if (_.isEqual(data, [])) {
      window.localStorage.setItem("last_id", 0);
    } else {
      window.localStorage.setItem("last_id", data[0].id);
    }
  } catch (err) {
    console.error(err);
  }
};

let onFormSubmit = async e => {
  try {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/person", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        avatar: avatar.value,
        hobbies: hobbies.value,
        fav_video: fav_video.value,
        email: email.value,
        pre: pre.value,
        tel: tel.value,
        web_site: web_site.value,
        bio: bio.value,
        desc: desc.value,
      }),
    });
    let data = await res.json();
    if (res.ok) {
      console.log("resOk");
      window.location.href = `http://localhost:5500/contacts/contact.html?id=${
        +window.localStorage.getItem("last_id") + 1
      }`;
    } else {
      throw new Error("Something went wrong during post request...");
    }
  } catch (err) {
    console.error(err);
  }
};

let onFormSubmitChange = async e => {
  e.preventDefault();
  try {
    let res = await fetch(`http://localhost:3000/person/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        avatar: avatar.value,
        hobbies: hobbies.value,
        fav_video: fav_video.value,
        email: email.value,
        tel_prefix: pre.value,
        tel_number: tel.value,
        website: web_site.value,
        short_desc: bio.value,
        long_desc: desc.value,
      }),
    });
    let data = await res.json();
    if (res.ok) {
      window.location.href = `http://localhost:5500/contacts/contact.html?id=${params.id}`;
    } else {
      throw new Error("Something went wrong during put request...");
    }
  } catch (err) {
    console.error(err);
  }
};

storeLastId();

if (+params.id > +window.localStorage.getItem("last_id")) {
  window.location.replace("http://localhost:5500");
}

// If isPersonSelected is true, fill the form with person details.
// Else leave it blank to create a new person.
let isPersonSelected = !!params.id && !isNaN(params.id);

if (isPersonSelected) {
  fillForm();
  verb.innerHTML = "modify";
} else {
  verb.innerHTML = "create";
}

form.onsubmit = openModal;

document.getElementById("submit__modal").onsubmit = isPersonSelected
  ? onFormSubmitChange
  : onFormSubmit;

document
  .getElementById("cancel")
  .addEventListener("click", () =>
    document.getElementById("submit__modal").close()
  );

let searchPerson = e => {
  e.preventDefault();
  window.location.replace(
    `http://localhost:5500/index.html?q=${searchInput.value}`
  );
};

searchBar.onsubmit = searchPerson;
