import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize"
import {
    DataType,
    Model,
    Column,
    Table,
}
from "sequelize-typescript"

export type Role = 'locataire' | 'proprietaire' | 'admin'
type Status = 'actif' | 'bloque'

@Table({
    freezeTableName: true,
    timestamps: true,
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
    declare role: Role

    @Column({
        type: DataType.ENUM('actif', 'bloque'),
        defaultValue: 'actif'
    })
    declare status: CreationOptional<Status>

    @Column({
        type: DataType.STRING,
        defaultValue: 'user.png'
    })
    declare photo: CreationOptional<string>
}