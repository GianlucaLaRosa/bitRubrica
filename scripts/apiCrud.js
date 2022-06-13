// BASE ENDPOINT
const url = `http://localhost:3000/person/`;

// CREATE

let createContact = async (e, body) => {
  e.preventDefault();
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body,
    });

    if (!res.ok) {
      throw new Error("Couldn't create the contact.");
    }
  } catch (err) {
    console.err(err);
  }
};

// READ

let readContacts = async () => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Coultdn't retrieve any contact.");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
// UPDATE

let updateContact = async (e, id, body) => {
  e.preventDefault();
  try {
    const res = await fetch(`${url}?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "UPDATE",
      body,
    });

    if (!res.ok) {
      throw new Error("Couldn't update the contact.");
    }
  } catch (err) {
    console.err(err);
  }
};

// DELETE

let deleteContact = async id => {
  try {
    const res = await fetch(`${url}?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Couldn't delete the contact.");
    }
  } catch (err) {
    console.err(err);
  }
};

const apiCrud = { createContact, readContacts, updateContact, deleteContact };

export default apiCrud;
