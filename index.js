import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL= 'https://api.lyrics.ovh/v1/';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    res.render("index.ejs");
});

app.post("/lyrics", async (req,res) =>{
    try{
        const artist = req.body.artistName;
        const songName = req.body.songName;
        const result = await axios.get(API_URL+artist+'/'+songName);
        res.render("index.ejs",{content:result.data.lyrics});
    }
    catch(error){
        res.render("index.ejs",{content: JSON.stringify(error.message)});
    }
});

app.listen(port, ()=>{
    console.log("Server is up and listening on port: "+ port);
});

