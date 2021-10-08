import router from './routes/index';

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* views */
app.use('/', router);

app.listen(process.env.PORT || 5000);

export default app;
