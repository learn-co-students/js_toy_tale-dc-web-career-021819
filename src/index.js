document.addEventListener('DOMContentLoaded', function(){
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  const createFormSubmit = document.querySelector('.add-toy-form')
  createFormSubmit.addEventListener('submit', createToy)
  displayToys()




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
})





// grab part of DOM, takes a toy as a variable and displays it in the proper div
function displaySingleToy(toy){
  let getToyContainer = document.getElementById('toy-collection')

  let cardDiv = document.createElement('div')
  cardDiv.setAttribute('class', 'card')

  let likeBtn = document.createElement('button')
  likeBtn.setAttribute('class', 'like-btn')
  likeBtn.innerText = 'Like <3'
  likeBtn.addEventListener('click', increaseLike)

  cardDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
`
  cardDiv.append(likeBtn)

  getToyContainer.appendChild(cardDiv)

}

function displayToys(){
  // getToyDiv = document.getElementById('toy-collection')

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => json.forEach(function(toy){
    displaySingleToy(toy)
  }
  ))
}

// pass the form submission values to a post fetch and display new toy in proper div
function createToy(event){
  event.preventDefault()


  const name = event.currentTarget.name.value
  const url = event.currentTarget.image.value
  const id = event.currentTarget.id.value

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
  }).then(res => res.json())
    .then(json => displaySingleToy(json))
}

function increaseLike(id){
  // find toy card div
  let toyCard = document.getElementsByClassName('card')
  debugger

  // find all children of the card
  let cardChildren = toyCard.findChildren()

  // target the likes element
  let likeText = cardChildren[2]
  debugger

  fetch('http://localhost:3000/toys/${:id}', {
    method: 'PATCH',
    body: JSON.stringify({
      likes: `${likes + 1} Likes`
    }),
    headers: {
      'Content-type': 'application.json',
      Accept: 'application/json'
    },
  }).then(res => res.json())
    .then(json => {
      debugger
      cardChildren[2].innerHTML = likes

    })
}
