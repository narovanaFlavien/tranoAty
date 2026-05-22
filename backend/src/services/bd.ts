import { Sequelize } from "sequelize-typescript"
// import { Sequelize } from "sequelize"
import config from "../config"
import User from "../models/User"

export default class BD {
    public sequelize: Sequelize

    // constructor() {
    //     this.sequelize = new Sequelize(
    //         config.db.name,
    //         config.db.user,
    //         config.db.password,
    //         {
    //             host: config.db.host,
    //             port: config.db.port,
    //             dialect: "postgres"
    //         }
    //     )
    // }
    constructor() {
        this.sequelize = new Sequelize({
            database: config.db.name,
            username: config.db.user,
            password: config.db.password,
            host: config.db.host,
            port: config.db.port,
            dialect: "postgres",
            models: [User]
        }
        )
    }
}
