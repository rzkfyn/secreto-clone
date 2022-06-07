import express from 'express';
import { comment } from './utils/comment';
import { getMessageBySecretId } from './utils/getMessagesBySecretId';
import { getUserBySecretId } from './utils/getUserBySecretId';
import { isAuthorized } from './utils/isAuthorized';
import { registerNewUser } from './utils/registerNewUser';
import { saveMessage } from './utils/saveMessage';
import type User from './utils/types/User';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (_, res) => {
    res.render('index', {
        title: 'Share Secret Message About'
    });
});

app.get('/:secretId', async (req, res) => {
    const secretId = req.params.secretId;
    const user = await getUserBySecretId(secretId);
    if (!user) {
        res.status(404);
        return res.render('404', {
            message: 'User Not Found'
        });
    }

    const messages = await getMessageBySecretId(secretId);

    res.render('userpage', {
        user,
        title: `Send Secret Feedback About ${user.name}`,
        messages
    });
});

app.post('/', async (req, res) => {
    const name = req.body.name as string;
    const secretId = req.body.secretId as string;
    const id = await registerNewUser(name, secretId);

    res.send(id);
});

app.post('/message', async (req, res) => {
    const message = req.body.message as string;
    const forUserSecretId = req.body.forUserSecretId as string;
    const timeStamp = req.body.timeStamp as string;

    const result = await saveMessage(message, forUserSecretId, timeStamp);

    res.send(result);
});

app.post('/comment', async (req, res) => {
    const messageId = req.body.messageId as string;
    const text = req.body.text as string;
    const timeStamp = req.body.timeStamp as string;

    const result = await comment(messageId, text, timeStamp);

    return res.send(result);
});

app.post('/getUser', async (req, res) => {
    const secretId = req.body.secretId as string;
    const _id = req.body._id as string;
    const user = await getUserBySecretId(secretId);

    if (!user) return res.send(void 0);
    if (user._id.toString() != _id) return res.send(void 0);

    res.send({
        secretId: user.secretId,
        name: user.name
    });
});

app.post('/isAuthorized', async (req, res) => {
    const { _id, name, secretId } = req.body as User;
    const id = req.body.id as string;
    const authorized = await isAuthorized(id, {_id, name, secretId});

    res.send(authorized);
});

app.use((_, res) => {
    res.status(404);
    res.render('404', {
        message: 'Not Found'
    });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}, http://localhost:${port}`);
});