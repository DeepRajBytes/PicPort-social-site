require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// server connection down
mongoose.connect(`${process.env.URL}/${process.env.DATABASE}`)
.then(() => {
    console.log('Connection successful');
})
.catch((err) => {
    console.error('Connection error:', err);
});

// app.get('/', (req, res) => {
//     res.send('Server is on');
// });
// server connection up down

//middle wear section
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Adjust the limit for JSON requests
// app.use(bodyParser.json({ limit: '10mb' }));

// Adjust the limit for URL-encoded requests
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());
//middle wear section up

//images section down here
app.use('/images',express.static(path.join('images')));

//images section up here


//routes here
const userroute = require('./routes/user.routes');
app.use('/auth',userroute)

const postroute = require('./routes/post.routes');
app.use('/post' ,postroute)

const reactionroute = require('./routes/reaction.routes');
app.use('/reaction',reactionroute)

app.get('/',(req,res)=>{
    res.send("server mil gya hai aageka kam kro")
})

port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is established on port ${process.env.PORT}`);
});
