//Since the admin page consists of dynamic content, so there are no posts, edit buttons, delete buttons in
//static content. That's why we can't attach an even handler to the delete buttons, so we need to use
//Event Delegation.

//const { response } = require("express");

//closing in curly brackets to avoid ambiguity of variable names i.e the variables with the same name in 
//different files will be treated as different variables
{
    let articlesBlock = document.querySelector('.articles-list');

    articlesBlock.addEventListener('click', function(e){
        if(e.target.classList.contains('remove-btn')){
            let id = e.target.parentNode.parentNode.querySelector('.id').value;
            fetch("http://localhost:3000/posts/"+id, {
                method: 'DELETE'
            }).then((response) => response.text())
            .then(() => window.history.go());
        }
    });
}

