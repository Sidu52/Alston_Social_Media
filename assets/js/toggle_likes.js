// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }
    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            
            let s = this.querySelector(".toggle-like-button .likedcount");
           
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            }).done(function(data) {
                console.log("hy")
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(s).html(`${likesCount}`);
                // $(self).html(`${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
