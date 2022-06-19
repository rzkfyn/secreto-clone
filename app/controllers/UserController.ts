import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Controller from '../core/Controller.js';
import type UserType from '../types/UserType.js';

class UserController extends Controller {
  public static index(_: Request, res: Response) {
    res.render('index', {
      title: 'Share Secret Message About',
    });
  }

  public static async show(req: Request, res: Response) {
    const { secretId } = req.params;
    const user = await UserController.model('user')?.findOneBySecretId(secretId) as UserType;

    if (!user) {
      return res.status(404).render('404', {
        message: 'User Not Found',
      });
    }

    const messages = await UserController.model('message')?.findBySecretId(secretId);
    const comments = await UserController.model('comment')?.findBySecretId(secretId);
    // @ts-ignore
    console.log(UserController.model('message')?.joinMessageWithComment(messages, comments));
    return res.status(200).render('userpage', {
      user,
      title: `Send Secret Feedback About ${user.name}`,
      // @ts-ignore
      messages: UserController.model('message')?.joinMessageWithComment(messages, comments),
    });
  }

  public static async register(req: Request, res: Response) {
    const { name } = req.body;
    const secretId = nanoid(12);
    const registeredAt = new Date().toISOString();

    let id: string | undefined;
    try {
      id = await UserController.model('user')?.create({ name, secretId, registeredAt } as UserType);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'fail',
        message: 'Gagal mendaftarkan user baru',
      });
    }

    if (!id) {
      return res.status(500).json({
        status: 'fail',
        message: 'Gagal mendaftarkan user baru',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        id, secretId,
      },
    });
  }

  public static async getUser(req: Request, res: Response) {
    const { secretId, _id } = req.body;
    let user: UserType | undefined;
    try {
      user = await UserController.model('user')?.findOneBySecretId(secretId) as UserType;
      if (!user || user._id.toString() !== _id) throw new Error();
    } catch (err) {
      return res.status(404).json({
        status: 'fail',
        message: 'Data tidak ditemukan',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        secretId: user.secretId,
        name: user.name,
      },
    });
  }

  public static async isAuthorized(req: Request, res: Response) {
    const {
      _id,
      name,
      secretId,
      id,
    } = req.body;

    let user: UserType | undefined;
    try {
      user = await UserController.model('user')?.findOneBySecretId(id) as UserType;
      if (!user) throw new Error();
    } catch (err) {
      return res.status(404).json({
        status: 'fail',
        message: 'Data tidak ditemukan',
      });
    }

    const userId = user._id.toString();
    const authorized = (userId === _id) && (user.name === name) && (user.secretId === secretId);

    return res.status(200).json({
      status: 'success',
      data: {
        authorized,
      },
    });
  }
}

export default UserController;
