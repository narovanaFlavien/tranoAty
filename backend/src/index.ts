import express, { Request, Response, Application } from 'express'
import cors from 'cors';
import morgan from 'morgan';
import configuration from './config';
import { bd } from './services';

const app: Application = express();
const port = configuration.api_port;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req: Request, res: Response)=>{
    res.json({
        succes: true,
        message: "Akory jiaby vahoaka Malagasy",
        data: []
    })
})

app.listen(port, async ()=>{
    try {
        await bd.sequelize.sync();
        console.log('Migration réussie')
    } catch (error) {
        console.error('Migration échouée')
        console.error(error)
    }
    console.log(`Le serveur tourne sur le port ${port}`);
})