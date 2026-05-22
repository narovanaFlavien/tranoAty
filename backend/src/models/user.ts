import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize"
import {
    DataType,
    Model,
    Column,
    Table,
}
from "sequelize-typescript"

type role = 'locataire' | 'proprietaire' | 'admin'
type status = 'actif' | 'bloque'

@Table({
    freezeTableName: true,
    timestamps: true
})
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: CreationOptional<number>

    @Column({
        type: DataType.STRING
    })
    declare name: string

    
    @Column({
        type: DataType.STRING
    })
    declare firstName: string

    @Column({
        unique: true,
        type: DataType.STRING,
        validate: {
            isEmail: true
        }
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    declare phone: string

    @Column({
        type: DataType.STRING,
    })
    declare password: string

    @Column({
        type: DataType.ENUM('locataire', 'proprietaire', 'admin'),
        defaultValue: "locataire"
    })
    declare role: role

    @Column({
        type: DataType.ENUM('actif', 'bloque'),
        defaultValue: 'actif'
    })
    declare status: status

    @Column({
        type: DataType.STRING,
    })
    declare photo: string
}