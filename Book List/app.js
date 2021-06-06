//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//Ui Constructor
function UI() {}

function Store() {}

//Add  Book
UI.prototype.addBooktoList = (book) => {
  const list = document.getElementById("book-list");
  //Create tr elements
  const row = document.createElement("tr");
  // Insert Col
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>
    <a href="#" class="delete">X</a>
    </td>
    `;
  list.appendChild(row);
  //   row.addEventListener("click", () => {
  //     row.remove();
  //   });
  //   console.log(row);
};

UI.prototype.clearFields = () => {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = (message, className) => {
  const errorDiv = document.createElement("div");
  errorDiv.className = `alert ` + className;
  errorDiv.textContent = message;
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(errorDiv, form);
  //Timeout after 3s
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = (target) => {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

Store.prototype.getBooks = () => {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
};

const getBookProto = new Store();

Store.prototype.displayBooks = () => {
  const books = getBookProto.getBooks();
  books.forEach((book) => {
    const ui = new UI();
    ui.addBooktoList(book);
  });
};

Store.prototype.addBooks = (book) => {
  const books = getBookProto.getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
};

Store.prototype.removeBooks = (isbn) => {
  const books = getBookProto.getBooks();
  books.forEach((book, index) => {
    if (isbn === book.isbn) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
};

//DOM load event

document.addEventListener("DOMContentLoaded", () => {
  const store = new Store();
  store.displayBooks();
});

//Event Listener
document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  //Instantiate
  const book = new Book(title, author, isbn);
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    return ui.showAlert("Please fill out all the fields", "error");
  }
  ui.addBooktoList(book);
  const store = new Store();
  store.addBooks(book);
  //show success

  ui.showAlert("Book Added!", "success");
  //clear fields
  ui.clearFields();
  //Add book to list
  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", (e) => {
  const ui = new UI();
  const store = new Store();

  if (confirm("Sure to remove?")) {
    ui.deleteBook(e.target);
    store.removeBooks(
      e.target.parentElement.previousElementSibling.textContent
    );
    ui.showAlert("Book Removed !", "success");
  }
  e.preventDefault();
});
