import expess from 'express';
import UserController from '../controllers/user.controller';
import { body } from 'express-validator';

const router = expess.Router();
const userController = new UserController();

router.post('/register', [
    body('name').notEmpty().withMessage('Le nom est requis'),
    body('firstName').optional().withMessage('Le prénom est requis'),
    body('email').isEmail().withMessage('L\'email est invalide'),
    body('phone').optional().isMobilePhone('mg-MG').withMessage('Le numéro de téléphone est invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
], userController.register);

router.post('/login', [
    body('email').isEmail().withMessage('L\'email est invalide'),
    body('password').notEmpty().withMessage('Le mot de passe est requis')
], userController.login);

router.get('/profile', userController.getProfile);
router.get('/:id', userController.getUserById);

router.get('/users', userController.getAllUsers);

export default router;