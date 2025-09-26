
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class RefreshToken extends Model {
  public id!: string;
  public token!: string;
  public userId!: string;
  public expiresAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

RefreshToken.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'refresh_tokens',
  timestamps: true,
});

User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default RefreshToken;
