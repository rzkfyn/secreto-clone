import { Request, Response } from 'express';
import Controller from '../core/Controller.js';
import MessageType from '../types/MessageType.js';

class MessageController extends Controller {
  public static async sendMessage(req: Request, res: Response) {
    const { text, forUserSecretId } = req.body;
    const sentAt = new Date().toISOString();

    let id: string | undefined;
    try {
      id = await MessageController.model('message')?.create({ text, forUserSecretId, sentAt } as MessageType);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'fail',
        message: 'Pesan gagal dikirim',
      });
    }

    if (!id) {
      return res.status(500).json({
        status: 'fail',
        message: 'Pesan gagal dikirim',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        id,
      },
    });
  }
}

export default MessageController;
