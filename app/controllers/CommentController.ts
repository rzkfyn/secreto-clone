import { Request, Response } from 'express';
import Controller from '../core/Controller.js';
import CommentType from '../types/CommentType.js';

class CommentController extends Controller {
  public static async sendComment(req: Request, res: Response) {
    const { forMessageId, text, forUserSecretId } = req.body;
    const sentAt = new Date().toISOString();

    let id: string | undefined;
    try {
      id = await CommentController.model('comment')?.create({
        forUserSecretId, forMessageId, text, sentAt,
      } as CommentType);
      if (!id) throw new Error('Gagal mengirim komentar');
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'fail',
        message: 'Gagal mengirim komentar',
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

export default CommentController;
