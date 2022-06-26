//const { response } = require("express");

async function getPosts(){
    return await fetch('http://localhost:3000/posts')
    .then((response) => response.json())
    .then((data) => data);
};

//This event happens when all the content of the page has been downloaded
document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.landmarks');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `
                <div class="col">
                  <div class="card">
                    <img src=${post.imageURL} class="card-img-top" alt=${post.title}>
                    <div class="card-body">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.description}</p>
                      <a href="/landmark?id=${post.id}" class="btn btn-primary">Details</a>
                    </div>
                  </div>
                </div>
        `;
        //this function automatically converts HTML code to DOM element
        articles.insertAdjacentHTML("beforeend", postHTML);
    });
})

let callMeForm = document.querySelector('.call-me-form');

callMeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let phoneInput = document.querySelector('input');
    fetch('http://localhost:3000/callback-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phoneInput.value
      })
    }).then((resp)=> resp.text()).then(() => alert('we will call you back asap'))
})

let emailRequestForm = document.querySelector('.email-request-form');

emailRequestForm.addEventListener('submit', function(e) {
  e.preventDefault();
  fetch('http://localhost:3000/emails', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.querySelector('#name').value,
      text: document.querySelector('#message').value,
      email: document.querySelector('#email').value
    })
  }).then((resp) => resp.text()).then( (data) => console.log(data));
})