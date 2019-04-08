const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
let newForm = document.getElementById("add-toy-id");

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

renderAllToys();

function renderAllToys(){
  let toyCollection = document.getElementById("toy-collection");
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      let card = document.createElement("div");
      card.dataset.id = `${item.id}`
      card.classList.add("card");
      card.innerHTML = `<h2>${item.name}</h2>`;
      let image = document.createElement("img");
      image.src = `${item.image}`;
      image.classList.add("toy-avatar");
      card.appendChild(image);

      let pTag = document.createElement("p")
      pTag.innerText = `${item.likes} Likes`;
      card.appendChild(pTag);

      let likeButton = document.createElement("button");
      likeButton.classList.add("like-btn");
      likeButton.innerText = "Like <3";
      likeButton.addEventListener("click", likeButtonEventHandler)
      card.appendChild(likeButton)

      toyCollection.appendChild(card);
    })
  }
  )
}

function likeButtonEventHandler(event){
  let p = event.target.parentNode.querySelector("p")
  // console.log(p.parentNode)
  p.innerText = parseInt(p.innerText) + 1;

  data = {
    likes: `${parseInt(p.innerText)}`
  }

  fetch(`http://localhost:3000/toys/${p.parentNode.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json());

  p.innerText = `${p.innerText} Likes`;
}

newForm.addEventListener("submit", newFormEventHandler);

function newFormEventHandler(event){
  event.preventDefault();

  let toyNameField = document.getElementById("input-name-id");
  let imageURL = document.getElementById("input-image-url-id");

  data = {
    name: `${toyNameField.value}`,
    image: `${imageURL.value}`,
    likes: "0"
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json());

  toyNameField.value = "";
  imageURL.value = "";
}
