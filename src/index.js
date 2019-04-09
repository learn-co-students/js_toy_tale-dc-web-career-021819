const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  getAllToys();
})

toyForm.querySelector('form').addEventListener('submit', handleFormSubmit)

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


// OR HERE!
function handleFormSubmit(event){
  event.preventDefault();
  let inputs = document.querySelectorAll('.input-text');
  let name = inputs[0].value;
  inputs[0].value = '';
  let url = inputs[1].value;
  inputs[1].value = '';
  postToys(name, url)
}

function postToys(name, url){
  let obj = {name: name, image: url, likes: 0}
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  }).then(res => res.json())
  .then(renderToy)
}


function getAllToys(){
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach(renderToy))
}

function renderToy(toy){
  let collection = document.getElementById('toy-collection');
  let div = collection.appendChild(document.createElement('div'));
  div.classList.add('card');
  let nameH = div.appendChild(document.createElement('h2'));
  nameH.innerText = toy.name;
  let img = div.appendChild(document.createElement('img'));
  img.src = toy.image;
  img.classList.add('toy-avatar');
  let likesP = div.appendChild(document.createElement('p'));
  likesP.innerText = `${toy.likes} ${toy.likes === 1 ? "Like" : "Likes"}`;
  let btn = div.appendChild(document.createElement('button'));
  btn.classList.add('like-btn');
  btn.innerText = "Like <3";
  btn.addEventListener('click', function(){
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: `${++toy.likes}`})
    })
    likesP.innerText = `${toy.likes} ${toy.likes === 1 ? "Like" : "Likes"}`;
  })
}
