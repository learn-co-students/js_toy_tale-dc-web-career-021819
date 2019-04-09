const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector(`#toy-collection`)
const submit = document.querySelector(`.add-toy-form`)
const jessie = "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist"
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    submitListener()
  } else {
    toyForm.style.display = 'none'
  }
})

// Step 2
const getToys= () => {
  console.log('get monsters function')
  fetch(`http://localhost:3000/toys`)
  .then(res => res.json())
  .then(toys => {
    for (i=0;i<toys.length;i++){
      createToyCard(toys[i])
    }
  })
}

// Step 3
const createToyCard= (toy) => {
  toyCollection.innerHTML += `
    <div class="card" id=${toy.id}>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p> ${toy.likes} </p>
      <button class="like-btn">Like <3</button>
    </div>`
}

// Step 4
const submitListener= () => {
  submit.addEventListener('submit',a => {
    postNewToy(getFormData()) // run the postNewToy method with the Form data
    submit.reset() // and clear that form.
  })
}

const getFormData= () => { // on submit do this IFFE
  let input = document.querySelectorAll(`.input-text`) // Get DOM elements
  return {name:input[0].value, image:input[1].value, likes: 0} // return an object with key:value pairs set from form data.

}

const postNewToy= (toy) => { // toy = getFormData
  const post = { // set the post function for the fetch call.
    method: 'POST',
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify(toy)
  }
  fetch('http://localhost:3000/toys', post)
  .then(res => res.json())
  .then(res => {
    console.log('new toy posted', res)
  })
}

// Step 5

const addClicksToLikes= () => {
  document.addEventListener('click', (event) => {
    if (event.target.className === 'like-btn') {
      let likeNum = event.target.previousElementSibling
      likeNum.innerText = parseInt(likeNum.innerText) + 1
      patchLike( parseInt(likeNum.innerText), likeNum.parentElement.id)
    }
  })
}


const patchLike= (toyLikes, toyID) => { //toy = toy Obj
  const patch = {
    method: `PATCH`,
    headers: {"Content-Type": `application/json`, Accept: `application/json`} ,
    body: JSON.stringify({likes: toyLikes})
  }
  fetch(`http://localhost:3000/toys/${toyID}`, patch)
  .then(res => res.json())
  .then(res => {
    console.log(`new likes logged`, res)
  })
}

// a function that calls all the important functions.
const init= () => {
  getToys()
  addClicksToLikes()
}

// call the init function at the DOMContentLoaded
document.addEventListener('DOMContentloaded', init())
