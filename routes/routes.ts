import { Router } from 'express';
import CommentController from '../app/controllers/CommentController.js';
import MessageController from '../app/controllers/MessageController.js';
import UserController from '../app/controllers/UserController.js';

const router = Router();

router.get('/', UserController.index);
router.get('/:secretId', UserController.show);

router.post('/', UserController.register);
router.post('/isAuthorized', UserController.isAuthorized);
router.post('/getUser', UserController.getUser);
router.post('/message', MessageController.sendMessage);
router.post('/comment', CommentController.sendComment);

router.use((_, res) => {
  res.status(404).render('404', {
    message: 'Not Found',
  });
});

export default router;
