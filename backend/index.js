const express=require('express');
const mysql =require('mysql2');
const cors =require('cors');
const bodyParser =require('body-parser') ;
const port = 8000;

const app = express();
//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());


//configurations for creating mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Raje@1992_mysql',
    database: 'mydb'
});

connection.connect(function(err) {
    if (err) {
        return console.log('error ' + err.message);
    }
    console.log('connected to the database')
});

app.get("/", (req, res) =>{
  const sqlInsert = "INSERT INTO user_detail (name, email, contact) VALUES ('john', 'john@gmail.com', 255846856)";
  connection.query(sqlInsert, (err, result) => {
    console.log("error", err);
    console.log("result", result);
    res.send("hello express");
  })
})

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM user_detail ORDER BY id ASC";
    connection.query(sqlGet, (err, result)=> {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert = 'INSERT INTO user_detail (name, email, contact) VALUES (?, ?, ?)';
  connection.query(sqlInsert, [name, email, contact], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).json({ error: 'An error occurred while processing your request.' });
      } else {
          res.status(200).json({ message: 'User record inserted successfully.' });
      }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const {id} = req.params;
  const sqlDelete = "DELETE FROM user_detail WHERE id = ?";
  connection.query(sqlDelete, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const {id} = req.params;
  const sqlGet = "SELECT * FROM user_detail where id = ?";
  connection.query(sqlGet, id, (error, result)=> {
    if(error){
      console.log(error)
    }
      res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const {name, email, contact} = req.body;
  const sqlUpdate = "UPDATE user_detail SET name = ?, email = ?, contact = ?  WHERE id=?";
  connection.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if(error) {
      console.log(error);
    }
    res.send(result);
  });
});

  


app.get("/",(req, res) => {
  res.send("success")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})