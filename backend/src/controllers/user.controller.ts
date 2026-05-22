import { Request, Response } from "express"
import { bd } from "../services"
import User from "../models/User"
import { Sequelize } from "sequelize"
import { Repository } from "sequelize-typescript"
import { validationResult } from "express-validator"

class UserController{

    public User: Repository<User>
    public sequelize: Sequelize
    constructor(){
        this.User = bd.sequelize.getRepository(User)
        this.sequelize = bd.sequelize
    }
    register = async(req: Request, res: Response)=>{
        const transaction = await this.sequelize.transaction();
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    succes: false,
                    message: "Validation error",
                    errors: errors.array()
                 });
            }
            const { name, firstName, email, phone, password, role, photo } = req.body
            const user = await this.User.create({
                name,
                firstName,
                email,
                phone,
                password,
                role,
                photo
            }, { transaction });
            await transaction.commit();
            res.status(201).json({
                succes: true,
                message: "Utilisateur créé avec succès",
                data: user
            });
        } catch (error) {
            await transaction.rollback();
            res.status(500).json({ succes: false, message: "Erreur lors de la création de l'utilisateur" });
        }
    }
}

export default UserController;