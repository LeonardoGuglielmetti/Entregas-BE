import express from 'express';
import { calcRandoms } from './utils/calcRandoms.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.send(`Petición atendida por ${process.pid}`)
});
app.get('/hola', (req,res)=>{
    res.send(`HOLA`)
});

app.get('/api/randoms', (req, res) => {
    console.log(req.query);
    let numbersToGenerate = req.query.cant ? req.query.cant : 100000000;
    let result = calcRandoms(numbersToGenerate);
    res.json(result)
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));