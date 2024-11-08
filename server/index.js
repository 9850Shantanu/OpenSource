const express = require('express');
const app = express();
const PORT =process.env.PORT||8000;
const fileUpload=require("express-fileupload");
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));


if(process.env.NODE_ENV==='production')
{
  app.use(express.static(""))
}


const router = require('./routes/route');
app.use('/', router);

const cloud=require("../server/database/cloudinary");
cloud.cloudinaryConnect();

const Connection = require('./database/database');
Connection();

app.listen(PORT, () => {
  console.log(`App is running on the port ${PORT}`);
});

