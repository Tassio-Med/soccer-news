import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  tableName: 'users',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default UserModel;
