const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');



const postRoute = require('./routes/posts')

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// importing routes defined in another file 
// app.use('/posts', postRoute);

// // connecting to database
// mongoose.connect(process.env.DB_CONNECTION)


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {  // Connection successful
        app.use('/posts', postRoute);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err, "fromthe app"));  // Handle connection errors
