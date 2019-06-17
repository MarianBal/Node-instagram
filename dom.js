const express = require('express');
const cors = require('cors')

const app = express()

app.use( cors() );
app.use(express.json())

let nextId= 3
const posts = [
    {image: 'https://www.probytes.net/wp-content/uploads/2018/01/2.jpg', text: 'Meme 1', id: 1, likes:0},
    {image: 'https://ardalis.com/wp-content/uploads/2017/09/TwoStatesEveryProgrammer.png', text: 'Meme 2', id: 2, likes:0},
]

app.get('/api/instagram', function (req, res) {
   
    res.json(posts)
     
})

app.post('/api/instagram', function(req, res){

    const newPost = req.body;
    newPost.id = nextId++;

    posts.unshift(newPost);
 

    res.json(newPost)

})

app.listen(4000)