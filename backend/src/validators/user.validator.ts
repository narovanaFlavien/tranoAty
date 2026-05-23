// src/validators/user.validator.ts
import { body } from 'express-validator';
import User from '../models/User';
import { bd } from '../services';

// Règles communes (réutilisables)
export const userValidationRules = {
    email: () => body('email')
        .isEmail().normalizeEmail().withMessage('L\'email est invalide')
        .custom(async (email) => {
            const existingUser = await bd.sequelize.getRepository(User).findOne({ where: { email } });
            if (existingUser) throw new Error('Cet email est déjà utilisé');
            return true;
        }),
    password: () => body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    name: () => body('name').notEmpty().withMessage('Le nom est requis'),
    firstName: () => body('firstName').optional().withMessage('Le prénom est requis'),
    phone: () => body('phone').optional().isMobilePhone('mg-MG').withMessage('Le numéro de téléphone est invalide'),
    loginPassword: () => body('password').notEmpty().withMessage('Le mot de passe est requis'),
};

// Validation pour l'inscription
export const registerValidation = [
    userValidationRules.name(),
    userValidationRules.firstName(),
    userValidationRules.email(),
    userValidationRules.phone(),
    userValidationRules.password(),
    body('role').optional().isIn(['locataire', 'proprietaire', 'admin']).withMessage('Rôle invalide'),
    body('photo').optional().isString().withMessage('La photo doit être une chaîne de caractères'),
];

// Validation pour la connexion
export const loginValidation = [
    userValidationRules.email(),
    userValidationRules.loginPassword(),
];