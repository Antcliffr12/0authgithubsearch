let express = require('express');
let cors = require('cors');
require('dotenv').config();


const fetch = (...args) => 
    import('node-fetch').then(({default: fetch}) => fetch(...args));
let bodyParser = require('body-parser');
const { response } = require('express');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let app = express();

app.use(cors());
app.use(bodyParser.json());

//TEST SERVER TOKEN
app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    })
})


//GET Access Token
app.get('/getAccessToken', async function(req, res) {
    
    //getting params code
    console.log(req.query.code);
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
    // const params = "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        console.log(response)
        return response.json()
    }).then((data) => {
        console.log(data)
        res.json(data)
    })
});

//GET userData
app.get('/getUserData', async function(req, res) {
    req.get("Authorization") //Bearer Access 
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization" : req.get("Authorization")
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        res.json(data);
    })
})

app.listen(5000, function() {
    console.log("Server listening on PORT 5000")
})