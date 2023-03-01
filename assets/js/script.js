// get all the comment buttons
let commentButtons = document.querySelectorAll('.comment-button');
let commentText = document.querySelectorAll('.comments');
// loop through the comment buttons and attach click event handler
commentButtons.forEach((button) => {
    button.addEventListener('click', toggleCommentBox);
});
commentText.forEach((button) => {
    button.addEventListener('click', toggleCommentBox);
});

function toggleCommentBox(event) {
    // get the post element that corresponds to the clicked comment button
    let post = event.target.closest('.feed');
    
    // get the comment container element for that post
    let commentContainer = post.querySelector('.comment-container');
    
    // toggle the show class on the comment container element
    commentContainer.classList.toggle('show');
}