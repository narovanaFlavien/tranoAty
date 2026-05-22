import { Request, Response } from "express"
import { bd } from "../services"
import User from "../models/User"
import { Sequelize } from "sequelize"
import { Repository } from "sequelize-typescript"
import { validationResult } from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class UserController {

    public User: Repository<User>
    public sequelize: Sequelize
    constructor() {
        this.User = bd.sequelize.getRepository(User)
        this.sequelize = bd.sequelize
    }
    register = async (req: Request, res: Response) => {
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
            // Hash du mot de passe
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await this.User.create({
                name,
                firstName,
                email,
                phone,
                password: hashedPassword,
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

    // Avec du JWT
    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await this.User.findOne({ where: { email } })
            if (!user) {
                return res.status(404).json({ succes: false, message: "Utilisateur non trouvé" })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ succes: false, message: "Mot de passe incorrect" })
            }
            // Générer un token JWT
            const payload = { id: user.id, role: user.role }
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })
            res.json({
                succes: true,
                message: "Connexion réussie",
                data: {
                    user,
                    token
                }
            })
        } catch (error) {
            res.status(500).json({ succes: false, message: "Erreur lors de la connexion" })
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.User.findAll()
            res.json({
                succes: true,
                message: "Liste des utilisateurs",
                data: users
            })
        } catch (error) {
            res.status(500).json({ succes: false, message: "Erreur lors de la récupération des utilisateurs" })
        }
    }

}

export default UserController;