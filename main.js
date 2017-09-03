var posts = [];
var idCounter = 0;

function newPost(text) {
    var post = {
        text    : text,
        id      : idCounter,
        comments : []
    };
    idCounter++;
    posts.push(post);
}

function renderPosts() {
    $('.posts').empty();
    for(var i = 0; i < posts.length; i++) {
        $('.posts').append('<p class="post" data-id="' + posts[i].id + '"> <button type="button" class="reveal-comment">COMMENT</button> ' + posts[i].text + ' <button type="button" class="remove">REMOVE</button></p><div class="comments"></div><form class="comment-form"><input type="text" class="post-username form-control" placeholder="Username"><input type="text" class="post-comment form-control" placeholder="Post Comment"><button type="button" class="add-comment">COMMENT</button></form>'); 
        for(var j = 0; j < posts[i].comments.length; j++) {
            $("p[data-id="+posts[i].id+"]").next('.comments').append('<p class="comment">' + posts[i].comments[j].username + ': ' + posts[i].comments[j].comment + '<button type="button" class="remove-comment">REMOVE</button></p>');
        }   
    }
    $('.comment-form').hide();
    console.log($('.posts').find('.remove .remove-comment .add-comment .post'));
    $('.posts').find('.remove').off();    
    $('.remove').click(function() {
        var text = $(this).closest('.post').text().replace('REMOVE', '').trim();
        var index = findIndex('text', text);
        posts.splice(index, 1);
        renderPosts();
    });

    $('.reveal-comment').click(function(){
        $(this).closest('.posts').find('.reveal-comment').show();
        $(this).hide();
        $(this).closest('.posts').find('.comment-form').hide();        
        $(this).closest('.post').nextAll('.comment-form').first().show();
    });

    $('.add-comment').click(function(){
        var username = $(this).prev('.post-comment').prev('.post-username').val();
        var comment = $(this).prev('.post-comment').val();
        var id = $(this).closest('.comment-form').prevAll('.post').first().data().id;
        var index = findIndex('id', id);
        posts[index].comments.push({username: username, comment: comment});
        renderPosts();
    });

    $('.remove-comment').click(function(){
        var id = $(this).closest('.comments').prevAll('.post').first().data().id;
        var postIndex = findIndex('id', id);
        var text = $(this).closest('.comment').text().replace('REMOVE', '').trim(); 
        for(var i = 0; i < posts[postIndex].comments.length; i++) {
            if(posts[postIndex].comments[i].username + ': ' + posts[postIndex].comments[i].comment === text) {
                posts[postIndex].comments.splice(i, 1);
                renderPosts();
            }
        }  
        console.log('error');     
    });

    $('.post').click(function(){
        
    });
}

$('.add-post').click(function() {
    var input = $('#post-name').val();
    newPost(input);
    renderPosts();
});

function findIndex(property, value) {
    for(var i = 0; i < posts.length; i++) {
        if(posts[i][property] === value) {
            return i;
        }
    }
    console.log('text not found');
    return '';
}