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
      let pageIndicator = (document.getElementById("page").innerHTML =
        params._page);
      if (res.headers.get("Link") !== null && res.headers.get("Link") !== "") {
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
      }

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
        if (res.headers.get("Link") !== null) {
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
        }

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
        });
      }
    } else {
      throw new Error("Sorry, impossible to access the database.");
    }
  } catch (err) {
    console.error(err);
  }
};

export function getAddressGrid();

export function test() {
  console.log('test');
}