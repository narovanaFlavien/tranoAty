import { Sequelize } from "sequelize";
import config from "../config"

export default class BD {
    public sequelize: Sequelize

    constructor() {
        this.sequelize = new Sequelize(
            config.db.name,
            config.db.user,
            config.db.password,
            {
                host: config.db.host,
                port: config.db.port,
                dialect: "postgres"
            }
        )
    }
}
