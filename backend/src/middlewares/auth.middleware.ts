import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { bd } from '../services';
import User from '../models/User';
import { config } from 'dotenv';
import { Role } from '../models/User';

config();

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Accès non autorisé' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: number };
    const user = await bd.sequelize.getRepository(User).findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Utilisateur introuvable' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
  }
};

export const authorize = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Non authentifié' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Accès interdit' });
    }
    next();
  };
};