const ui = require("./UI");
import { url } from "./../utils/urls";

document.addEventListener("DOMContentLoaded", getPosts);
document.querySelector(".post-submit").addEventListener("click", addPost);
document.querySelector("#posts").addEventListener("click", deletePost);
document.querySelector("#posts").addEventListener("click", editPost);
document.querySelector(".card-form").addEventListener("click", cancelEdit);

//GET POST
function getPosts() {
  fetch(`${url}/posts`)
    .then((res) => res.json())
    .then((data) => ui.showpost(data))
    .catch((err) => console.log(err));
}

//ADD POST
function addPost() {
  const title = document.querySelector("#title").value;
  const bodyValue = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  if (title === "" || bodyValue === "") {
    return ui.showAlert("Fill out all the fields!", "alert alert-danger");
  }

  if (id === "") {
    //Create Post
    fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: bodyValue,
      }),
    })
      .then((data) => {
        ui.showAlert("Post added!", "alert alert-success");
        ui.clearPost();
        getPosts();
      })
      .catch((err) => console.log(err));
  } else {
    fetch(`${url}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: bodyValue,
      }),
    })
      .then((data) => {
        ui.showAlert("Post updated!", "alert alert-success");
        ui.changeFormState("add");
        getPosts();
      })
      .catch((err) => console.log(err));
  }
}

//DELETE POST
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    console.log(e.target.parentElement.classList);
    if (confirm("Are you sure?")) {
      fetch(`${url}/posts/${id}`, {
        method: "DELETE",
      })
        .then((data) => {
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

//EDIT POST
function editPost(e) {
  //Edit state
  if (e.target.classList.contains("edit")) {
    const id = e.target.dataset.id;
    const body = e.target.previousElementSibling.textContent;
    const title =
      e.target.previousElementSibling.previousElementSibling.textContent;
    let data = {
      id,
      title,
      body,
    };

    ui.fillForm(data);
  }

  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }

  e.preventDefault();
}
