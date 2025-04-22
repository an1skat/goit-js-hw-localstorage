let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editingIndex = null;

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

function renderContacts() {
  const list = document.getElementById("contacts-list");
  list.innerHTML = "";

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h3>${contact.firstName} ${contact.lastName}</h3>
        <p>Телефон: ${contact.phone}</p>
        <p>Email: ${contact.email}</p>
        <div class="actions">
          <button onclick="editContact(${index})">✏️</button>
          <button onclick="deleteContact(${index})">🗑️</button>
        </div>
        `;

    list.appendChild(li);
  });
}

function editContact(index) {
  const contact = contacts[index];
  document.getElementById("firstName").value = contact.firstName;
  document.getElementById("lastName").value = contact.lastName;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  editingIndex = index;
}

function deleteContact(index) {
  contacts.splice(index, 1);
  saveContacts();
}

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
  };

  if (editingIndex !== null) {
    contacts[editingIndex] = contact;
    editingIndex = null;
  } else {
    contacts.push(contact);
  }

  saveContacts();
});

renderContacts();
