class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.formState = "add";
  }

  showpost(posts) {
    let output = "";
    posts.forEach((post) => {
      output += `
          <div class="card mb-3">
          <div class="card-body">
          <h4 class="card-title">
              ${post.title}
             </h4>
             <p class="card-text">${post.body}</p>
             <a href="#" class="edit card-link" data-id="${post.id}">
             <i class="fas fa-pencil-alt"></i>
             </a>
             <a href="#" class="delete card-link" data-id="${post.id}">
             <i class="fas fa-times-circle"></i>
             </a>
           </div>
          </div>  
          `;
    });
    this.post.innerHTML = output;
  }
  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".postContainer");
    const post = document.querySelector("#posts");
    container.insertBefore(div, post);
    //Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  clearPost() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }
  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }
  fillForm(data) {
    this.titleInput.value = data.title.trim();
    this.bodyInput.value = data.body.trim();
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  changeFormState(state) {
    if (state === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel Edit"));

      const cardForm = document.querySelector(".card-form");
      const formEnd = document.querySelector(".form-end");

      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = "Post It";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }

      this.clearIdInput();
      this.clearPost();
    }
  }
  clearIdInput() {
    this.idInput.value = "";
  }
}

const ui = new UI();
module.exports = ui;
