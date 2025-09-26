
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class EncryptedFile extends Model {
  public id!: string;
  public userId!: string;
  public name!: string;
  public mimeType!: string;
  public size!: number;
  public storagePath!: string; // Path to the encrypted file on the server
  public iv!: string; // Initialization Vector for encryption
  public authTag!: string; // Authentication Tag for GCM
  public folder?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

EncryptedFile.init({
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  storagePath: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  iv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authTag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  folder: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'encrypted_files',
  timestamps: true,
});

User.hasMany(EncryptedFile, { foreignKey: 'userId', as: 'encryptedFiles' });
EncryptedFile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default EncryptedFile;
