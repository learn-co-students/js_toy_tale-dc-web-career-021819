const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    document.querySelector(".submit").addEventListener("click", (event) => {
      event.preventDefault()
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body:
        JSON.stringify({
          "name": document.querySelectorAll(".input-text")[0].value,
          "image": document.querySelectorAll(".input-text")[1].value,
          "likes": 0
        })
      })
      toyForm.style.display = 'none'
      createToyCard({
        "name": document.querySelectorAll(".input-text")[0].value,
        "image": document.querySelectorAll(".input-text")[1].value,
        "likes": 0
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
const toyCollection = document.querySelector('#toy-collection')

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(response =>{
  response.forEach(createToyCard)
})

function createToyCard(toy){
  var toyDiv = document.createElement("div")
  var toyLikes = toy.likes
  toyDiv.className = "card"
  toyDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p id=${toy.id}-likes>${toy.likes} Likes </p>
  <button class="like-btn" id=${toy.id}>Like <3</button>`
  toyCollection.append(toyDiv)

  document.getElementById(toy.id).addEventListener("click", (event) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:
      JSON.stringify({
        "likes": ++toyLikes
      })
    })
    document.getElementById(`${toy.id}-likes`).innerText = `${toyLikes} Likes `
  })
}
