function fetch (){
$.get('/posts', function(err, data){
    if(err){console.log("An error has occurred")}
        else{console.log("data received")}
});
}