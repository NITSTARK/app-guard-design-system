
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class LockedApp extends Model {
  public id!: string;
  public userId!: string;
  public appId!: string; // A unique identifier for the application itself
  public name!: string;
  public icon?: string;
  public path?: string;
  public isLocked!: boolean;
}

LockedApp.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  appId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isLocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'locked_apps',
  timestamps: true,
  // Ensure a user can only have one entry for each unique appId
  indexes: [
    {
      unique: true,
      fields: ['userId', 'appId'],
    },
  ],
});

User.hasMany(LockedApp, { foreignKey: 'userId', as: 'lockedApps' });
LockedApp.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default LockedApp;
