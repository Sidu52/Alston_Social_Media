// get all the comment buttons
(function () {

    const commentButtons1 = document.querySelectorAll('.comment-button');
    const commentText = document.querySelectorAll('.comments');
    // loop through the comment buttons and attach click event handler
    commentButtons1.forEach((button) => {
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

})();
