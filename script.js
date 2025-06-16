const books = [];
// const saveButton = document.getElementById('saveBtn');
const form = document.getElementById("bookForm");
const addBtn = document.getElementById("addBtn");
const formContainer = document.getElementById("formContainer");
const cancelBtn = document.getElementById("cancelBtn");
const backdrop = document.getElementById("backdrop");

addBtn.addEventListener("click", () => {
  formContainer.style.display = "block";
  backdrop.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
  formContainer.style.display = "none";
  backdrop.style.display = "none";
});

form.addEventListener("submit", function (addBook) {
  addBook.preventDefault();
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookPageCount = document.getElementById("pages").value;
  const readStatus = document.getElementById("read").checked;
  const imageUrlInput = document.getElementById("bookImageUrl").value;
  const imageFileInput = document.getElementById("bookImageFile").files[0];

  let imageSrc = "";

  if (imageFileInput) {
    // If a file is uploaded, use it
    imageSrc = URL.createObjectURL(imageFileInput);
  } else if (imageUrlInput) {
    // Else use the URL
    imageSrc = imageUrlInput;
  }

  const book = {
    title: bookTitle,
    author: bookAuthor,
    pages: bookPageCount,
    isRead: readStatus,
    link: bookUrl,
    image: imageSrc,
  };

  books.push(book);
  displayBooks(book);
  form.reset();
});

function displayBooks(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.textContent = book.title;
  title.classList.add("cardTitle");

  const img = document.createElement("img");
  img.src = book.image;
  img.alt = book.title + " cover";
  img.style.width = "150px"; // optional styling

  const author = document.createElement("p");
  author.textContent = "Author: " + book.author;
  author.classList.add("cardAuthor");

  const pages = document.createElement("p");
  pages.textContent = "Pages: " + book.pages;
  pages.classList.add("cardPages");

  const readStatus = document.createElement("p");
  readStatus.textContent = book.isRead ? "Read ✅" : "Not Read ❌";
  readStatus.classList.add("cardRead");

  const toggleBtn = document.createElement("button");
  toggleBtn.id = "read";
  toggleBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
  toggleBtn.addEventListener("click", function () {
    book.isRead = !book.isRead;
    readStatus.textContent = book.isRead ? "Read ✅" : "Not Read ❌";
    toggleBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "deleteBtn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    card.remove();
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(readStatus);
  card.appendChild(toggleBtn);
  card.appendChild(deleteBtn);

  document.getElementById("booksContainer").appendChild(card);
}
