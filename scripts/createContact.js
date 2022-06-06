let form = document.querySelectorAll("form")[1];
let searchBar = document.getElementById("search__bar");
let searchInput = document.getElementById("search__input");
let verb = document.getElementById("verb");
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const mailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const videoRegex = /^.*\.(mp4|MP4|avi|AVI|mov|MOV)$/;

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

avatar.addEventListener("blur", () => {
  if (avatar.value.startsWith("www")) {
    avatar.value = "http://" + avatar.value;
  }
});

web_site.addEventListener("blur", () => {
  if (web_site.value.startsWith("www")) {
    web_site.value = "http://" + web_site.value;
  }
});

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
  if (
    name.value.length > 0 &&
    surname.value.length > 0 &&
    urlRegex.test(avatar.value) &&
    urlRegex.test(web_site.value) &&
    mailRegex.test(email.value) &&
    videoRegex.test(fav_video.value) &&
    /^[0-9]{9,10}$/.test(tel.value) &&
    /^[+]{1}\d{1,3}$/.test(pre.value)
  ) {
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

      if (res.ok) {
        window.location.href = `http://localhost:5500/contacts/contact.html?id=${
          +window.localStorage.getItem("last_id") + 1
        }`;
      } else {
        throw new Error("Something went wrong during post request...");
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    e.preventDefault();
    if (name.value.length < 1) {
      let nameError = document.createElement("li");
      let textNameError = document.createTextNode("Name field is required");
      nameError.appendChild(textNameError);
      nameError.setAttribute("id", "field__error--item");
      document.getElementById("field__error--list").appendChild(nameError);
    }
    if (surname.value.length < 1) {
      let surnameError = document.createElement("li");
      let textSurnameError = document.createTextNode(
        "Surname field is required"
      );
      surnameError.appendChild(textSurnameError);
      surnameError.setAttribute("id", "field__error--item");
      document.getElementById("field__error--list").appendChild(surnameError);
    }
    if (!urlRegex.test(avatar.value)) {
      let avatarError = document.createElement("li");
      let textAvatarError = document.createTextNode(
        "Avatar field is required and must be a valid URL"
      );
      avatarError.appendChild(textAvatarError);
      avatarError.setAttribute("id", "field__error--item");
      document.getElementById("field__error--list").appendChild(avatarError);
    }
    if (!urlRegex.test(web_site.value)) {
      let webError = document.createElement("li");
      let textWebError = document.createTextNode(
        "Web site field is required and must be a valid URL"
      );
      webError.appendChild(textWebError);
      webError.setAttribute("id", "field__error--item");
      document.getElementById("field__error--list").appendChild(webError);
    }
    if (!mailRegex.test(email.value)) {
      let emailError = document.createElement("li");
      let textEmailError = document.createTextNode(
        "Email field is required and must be a valid email address"
      );
      emailError.appendChild(textEmailError);
      emailError.setAttribute("id", "field__error--item");
      document.getElementById("field__error--list").appendChild(emailError);
    }
    if (!videoRegex.test(fav_video.value)) {
      let videoError = document.createElement("li");
      let textVideoError = document.createTextNode(
        "Video field is required and must be an AVI, Mp4 or MOV format"
      );
      videoError.appendChild(textVideoError);
      videoError.setAttribute("id", "field__error--item");
      document.getElementById("field__error--list").appendChild(videoError);
    }
    if (!/^[0-9]{9,10}$/.test(tel.value)) {
      let telError = document.createElement("li");
      let textTelError = document.createTextNode(
        "Tel field is required and must be without any inner space or character"
      );
      telError.appendChild(textTelError);
      telError.setAttribute("id", "field__error--item");
      document.getElementById("field__error--list").appendChild(telError);
    }
    if (!/^[+]{1}\d{1,3}$/.test(pre.value)) {
      let prefixError = document.createElement("li");
      let textPrefixError = document.createTextNode(
        "Prefix field is required and must be a valid one"
      );
      prefixError.appendChild(textPrefixError);
      prefixError.setAttribute("id", "field__error--item");
      document.getElementById("field__error--list").appendChild(prefixError);
    }

    document.getElementById("field__error").showModal();
    document.getElementById("submit__modal").close();
    document
      .getElementById("field__error--ok")
      .addEventListener("click", function () {
        while (document.getElementById("field__error--list").firstChild) {
          document
            .getElementById("field__error--list")
            .removeChild(document.getElementById("field__error--item"));
        }
        document.getElementById("field__error").close();
      });
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
