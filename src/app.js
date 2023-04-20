import express from "express";
import config from './config.js';
import miluRoutes from './routes/routes.js';
import cors from "cors";
import bodyParser from "body-parser"
const app = express();


app.use(cors());
app.set('port',config.port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.set('port',config.port);
app.use(miluRoutes);

export default app;