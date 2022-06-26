//Since the admin page consists of dynamic content, so there are no posts, edit buttons, delete buttons in
//static content. That's why we can't attach an even handler to the edit buttons, so we need to use
//Event Delegation.

//const { text } = require("express");


//closing in curly brackets to avoid ambiguity of variable names i.e the variables with the same name in 
//different files will be treated as different variables
{
    let articlesBlock = document.querySelector('.articles-list');
    let updateBtn = document.querySelector('#v-pills-update-post-tab');
    let updateForm = document.querySelector('.update-post-form');

    let titleInput = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');
    let id;

    articlesBlock.addEventListener('click', async function(e){
        if(e.target.classList.contains('edit-btn')){
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/'+id)
            .then((response) => response.json())
            .then((data) => data)
            
            titleInput.value = postInfo.title;
            textArea.value = postInfo.text;

            updateBtn.click();
        }
    });


    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let createDescription;
        if(textArea.value.indexOf('.') === -1){
            createDescription = textArea.value;
        }
        else{
            createDescription = textArea.value.substring(0, textArea.value.indexOf('.')+1);
        }
        fetch('http://localhost:3000/posts/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : titleInput.value,
                text : textArea.value,
                description : createDescription
            })
        }).then((response)=>response.text()).then(()=> window.history.go());
    })


}
