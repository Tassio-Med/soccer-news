import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import IError from '../interfaces/IError';
import ILogin from '../interfaces/Ilogin';
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class LoginService {
  static async login(user: ILogin): Promise<IError> {
    const login = await UserModel.findOne({ where: { email: user.email } }) as IUser;

    if (!login) {
      return { error: true, message: 'Incorrect email or password' };
    }

    if (!compareSync(user.password, login.password)) {
      return { error: true, message: 'Incorrect email or password' };
    }

    const token = jwt.sign(
      { userId: login.id },
      JWT_SECRET as string,
      {
        expiresIn: '3d',
      },
    );

    return { error: false, message: token };
  }
}
