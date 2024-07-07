let uniqueId = 0;
let myLibrary = [];

const newBook = document.querySelector("#newBook");
const editBook = document.querySelector("#editBook");
const deleteBook = document.querySelector("#deleteBook");
const addBook = document.querySelector("#addBook");
const inputCard = document.querySelector("#input");
const cardContainer = document.querySelector(".card-container");
const controlButtons = document.querySelectorAll(
  ".controls-container > button"
);

function Book(title, author, pages, id, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
  this.read = read;

  this.info = function () {
    let infoString = this.title + ", " + this.author + ", " + this.pages + ", ";
    infoString += this.read ? "read" : "not read yet";
    return infoString;
  };
  this.toggleRead = function () {
    this.read = !this.read;
  };
}

const book = new Book("The Hobbit", "JRR Tolkein", "300", 0, false);
console.log(book.info());

function displayBooks() {
  myLibrary.forEach((book) => {
    console.log(book);
  });
}

//new book clicked
function toggleInputForm() {
  console.log("toggleinputform");
  inputCard.classList.toggle("hide");
  controlButtons.forEach((button) => {
    console.log(button);
    button.classList.toggle("hide");
    console.log(button.id);
    console.log(button.style.display);
  });
}

function submitInputForm(event) {
  event.preventDefault();
  uniqueId++;
  console.log("idk if this worked");
  const inputForm = document.querySelector("#inputBook");
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const newBook = new Book(title, author, pages, uniqueId, false);
  myLibrary.push(newBook);
  console.log("new book added to library");
  displayBooks();
  inputForm.reset();
  toggleInputForm();
  displayBookInCard(newBook);
  console.log(newBook.read);
}

function displayBookInCard(book) {
  console.log("displayerbookincard");
  console.log(book.title);
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
          <h2>${book.title}</h2>
          <p>${book.author}</p>
          <p>${book.pages} pages</p>
          <div class="card-controls">
            <button id="readBook" onclick="toggleReadStatus('${book.id}')">Read</button>
            <button id="deleteABook" onclick="deleteABook('${book.id}')">Delete</button>
          </div>
        `;

  card.setAttribute("unique-id", book.id);
  cardContainer.appendChild(card);
  console.log("end of displaybookincard");
}

function toggleReadStatus(id) {
  //edit the truth value of read in array
  const button = cardContainer.querySelector(
    `[unique-id='${id}'] > .card-controls > #readBook`
  );
  console.log(button);
  const book = myLibrary.find((book) => {
    return book.id == id;
  });

  console.log(book);

  book.toggleRead();

  button.textContent = book.read ? "Read ✅" : "Read";
  console.log(button.textContent);
  console.log(`${book.title} read status: ${book.read}`);
}

function deleteABook(id) {
  myLibrary = myLibrary.filter((book) => {
    return book.id != id;
  });
  // Remove the card from the DOM
  const card = cardContainer.querySelector(`[unique-id='${id}']`);
  if (card) {
    cardContainer.removeChild(card);
  }
  console.log(`Book at index ${id} deleted from library`);
}
