const express = require('express');
const app = express();
const client = require('./postgresql');
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage }) 




app.set('view engine', 'ejs');//embedded javascript
app.use(express.static('public'));//middleware
app.use(express.urlencoded({ extended: true }));//middleware

app.listen(3200);
client.connect();
client.on("connect",()=>{
    console.log("postgreql connected");//connect and end are predefined events emitted by the pg module's
})
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', upload.single('resume'), (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const resumePath = req.file.path;
  
    const query = 'INSERT INTO users (name, email, phoneno, resume) VALUES ($1, $2, $3, $4)';
    const values = [name, email, phone, resumePath];
  
    client.query(query, values)
      .then(() => {
        console.log(req.file) 
        console.log('Data inserted successfully!');
        res.redirect('/');
      })
      .catch((err) => {
        console.error(err);
        res.send('Error inserting data!');
      });
  });

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    client.query(query)
      .then((result) => {
        const data = result.rows;
        res.render('users', { data });
      })
      .catch((err) => {
        console.error(err);
        res.send('Error fetching data!');
      });
  });  
  app.post('/download', (req, res) => {
    const resumePath = req.body.resumePath;
  
    if (!fs.existsSync(resumePath)) {
      console.error('File not found:', resumePath);
      res.status(404).send('File not found');
      return;
    }
  
    res.download(resumePath, (err) => {
      if (err) {
        console.error('Error downloading file:', resumePath, err);
        res.status(500).send('Error downloading file');
      }
    });
  });

  /*app.post('/download', (req, res) => {
    const filePath = req.body.path;
    res.download(filePath);
  });*/
//assignmentkudosware //alazo2002sale


