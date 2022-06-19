import express from 'express';
import routes from './routes/routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', routes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}, http://localhost:${port}`);
});
