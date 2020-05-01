document.addEventListener("DOMContentLoaded", () => {
  getAllToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  let addToy = false;

  // YOUR CODE HERE

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", submitHandler);
    } else {
      toyForm.style.display = "none";
    }
  });
});

// OR HERE!

let toyDiv = document.getElementById("toy-collection");
function getAllToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toysArray => {
      toysArray.forEach(renderToyCard);
    });
}

function renderToyCard(toy) {
  let toyCard = document.createElement("div");
  let nameHeader = document.createElement("h2");
  let toyImage = document.createElement("img");
  let likesP = document.createElement("p");
  let likeBtn = document.createElement("button");

  toyCard.id = toy.id;
  nameHeader.innerText = toy.name;
  toyImage.src = toy.image;
  likesP.innerText = `Likes: ${toy.likes}`;
  likeBtn.innerText = "Like <3";

  toyCard.classList.add("card");
  toyImage.classList.add("toy-avatar");
  likeBtn.classList.add("like-btn");
  likeBtn.addEventListener("click", likeHandler);

  toyCard.appendChild(nameHeader);
  toyCard.appendChild(toyImage);
  toyCard.appendChild(likesP);
  toyCard.appendChild(likeBtn);

  toyDiv.appendChild(toyCard);
}

function submitHandler() {
  event.preventDefault();

  let name = document.getElementById("name-input").value;
  let image = document.getElementById("image-input").value;

  postToy(name, image);
  document.querySelector(".container").style.display = "none";
}

function postToy(name, image) {
  let newToy = { name: name, image: image, likes: 0 };
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
    .then(resp => resp.json())
    .then(renderToyCard);
}

function likeHandler() {
  event.preventDefault();
  let currentToy = event.target.parentElement;
  patchToy(currentToy);
}

function patchToy(toy) {
  let toyId = toy.id;
  let toyLikes = parseInt(toy.querySelector("p").innerText.split(": ")[1]);
  toyLikes += 1;
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: toyLikes })
  })
    .then(resp => resp.json())
    .then(data => {
      let currentCard = document.getElementById(data.id);
      currentCard.querySelector("p").innerText = `Likes: ${data.likes}`;
    });
}
