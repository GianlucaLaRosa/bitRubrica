const form = document.getElementById("create__form");
const name = document.getElementById("name").value;
const surname = document.getElementById("surname").value;
const avatar = document.getElementById("avatar").value;
const fav_video = document.getElementById("fav_video").value;
const email = document.getElementById("email").value;
const prefix = document.getElementById("prefix").value;
const tel = document.getElementById("tel").value;
const web_site = document.getElementById("web_site").value;
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const mailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const videoRegex = /^.*\.(mp4|MP4|avi|AVI|mov|MOV)$/;

let isFormValid = false;

form.addEventListener("submit", e => {
  e.preventDefault();

  if (
    name.length > 0 &&
    surname.length > 0 &&
    urlRegex.test(avatar) &&
    urlRegex.test(web_site) &&
    mailRegex.test(email) &&
    videoRegex.test(fav_video) &&
    /^[0-9]{6,7}$/.test(tel) &&
    /^[+]{1}\d{2,3}$/.test(prefix)
  ) {
    console.log(true);
  }
});
