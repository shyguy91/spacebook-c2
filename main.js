var SpacebookApp = function () {
    var posts = [
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]},
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]},
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]}
    ];

    // the current id to assign to a post
    var currentId = 0;
    var $posts = $('.posts');

    var _findPostById = function (id) {
        for (var i = 0; i < posts.length; i += 1) {
            if (posts[i].id === id) {
                return posts[i];
            }
        }
    }

    var createPost = function (text) {
        var post = {
            text: text,
            id: currentId,
            comments: []
        }

        currentId += 1;

        posts.push(post);
    }

    var renderPosts = function () {
        $posts.empty();

        for (var i = 0; i < posts.length; i += 1) {
            var post = posts[i];

            var commentsContainer = '<div class="comments-container">' +
                '<input type="text" class="comment-name">' +
                '<button class="btn btn-primary add-comment">Post Comment</button> <div class="comments-list"></div></div>';

            $posts.append('<div class="post" data-id=' + post.id + '>'
                + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
                commentsContainer + '</div>');
        }
    }

    var removePost = function (currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;

        var post = _findPostById(id);

        posts.splice(posts.indexOf(post), 1);
        $clickedPost.remove();
    }

    var createComment = function (currentCommentButton, commentText) {
        //get comment text

        //get post id
        var $postToComment = $(currentCommentButton).closest('.post');
        var id = $postToComment.data().id;
        //find in posts array
        var post = _findPostById(id);
        //push comment into post object in posts array
        post.comments.push(commentText);
        //add append to renderPosts function
        //invoke below using this and find the commentText.val
    }

    var renderComments = function (currentCommentButton) {
        var $postToComment = $(currentCommentButton).closest('.post');
        var id = $postToComment.data().id;
        var post = _findPostById(id);

        var $placeToComment = $(currentCommentButton).closest('.comments-container').find('.comments-list');
        $placeToComment.empty();
        
        var allComments = "";
        for (var j = 0; j < post.comments.length; j++) {
            allComments += '<p>' + '<a href="#" class="remove-comment">remove</a>' + post.comments[j] + '</p>';
        }
        $placeToComment.append(allComments);
    }

    var removeComment = function (currentRemoveCommentButton) {

        var $currentRemoveCommentButton = $(currentRemoveCommentButton);
        var $postToComment = $currentRemoveCommentButton.closest('.post');
        var id = $postToComment.data().id;
        var post = _findPostById(id);
        
        var textToRemove = $currentRemoveCommentButton.closest('p').text().replace('remove', '').trim();
        for(var k = 0; k < post.comments.length; k++) {
            if(post.comments[k] === textToRemove) {
                post.comments.splice(k, 1);
                return;
            }
        }
    }

    var toggleComments = function (currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        $clickedPost.find('.comments-container').toggleClass('show');
    }

    return {
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,

        // TODO: Implement
        createComment: createComment,

        // TODO: Implement
        renderComments: renderComments,

        // TODO: Implement
        removeComment: removeComment,
        toggleComments: toggleComments
    }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
    var text = $('#post-name').val();

    app.createPost(text);
    app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
    app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
    app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
    var commentText = $(this).prev('.comment-name').val();
    app.createComment(this, commentText);
    app.renderComments(this);
});

$('.posts').on('click', '.remove-comment', function () {
    app.removeComment(this);
    app.renderComments(this);
});