const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(e => e.json())
    .then(e => {
      e.forEach(makeDiv);
    });
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      // submit listener here
      form = document.querySelector(".add-toy-form");
      form.addEventListener("submit", e => {
        //  debugger;
        let toyData = { name: e.target[0].value, image: e.target[1].value, likes: 0 };
        e.preventDefault();
        console.log(toyData);

        fetch("http://localhost:3000/toys", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(toyData)
        }).then(makeDiv(toyData));
      });
    } else {
      toyForm.style.display = "none";
    }
  });

  // OR HERE!
});

function makeDiv(element) {
  const toyList = document.getElementById("toy-collection");

  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h2>${element.name}</h2><img src = ${element.image} style = "height: auto; max-width: 100%"
    > <h4>Likes: <span>${element.likes}</span></h4><p hidden>${element.id}</hidden>`;
  const button = document.createElement("button");
  button.className = "like-btn"; //<button class = "like-btn" onClick =${handleClick} >Like <3</button>`;
  button.innerHTML = "Like <3";
  button.addEventListener("click", handleClick);
  div.appendChild(button);
  toyList.appendChild(div);
}
function handleClick(e) {
  let id = parseInt(e.target.parentNode.querySelector("p").innerHTML);
  let likes = parseInt(e.target.parentNode.querySelector("h4").children[0].innerHTML);
  // debugger;
  likes++;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ likes: likes })
  }).then((e.target.parentNode.querySelector("h4").children[0].innerHTML = likes));
}

function likeToy(like, div) {}
