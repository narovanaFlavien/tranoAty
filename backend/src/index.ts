import express, { Request, Response, Application } from 'express'

const app: Application = express();
const port = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.json({
        succes: true,
        message: "Akory jiaby vahoaka Malagasy",
        data: []
    })
})

app.listen(port, ()=>{
    console.log(`Le serveur tourne sur le port ${port}`);
})