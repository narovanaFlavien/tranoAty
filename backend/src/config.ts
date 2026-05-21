import { config } from "dotenv"

config(); // Charger les variables d'environnement depuis le fichier .env

const configuration = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME || 'tranoaty',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '1234',

    },
    api_port: parseInt(process.env.API_PORT || '3000')
}

export default configuration;