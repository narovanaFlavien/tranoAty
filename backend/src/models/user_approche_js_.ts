// models/User.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

export const createUserModel = (sequelize: Sequelize) => {
  class User extends Model {
    public id!: number;
    public nom!: string;
    public prenom!: string;
    public email!: string;
    public telephone!: string;
    public password!: string;
    public role!: 'locataire' | 'proprietaire' | 'admin';
    public photo!: string;
    public status!: 'actif' | 'bloque';
    // champs spécifiques locataire
    public budget?: number;
    public quartiers_preferes?: string[];  // stocké en JSONB
    public type_logement_recherche?: string;
    // champs spécifiques propriétaire (rien de plus, nombre de logements = count)
    public createdAt!: Date;
    public updatedAt!: Date;

    static associate(models: any) {
      User.hasMany(models.Logement, { foreignKey: 'proprietaire_id', as: 'logements' });
      User.hasMany(models.Favori, { foreignKey: 'user_id', as: 'favoris' });
      User.hasMany(models.Message, { foreignKey: 'expediteur_id', as: 'messages_envoyes' });
      User.hasMany(models.Message, { foreignKey: 'destinataire_id', as: 'messages_recus' });
      User.hasMany(models.Notification, { foreignKey: 'user_id', as: 'notifications' });
      User.hasMany(models.Signalement, { foreignKey: 'signalant_id', as: 'signalements_effectues' });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('locataire', 'proprietaire', 'admin'),
        allowNull: false,
        defaultValue: 'locataire',
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      status: {
        type: DataTypes.ENUM('actif', 'bloque'),
        defaultValue: 'actif',
      },
      budget: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Budget max recherché (Ar)',
      },
      quartiers_preferes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      type_logement_recherche: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};