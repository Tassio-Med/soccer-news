import { Request, Response } from 'express';
import IError from '../interfaces/IError';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { error, message }: IError = await LoginService.login({ email, password });

    if (error) return res.status(401).json({ message });

    res.status(200).json({ token: message });
  }
}
