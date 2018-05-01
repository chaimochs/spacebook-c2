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

  var currentId   = 0;
  var commentId   = 0;
  var $posts      = $('.posts');

  var STORAGE_ID  = 'spacebook';
  var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(posts));
  }

  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }

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
    saveToLocalStorage();
  }

  var renderPosts = function () {
    $posts.empty();
       posts = getFromLocalStorage();
    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];
      var commentsContainer = '<div class="comments-container">' +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button>' +
        renderComments(post.comments) +
        '</div>';

      $posts.append('<div class="post" data-id=' + post.id + '>' +
        '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    saveToLocalStorage();
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');

    $clickedPost.find('.comments-container').toggleClass('noshow');
  }

  var createComment = function (commentButton) {
    var comment = $(commentButton).parent().find('.comment-name').val();
    var postId = $(commentButton).closest('.post').data().id;
    var post = _findPostById(postId);
    var commentObj = {
      id: commentId,
      text: comment
    };

    post.comments.push(commentObj);
    saveToLocalStorage();
    commentId += 1;
    }

  var renderComments = function (comments) {
    var commentString = '';

    for (i = 0; i < comments.length; i++) {
      commentString += '<p class = "comments-list" data-PiD = ' + comments[i].id + '> ' + comments[i].text + ' <button class="btn btn-warning remove-comment">Remove</button> </p>';
    }
    return commentString;
  }

  var removeComment = (currentComment) => {
    var postPid = $(currentComment).closest('.post').data().id;
    var commentPid = $(currentComment).parent('.comments-list').data().pid;

    posts[postPid].comments.splice(posts.indexOf(commentPid, 1) );
    saveToLocalStorage();
    renderPosts();
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

app.renderPosts();

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
  app.createComment(this);
  app.renderPosts(this);
});

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
});