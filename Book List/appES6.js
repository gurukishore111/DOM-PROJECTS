//Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Ui Constructor
class UI {
  //Add  Book

  addBooktoList(book) {
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
  }

  showAlert(message, className) {
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
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//LS

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = this.getBooks();
    books.forEach((book) => {
      const ui = new UI();
      ui.addBooktoList(book);
    });
  }
  static addBooks(book) {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBooks(isbn) {
    const books = this.getBooks();
    books.forEach((book, index) => {
      if (isbn === book.isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM LOAD EVENT
document.addEventListener("DOMContentLoaded", () => {
  Store.displayBooks();
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
  //Add to ls
  Store.addBooks(book);
  //show success
  ui.showAlert("Book Added!", "success");
  //clear fields
  ui.clearFields();
  //Add book to list
  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", (e) => {
  const ui = new UI();
  if (confirm("Sure to remove?")) {
    ui.deleteBook(e.target);
    //RemoveLocalS
    Store.removeBooks(
      e.target.parentElement.previousElementSibling.textContent
    );
    ui.showAlert("Book Removed !", "success");
  }
  e.preventDefault();
});
