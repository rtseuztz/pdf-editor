const express = require('express');
const path = require('path');
const app = express();
const cors =  require('cors');
const port = process.env.PORT || 3001; //Line 3

app.use(cors({
    origin: 'http://localhost'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.get('/express_backend', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
  });
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));