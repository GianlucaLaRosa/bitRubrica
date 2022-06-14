let createGrid = contacts => {
  document.querySelector("main").innerHTML = `<div id="grid__container"></div>`;

  const gridRef = document.querySelector("#grid__container");

  if (contacts.length === 0 || contacts === "undefined") {
    const messageDiv = document.createElement("div");
    const message = document.createTextNode("Nobody in your address book.");
    messageDiv.appendChild(message);
    gridRef.appendChild(messageDiv);
  } else {
    contacts.forEach(contact => {
      const contactDiv = document.createElement("div");
      contactDiv.addEventListener("click", () => {
        console.log(`open modal for card ${contact.id}`);
      });

      // create and set profile image
      const profImg = new Image();
      profImg.src = contact.avatar;
      profImg.alt = `Foto profilo di ${contact.name} ${contact.surname}`;

      // create name and surname text node
      const fullNameText = document.createTextNode(
        `${contact.name} ${contact.surname}`
      );

      // append all infos
      contactDiv.appendChild(profImg);
      contactDiv.appendChild(fullNameText);

      gridRef.appendChild(contactDiv);
    });
  }
};

export default createGrid;
