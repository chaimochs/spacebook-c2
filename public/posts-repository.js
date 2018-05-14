class PostsRepository {
    constructor() {
        this.posts = [];
    }

    fetchPosts() {
        return $.get('/posts')
            .then(
                (data) => {
                    this.posts = data;
                    return this.posts;
                })
            .catch(
                () => {
                    console.log('An error has occurred');
                })
    }

    addPost(postText) {
        return $.post("/posts", {
                text: postText
            })
            .then((saved) => {
                if (saved)
                    this.posts.push({
                        text: postText,
                        comments: [],
                        _id: saved.id
                    });
            })
            .catch(
                () => {
                    console.log('An error has occurred');
                })
    }

    removePost(index) {
        return $.ajax({
                type: 'Delete',
                url: '/delete/' + this.posts[index]._id
            })
            .then(
                (deleted) => {
                    this.posts.splice(index, 1);
                })
            .catch(
                () => {
                    console.log('An error has occurred');
                })
    }

    addComment(newComment, postIndex) {
        var route = ("/posts/" + this.posts[postIndex]._id + "/comments")
        return $.post(route, newComment)
            .then((saved) => {
                newComment._id = saved.id
                this.posts[postIndex].comments.push(newComment);
            })
            .catch(
                () => {
                    console.log('An error has occurred');
                })
    };

    deleteComment(postIndex, commentIndex) {
        return $.ajax({
                type: 'Delete',
                url: '/posts/del-comment/' + this.posts[postIndex]._id + "/" + this.posts[postIndex].comments[commentIndex]._id
            })
            .then((deleted) => {
                this.posts[postIndex].comments.splice(commentIndex, 1);
            })
            .catch(
                () => {
                    console.log('An error has occurred');
                })
    };
}

export default PostsRepository