const connectToMongo = require('./applicationDbContext');
const connectToMongoClient = require('./applicationDbClient');
const express = require('express');
var cors = require('cors');
connectToMongo();
// connectToMongoClient();



const app = express()
const port = 5000



app.use(cors())
app.use(express.json());



// Available routes
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
// app.use('/user', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})