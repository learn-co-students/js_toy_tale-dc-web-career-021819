const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
let addToy = false

// YOUR CODE HERE
class Toy {
  constructor(toyObject){
    this.id = toyObject.id
    this.name = toyObject.name
    this.image = toyObject.image
    this.likes = toyObject.likes
  }

  render(){
    const container = document.querySelector('#toy-collection')

    const card = document.createElement('div')
    card.className = "card"
    card.id = this.id
    container.appendChild(card)

    const name = document.createElement('h2')
    name.innerText = this.name
    card.appendChild(name)

    const image = document.createElement('img')
    image.className = "toy-avatar"
    image.src = this.image
    card.appendChild(image)

    const likes = document.createElement('p')
    likes.innerText = `${this.likes === 1 ? this.likes + " like" : this.likes + " likes"}`
    card.appendChild(likes)

    const likeBtn = document.createElement('button')
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like <3"
    likeBtn.addEventListener('click', this.likeToy)
    card.appendChild(likeBtn)
  }

  getToyById(){

  }
  likeToy(event){
    event.preventDefault()
    const card = this.parentElement
    let toyId = card.id
    let likesTag = card.querySelector('p')
    let numLikes = likesTag.innerText

    fetch(`http://localhost:3000/toys/${toyId}`,
      {method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"likes": `${parseInt(numLikes) + 1}`})}).then(resp => resp.json()).then(toyObj => likesTag.innerText = `${toyObj.likes === 1 ? toyObj.likes + " like" : toyObj.likes + " likes"}`)
  }
}

  function renderToys(){
    const allToys = fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => toys.forEach(function(toyObject){
      newToy = new Toy(toyObject)
      newToy.render()
    }))
  }

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    // submit listener here

  } else {
    toyFormContainer.style.display = 'none'
  }
})

toyForm.addEventListener('click', (event) => {
  event.preventDefault()
  // debugger
  let newToy = {likes: 0}
  newToy.name = toyForm.name.value
  newToy.image = toyForm.image.value
  fetch("http://localhost:3000/toys",
    {method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newToy)}).then(resp => resp.json()).then(toyObject => new Toy(toyObject)).then(toy => toy.render())
  })

renderToys()
// OR HERE!
